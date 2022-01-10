import { uuid, delay } from '@libs/nxcd-util/utilities'
import { logger } from '@libs/nxcd-log/log'

export const runLoop = async (app: string, sleepMs: number = 1000) => {
    for (; ;) {
        await delay(sleepMs)
        logger.info(`[${app}]consumer-01 ${uuid()}`)
    }
}

