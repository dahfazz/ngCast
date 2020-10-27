import * as moment from 'moment';

export class TenantDto implements ITenantDto {
  tenancyName!: string | undefined;
  name!: string | undefined;
  connectionString!: string | undefined;
  editionId!: number | undefined;
  isActive!: boolean;
  subscriptionEndDateUtc!: moment.Moment | undefined;
  isInTrialPeriod!: boolean;
  id!: number;

  constructor(data?: ITenantDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.tenancyName = data["tenancyName"];
          this.name = data["name"];
          this.connectionString = data["connectionString"];
          this.editionId = data["editionId"];
          this.isActive = data["isActive"];
          this.subscriptionEndDateUtc = data["subscriptionEndDateUtc"] ? moment(data["subscriptionEndDateUtc"].toString()) : <any>undefined;
          this.isInTrialPeriod = data["isInTrialPeriod"];
          this.id = data["id"];
      }
  }

  static fromJS(data: any): TenantDto {
      data = typeof data === 'object' ? data : {};
      let result = new TenantDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["tenancyName"] = this.tenancyName;
      data["name"] = this.name;
      data["connectionString"] = this.connectionString;
      data["editionId"] = this.editionId;
      data["isActive"] = this.isActive;
      data["subscriptionEndDateUtc"] = this.subscriptionEndDateUtc ? this.subscriptionEndDateUtc.toISOString() : <any>undefined;
      data["isInTrialPeriod"] = this.isInTrialPeriod;
      data["id"] = this.id;
      return data;
  }
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
