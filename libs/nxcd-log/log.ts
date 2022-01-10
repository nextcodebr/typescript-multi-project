import console from 'console'

export const logger = {
    info: (msg: string) => {
        console.log(`[${new Date().toISOString()}][${msg}]`)
    },
    warn: (msg: string) => {
        console.warn(`[${new Date().toISOString()}][${msg}]`)
    },
    error: (msg: string) => {
        console.error(`[${new Date().toISOString()}][${msg}]`)
    },
}