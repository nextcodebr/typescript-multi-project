import { boot } from './boot'

(
    async () => await boot({
        consumer01: { sleepMs: 5000 },
        consumer02: { sleepMs: 5000 },
        express: {
            host: '0.0.0.0',
            port: 3000
        }
    })
)().finally(() => {
    process.exit(0)
})