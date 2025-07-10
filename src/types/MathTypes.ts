export interface BaseResponse {
    number: number;
}

export interface PrimeResponse extends BaseResponse {
    prime: boolean;
}

export interface FactorialResponse extends BaseResponse {
    factorial: string;
}

export interface PrimeAndFactorialResponse extends FactorialResponse, PrimeResponse {}