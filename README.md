# TypeScript Multiproject

## Structure
```
/apps
  /app-01
    /tsconfig.json       ---> Depends on everything
    /main.ts             ---> Monolith Entry Point
/consumers
  /consumer-01
    /tsconfig.json       ---> Depends on lib-01 & lib-02
    /index.ts
  /consumer-02           ---> Depends on lib-01 & lib-02
    /index.ts
    /tsconfig.json
/libs
  lib-01
    /utilities.ts
    /tsconfig.json
  lib-02
    /log.ts
    /tsconfig.json
```

### Prepare
```
npm i
```

#### Build
```
npm run build
```

#### Run
```
node dist/apps/app-01/main.js
```

#### Debug 
```
Make sure *Debug Current File* is selected on *RUN AND DEBUG*
Press F5 file (e.g. apps/app-01/main.ts)
```

#### Debug Unit Test
```
Make sure *Debug Current Jest Test* is selected on *RUN AND DEBUG*
Press F5 file (e.g. libs/lib-01/tests/utilities.spec.ts)
```

