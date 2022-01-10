import express from 'express'
import { NxcdApplication } from '@nxcd-types/internal/apps'
import { expressOf } from '../app'

describe('Express Invariants', () => {
    it('Is Not Singleton', () => {
        const one = express()
        const two = express()
        expect(one === two).toBeFalsy()
    })

    it('Is Singleton by App', () => {
        for (const app of [NxcdApplication.app01, NxcdApplication.app02]) {
            const one = expressOf(app)
            const two = expressOf(app)
            expect(one === two).toBeTruthy()
        }

        expect(expressOf(NxcdApplication.app01) === expressOf(NxcdApplication.app02)).toBeFalsy()
    })
})
