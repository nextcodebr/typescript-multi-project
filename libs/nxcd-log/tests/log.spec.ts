import { logger } from '../log'

describe('Logging', () => {
    it('Will log', () => {
        expect(logger.info('foo')).toBeUndefined()
    })
})
