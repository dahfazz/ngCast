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

export class ScheduleDto implements IScheduleDto {
    id: string | undefined;
    tenant: TenantDto | undefined;
    name: string | undefined;
    description: string | undefined;
    url: string | undefined;
    duration: number | undefined;
    actualStart!: Date;
    realEnd?: Date | undefined;
    isActive: boolean | undefined;

    constructor(data?: IScheduleDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): ScheduleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ScheduleDto();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.id = data['id'];
            this.tenant = data['tenant'];
            this.name = data['name'];
            this.description = data['description'];
            this.url = data['url'];
            this.duration = data['duration'];
            this.actualStart = data['actualStart'];
            this.realEnd = data['realEnd'];
            this.isActive = data['isActive'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['tenant'] = this.tenant;
        data['name'] = this.name;
        data['description'] = this.description;
        data['url'] = this.url;
        data['duration'] = this.duration;
        data['actualStart'] = this.actualStart;
        data['realEnd'] = this.realEnd;
        data['isActive'] = this.isActive;
        return data;
    }
}
