import { APIGatewayProxyHandler } from 'aws-lambda'
export declare const hello: APIGatewayProxyHandler
export declare const insert: (event: any) => Promise<void>
