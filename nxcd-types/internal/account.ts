export const enum AccountStatus {
    active = 'active',
    expired = 'expired',
    blocked = 'blocked'
}

export const enum Permission {
    backgroundCheckPerson = 'backgroundCheckPerson',
    backgroundCheckCompany = 'backgroundCheckCompany',
    naturalPersonBureau = 'naturalPersonBureau',
    classify = 'classify',
    proofOfResidence = 'proofOfResidence',
    faceMatch = 'faceMatch',
    faceMatchAndDatavalid = 'faceMatchAndDatavalid',
    fullOcr = 'fullOcr',
    fullOcrAndDatavalid = 'fullOcrAndDatavalid',
    creditScore = 'creditScore',
    liveness = 'liveness'
}

export type ServiceAccount = {
    key: string
    name: string
    status: AccountStatus
    permissions: Set<Permission>
}