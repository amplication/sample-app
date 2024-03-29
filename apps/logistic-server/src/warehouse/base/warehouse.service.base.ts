/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import { Prisma, Warehouse, Shipment } from "@prisma/client";

export class WarehouseServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.WarehouseFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WarehouseFindManyArgs>
  ): Promise<number> {
    return this.prisma.warehouse.count(args);
  }

  async findMany<T extends Prisma.WarehouseFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WarehouseFindManyArgs>
  ): Promise<Warehouse[]> {
    return this.prisma.warehouse.findMany(args);
  }
  async findOne<T extends Prisma.WarehouseFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.WarehouseFindUniqueArgs>
  ): Promise<Warehouse | null> {
    return this.prisma.warehouse.findUnique(args);
  }
  async create<T extends Prisma.WarehouseCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WarehouseCreateArgs>
  ): Promise<Warehouse> {
    return this.prisma.warehouse.create<T>(args);
  }
  async update<T extends Prisma.WarehouseUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WarehouseUpdateArgs>
  ): Promise<Warehouse> {
    return this.prisma.warehouse.update<T>(args);
  }
  async delete<T extends Prisma.WarehouseDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.WarehouseDeleteArgs>
  ): Promise<Warehouse> {
    return this.prisma.warehouse.delete(args);
  }

  async findShipments(
    parentId: string,
    args: Prisma.ShipmentFindManyArgs
  ): Promise<Shipment[]> {
    return this.prisma.warehouse
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .shipments(args);
  }
}
