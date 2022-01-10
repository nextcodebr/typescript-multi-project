import { runLoop as consumer01 } from '@consumers/consumer-01'
import { runLoop as consumer02 } from '@consumers/consumer-02'
import { express } from './share'
import { configure } from './routes'
import { logger } from '@libs/nxcd-log/log'


export type AppConfig = {
    consumer01: {
        sleepMs: number
    },
    consumer02: {
        sleepMs: number
    },
    express: {
        host: string
        port: number
    }
}

export const boot = async (config: AppConfig) => {
    await Promise.all([
        configure()
    ])

    await Promise.all([
        consumer01('app-01', config.consumer01.sleepMs),
        consumer02('app-01', config.consumer02.sleepMs),
        express.listen(config.express.port, config.express.host, () => {
            logger.info(`App01 running ${config.express.host}:${config.express.port}`)
        })
    ])
}