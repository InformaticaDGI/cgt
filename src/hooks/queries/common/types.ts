export type PaginatedResponse<T> = {
    data: T[]
    pagination: {
        total: number
        totalPages: number | null
        hasNext: boolean
        hasPrev: boolean
    }
}