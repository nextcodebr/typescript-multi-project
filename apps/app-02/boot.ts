import { configure as configureRoutes } from './routes'
import { configure as configureInterceptors } from './interceptors'
import * as c1 from '@consumers/consumer-01'
import * as c2 from '@consumers/consumer-02'
import { express } from './share'
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
    await Promise.all([configureInterceptors()])
    await Promise.all([configureRoutes()])

    await Promise.all([c1.runLoop('app-02', 10000), c2.runLoop('app-02', 10000), express.listen(config.express.port, config.express.host, () => {
        logger.info(`App02 running ${config.express.host}:${config.express.port}`)
    })])


}