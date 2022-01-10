# TypeScript Multiproject

## Structure
```
/apps
  /app-01
    /tsconfig.json       ---> Depends on everything
    /main.ts             ---> Monolith Entry Point
/consumers
  /consumer-01
    /tsconfig.json       ---> Depends on nxcd-util & nxcd-log
    /index.ts
  /consumer-02           ---> Depends on nxcd-util & nxcd-log
    /index.ts
    /tsconfig.json
/libs
  nxcd-util
    /utilities.ts
    /tsconfig.json
  nxcd-log
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
Press F5 file (e.g. libs/nxcd-util/tests/utilities.spec.ts)
```

