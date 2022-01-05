import { uuid } from '../utilities'

describe('UUID generation', () => {
    it('Will gen uiid', () => {
        expect(uuid()).not.toBeNull()
    })
})