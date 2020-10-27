import * as moment from 'moment';
export declare class TenantDto implements ITenantDto {
    tenancyName: string | undefined;
    name: string | undefined;
    connectionString: string | undefined;
    editionId: number | undefined;
    isActive: boolean;
    subscriptionEndDateUtc: moment.Moment | undefined;
    isInTrialPeriod: boolean;
    id: number;
    constructor(data?: ITenantDto);
    init(data?: any): void;
    static fromJS(data: any): TenantDto;
    toJSON(data?: any): any;
}
export interface ITenantDto {
    tenancyName: string | undefined;
    name: string | undefined;
    connectionString: string | undefined;
    editionId: number | undefined;
    isActive: boolean;
    subscriptionEndDateUtc: moment.Moment | undefined;
    isInTrialPeriod: boolean;
    id: number;
}
