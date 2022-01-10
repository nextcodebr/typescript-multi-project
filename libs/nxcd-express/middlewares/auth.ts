import * as express from 'express'
import { logger } from '@libs/nxcd-log/log'

export const requireApiKey = (validator: (key: string) => Promise<boolean>) => async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const key = request.header('ApiKey') as string

    const ok = await validator(key)

    if (ok) {
        logger.info('Proceeding')
        next()
    } else {
        response.status(401).send('Invalid ApiKey')
    }
}