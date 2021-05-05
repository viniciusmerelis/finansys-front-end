import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

interface Address {
  street: string,
  district: string,
  city: string,
  uf: string
}

export class Contact extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public lastName?: string,
    public cpf?: string,
    public email?: string,
    public phone?: string,
    public address?: Address
  ) {
    super();
  }

  static fromJson(jsonData: any): Contact {
    return Object.assign(new Contact(), jsonData);
  }

}
