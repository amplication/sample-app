import { Module } from "@nestjs/common";
import { WarehouseModuleBase } from "./base/warehouse.module.base";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";

@Module({
  imports: [WarehouseModuleBase],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
