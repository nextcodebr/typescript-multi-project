import * as app1 from '@apps/app-01/boot'
import * as app2 from '@apps/app-02/boot'

const App1: app1.AppConfig = {
    consumer01: {
        sleepMs: 5000
    },
    consumer02: {
        sleepMs: 5000
    },
    express: {
        host: '0.0.0.0',
        port: 3000
    }
}

const App2: app2.AppConfig = {
    consumer01: {
        sleepMs: 5000
    },
    consumer02: {
        sleepMs: 5000
    },
    express: {
        host: '0.0.0.0',
        port: 3001
    }
};

(
    async () => await Promise.all([app1.boot(App1), app2.boot(App2)])
)()