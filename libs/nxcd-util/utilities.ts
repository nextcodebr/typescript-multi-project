export const uuid = () => {
    return Math.random().toFixed(10);
}

export const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export class Lazy<T> {
    private ref?: T
    factory: () => T

    constructor (factory: () => T) {
        this.factory = factory
    }

    get () {
        let rv = this.ref
        if (!rv) {
            rv = this.ref = this.factory()
        }
        return rv
    }

    set (ref: T) {
        this.ref = ref
    }

    invalidate () {
        this.ref = undefined
    }
}