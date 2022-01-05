import { uuid, delay } from '../../libs/lib-01/utilities'
import { log } from '../../libs/lib-02/log'

export const runLoop = async () => {
    for (; ;) {
        await delay(1000)
        log(`consumer-02 ${uuid()}`)
    }
}