import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ShipmentServiceBase } from "./base/shipment.service.base";

@Injectable()
export class ShipmentService extends ShipmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
