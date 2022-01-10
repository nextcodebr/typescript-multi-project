export type Base64Payload = Record<string, string>

export type BasicHttpRequest = {
    headers: Record<string, string>
}

export type ClassifyBase64Request = BasicHttpRequest & { payload: Base64Payload }