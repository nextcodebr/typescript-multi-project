import express from 'express'
import * as core from 'express-serve-static-core'
import { NxcdApplication } from '@nxcd-types/internal/apps'

const apps = {

} as Record<NxcdApplication, core.Express>

export const expressOf = (app: NxcdApplication) => {
    return apps[app] || (apps[app] = express())
}