import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { WarehouseServiceBase } from "./base/warehouse.service.base";

@Injectable()
export class WarehouseService extends WarehouseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
