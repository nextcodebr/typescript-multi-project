export const enum DocumentType {
    FederalID = 'FederalID',
    DriversLicense = 'DriversLicense'
}

export const enum DocumentSubType {
    decree2018 = 'decree2018'
}

export const enum DocumentModel {
    printed = 'printed',
    paper = 'paper',
    digital = 'digital'
}

export const enum Side {
    front = 'Front',
    back = 'Back',
    frontAndBack = 'FrontBack'
}

export type Classification = {
    country: string
    type: DocumentType
    subtype: DocumentSubType
    model: DocumentModel
    side: Side
    sameImage: boolean
}

export type FileInfo = {
    fieldname: string
    name: string
    size: number
    pages: number
    mimetype: string
    encoding: string
    sha256: string
    details: FileInfoDetail[]
}

export type FileInfoDetail = {
    side: Side
    confidence: number
    page: number
}

export type Metadata = {
    filesInfo: FileInfo[]
    timeSpent: number
}