import { requireApiKey } from '@libs/nxcd-express/middlewares/auth'
import { inMem, asApiKeyValidator } from '@services/accounts'
import { ServiceAccount, AccountStatus, Permission } from '@nxcd-types/internal/account'
import { express } from '../share'

export const configure = async () => {
    const service = await inMem({
        loader: async () => {
            const universe: ServiceAccount[] = [
                {
                    key: '42',
                    name: 'dummy',
                    permissions: new Set<Permission>(),
                    status: AccountStatus.active
                }
            ]

            return universe
        }
    })

    express.use(requireApiKey(asApiKeyValidator(service)))
}
