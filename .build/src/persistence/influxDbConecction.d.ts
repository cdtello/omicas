import { QueryApi, WriteApi } from '@influxdata/influxdb-client';
export declare const influxWriteConnection: () => Promise<WriteApi>;
export declare const influxReadConnection: () => Promise<QueryApi>;
