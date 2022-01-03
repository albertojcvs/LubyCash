import { Client as ClientPersistence } from "@prisma/client";
import { Client } from "../models/Client";
import { ClientStatus } from "../enums/ClientStatus";
import { ClientStatusMapper } from "./ClientStatusMapper";

export class ClientMapper {
  static toModel({
    address,
    average_salary,
    city,
    cpf,
    email,
    full_name,
    id,
    phone_number,
    state,
    status,
    zipcode, 
    balance,
    created_at,
    updated_at
  }: ClientPersistence): Client {
    return new Client({
      id,
      fullname: full_name,
      cpf,
      averageSalary: average_salary,
      phoneNumber: phone_number,
      email: email,
      status: ClientStatusMapper.toModel(status),
      balance,
      createdAt:created_at,
      updatedAt:updated_at,
      address: {
        address,
        city,
        state,
        zipcode,
      },
    });
  }

  static toPersistence({
    id,
    email,
    cpf,
    address,
    averageSalary,
    fullname,
    phoneNumber,
    status,
    balance
  }: Client) {
    return {
      id,
      email,
      cpf,
      average_salary: averageSalary,
      full_name: fullname,
      phone_number: phoneNumber,
      status: ClientStatusMapper.toPersistence(status),
      ...address,
      balance
    };
  }
}
