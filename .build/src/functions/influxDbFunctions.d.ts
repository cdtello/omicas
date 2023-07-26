import { APIGatewayProxyHandler } from 'aws-lambda';
export declare const pushInfluxDb: APIGatewayProxyHandler;
export declare const insert: (event: any) => Promise<void>;
