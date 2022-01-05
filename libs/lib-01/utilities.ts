export const uuid = () => {
    return Math.random().toFixed(10);
}

export const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))