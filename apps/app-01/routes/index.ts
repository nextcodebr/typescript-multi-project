import { Request, Response, NextFunction } from 'express'
import { express } from '../share'

export const configure = async () => {
    express.get('/now', (req: Request, res: Response, next: NextFunction) => {
        res.json(new Date())
        next()
    })
}

