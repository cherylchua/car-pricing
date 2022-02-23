export interface GetPriceRequest {
    numberPlate: string;
    skipCacheForRead?: boolean;
}

export interface GetPriceResponse {
    numberPlate: string;
    price: number;
}
