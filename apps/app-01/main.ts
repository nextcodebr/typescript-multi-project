import { runLoop as consumer01 } from '../../consumers/consumer-01'
import { runLoop as consumer02 } from '../../consumers/consumer-02'

export const boot = async () => {
    await Promise.all([consumer01(), consumer02()])
}

(
    async () => await boot()
)().finally(() => {
    process.exit(0)
})