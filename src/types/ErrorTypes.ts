export interface ErrorResponse {
    timestamp: Date;
    statusCode: number;
    statusMessage: string;
    message: Record<string, string>
}