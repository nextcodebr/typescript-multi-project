export type MongoConfig = {
    uri: string
    minPoolSize?: number
    maxPoolSize?: number
    heartbeatFrequencyMS?: number
    loadBalanced?: boolean
    maxIdleTimeMS?: number
    waitQueueTimeoutMS?: number
}

export type RedisConfig = {
    key: string
    uri: string
}

export type NatsConfig = {
    uri: string
}

export type NatsListenerConfig = {
    queue: string
}

export type MonolithConfig = {
    redis: RedisConfig
}