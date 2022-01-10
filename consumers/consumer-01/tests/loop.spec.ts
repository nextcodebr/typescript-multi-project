import { runLoop } from '../'

describe('Loop Test', () => {

    it('Will exit', async () => {
        const now = new Date().getTime()
        await runLoop('dummy', 10, 1)
        const elapsed = new Date().getTime()

        expect(elapsed - now).toBeGreaterThan(1)
    })

})