import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CustomerServiceBase } from "./base/customer.service.base";

@Injectable()
export class CustomerService extends CustomerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
