/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import {
  Prisma,
  Warehouse as PrismaWarehouse,
  Shipment as PrismaShipment,
} from "@prisma/client";

export class WarehouseServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.WarehouseCountArgs, "select">
  ): Promise<number> {
    return this.prisma.warehouse.count(args);
  }

  async warehouses(
    args: Prisma.WarehouseFindManyArgs
  ): Promise<PrismaWarehouse[]> {
    return this.prisma.warehouse.findMany(args);
  }
  async warehouse(
    args: Prisma.WarehouseFindUniqueArgs
  ): Promise<PrismaWarehouse | null> {
    return this.prisma.warehouse.findUnique(args);
  }
  async createWarehouse(
    args: Prisma.WarehouseCreateArgs
  ): Promise<PrismaWarehouse> {
    return this.prisma.warehouse.create(args);
  }
  async updateWarehouse(
    args: Prisma.WarehouseUpdateArgs
  ): Promise<PrismaWarehouse> {
    return this.prisma.warehouse.update(args);
  }
  async deleteWarehouse(
    args: Prisma.WarehouseDeleteArgs
  ): Promise<PrismaWarehouse> {
    return this.prisma.warehouse.delete(args);
  }

  async findShipments(
    parentId: string,
    args: Prisma.ShipmentFindManyArgs
  ): Promise<PrismaShipment[]> {
    return this.prisma.warehouse
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .shipments(args);
  }
}
