import { Classification, Metadata } from "./share"

export type ClassifyBase64Response = {
    data: Classification[]
    metadata: Metadata
}