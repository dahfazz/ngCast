import { TenantDto } from './tenant-dto';
export interface IScheduleDto {
    id: string | undefined;
    tenant: TenantDto | undefined;
    name: string | undefined;
    description: string | undefined;
    url: string | undefined;
    duration: number | undefined;
    actualStart: Date;
    realEnd?: Date | undefined;
    isActive: boolean | undefined;
}
export declare class ScheduleDto implements IScheduleDto {
    id: string | undefined;
    tenant: TenantDto | undefined;
    name: string | undefined;
    description: string | undefined;
    url: string | undefined;
    duration: number | undefined;
    actualStart: Date;
    realEnd?: Date | undefined;
    isActive: boolean | undefined;
    constructor(data?: IScheduleDto);
    static fromJS(data: any): ScheduleDto;
    init(data?: any): void;
    toJSON(data?: any): any;
}
