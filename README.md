# TypeScript Multiproject

## Structure

Project root contains 5 **super-projects** which can hold N-projects with desired semantics:

1. **apps** (Web Apps - apis or frontends)
2. **libs** (standalone code)
3. **services** (crud, etc)
4. **consumers** (bridges, e.g. nats, which may proxy a service call)
5. **nxcd-types** (input/outputs & service interfaces)

**super-projects** will work like a namespace prefix, like when publishing a library as **@types/node**.

## Dependency Hierarchies

monolith -> apps -> consumers -> services -> libs -> nxcd-types

As a rule of thumb, a project can 

a. Depend on another project of the super-project. E.g. libs/nxcd-express -> <libs/nxcd-log & libs/nxcd-util>.
b. Can not depend on a project declared on a super-project *on the left*. E.g., nxcd-types/internal cannot depend on libs/nxcd-logs
c. Cycles must be avoided. If A depends on B, B must not depend on A. Should the need arises, project C will have to be created to mediate shared dependencies


### Full Tree

```
/apps
  /app-01
    tsconfig.json        ---> Depends on nxcd-types, libs/nxcd-express, consumers
    index.ts             ---> Web App1 Entry Point (run as separate process)
    boot.ts              ---> Web App1 Bootstrapper (called by index & monolith)
  /app-02
    tsconfig.json        ---> Depends on nxcd-types, libs/nxcd-express, consumers, services
    index.ts             ---> Web App2 Entry Point (run as separate process)
    boot.ts              ---> Web App2 Bootstrapper (called by index & monolith)    
  /monolith
    tsconfig.json        ---> Depends on everything
    index.ts             ---> Boots Both App1 & App2 in a single process (binding to 0.0.0.0:3000 & 0.0.0.0:3001, resp)
/consumers
  /consumer-01
    tsconfig.json       ---> Depends on nxcd-util & nxcd-log
    index.ts
  /consumer-02          ---> Depends on nxcd-util & nxcd-log
    index.ts
    tsconfig.json
/services
  /accounts
    tsconfig.json       ---> Depends on nxcd-util & nxcd-log & nxcd-types/internal
    mongo-impl.ts       ---> Mongo impl of AccountService Interface
    inmem-impl.ts       ---> Mocked (in mem) impl of AccountService Interface
    index.ts            ---> Factory. Exposes only AccountService interface
/libs
  nxcd-util             ---> No dependencies
    utilities.ts
    tsconfig.json
  nxcd-express          ---> Depends on log & nxcd-types/internal
    middlewares/
      auth.ts
    tsconfig.json    
  nxcd-log              ---> No dependencies
    log.ts
    tsconfig.json
/nxcd-types
  internal
    tsconfig.json       ---> No Dependencies!
    index.ts            ---> Private domain: Configurations, Intra-Service communication, etc
  public
    /tsconfig.json       ---> No Dependencies!
    index.ts             |
    requests.ts          |==> Public domain: Known by External Clients
    responses.ts         |
```

## Working

#### Prepare
```
npm i
```

#### Build
```
npm run build
```

#### Run
```
node dist/apps/monolith/index.js

# App1 - unprotected
curl -XGET  http://localhost:3000/now

# App2 - requires ApiKey
curl --header "ApiKey:42" -XGET  http://localhost:3001/now
```

#### Debug
```
Make sure *Debug Current File* is selected on *RUN AND DEBUG*
Press F5 file (e.g. apps/app-01/main.ts)
```

#### Debug One Unit Test
```
Make sure *Debug Current Jest Test* is selected on *RUN AND DEBUG*
Press F5 file (e.g. libs/nxcd-util/tests/utilities.spec.ts)
```

#### Run/Debug All Tests
```
Make sure *Launch All Tests* is selected on *RUN AND DEBUG*
Press F5
```

## Details

### Module aliasing

To avoid relative paths in source code, every project's *tsconfig.json* must declare aliases pointing to each super-project associated with project references.

E.g., for app-01, which depends on (nxcd-express, consumer-01, consumer-02)

```
{
  "extends": "../../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../../dist/node_modules/@apps/app-01",
    "rootDir": ".",
  },
  "references": [
    {
      "path": "../../libs/nxcd-express"
    },
    {
      "path": "../../consumers/consumer-01"
    },
    {
      "path": "../../consumers/consumer-02"
    }
  ]
}
```

*tsconfig.json* must be changed to

```
{
  "extends": "../../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../../dist/node_modules/@apps/app-01",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@libs/*": ["../../libs/*"],
      "@consumers/*" : ["../../consumers/*"],
      "@nxcd-types/*" : ["../../nxcd-types/*"]
    }
  },
  "references": [
    {
      "path": "../../libs/nxcd-express"
    },
    {
      "path": "../../consumers/consumer-01"
    },
    {
      "path": "../../consumers/consumer-02"
    }
  ]
}
```

With this config we can declare

```typescript
import { requireApiKey } from '@libs/nxcd-express/middlewares/auth'
import { inMem, asApiKeyValidator } from '@services/accounts'
import { ServiceAccount, AccountStatus, Permission } from '@nxcd-types/internal/account'

...
```

### Aliasing & Output

In order to aliasing work flawlessly, there's a bit of a hack and conventions:

1. Aliases for each 'super-project' must be the same in all declarations. E.g., *do not use* '**@nxcd-types**/(.+)': '<rootDir>/nxcd-libs/$1' in one project and '**@my-types**/(.+)': '<rootDir>/nxcd-libs/$1' in another
2. Transpilation must place .js files in dist/*node_modules*/@<super-project>/project. Why? Because node will always magically resolve stuff in node_modules :). Well, actually when projects are transpiled, the *paths* information is kind of ignored and the javascript output misses the relative path info and fails.
  
With this convention the final output becomes:
  
```
monolith/
node_modules/
  @apps/
    app-01/
    app-02/
  @consumers/
    consumer-01/
    consumer-02/
  @libs/
    nxcd-express/
    nxcd-log/
    nxcd-util/
  @nxcd-types/
    internal/
    public/
  @services/
    accounts/
```

### Jest Configuration

When running jest (from either debug or npm run test), it only reads the *tsconfig.json* from the root directory. In order to aliasing work, all super-projects must be mapped in **jest.config.js**:

```
module.exports = {
  ...,
  moduleNameMapper: {
    '@nxcd-types/(.+)': '<rootDir>/nxcd-types/$1',
    '@libs/(.+)': '<rootDir>/libs/$1',
    '@consumers/(.+)': '<rootDir>/consumers/$1',
    '@services/(.+)': '<rootDir>/services/$1',
    '@apps/(.+)': '<rootDir>/apps/$1',
  },
  ...
}
```
