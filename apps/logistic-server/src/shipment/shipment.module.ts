import { Module } from "@nestjs/common";
import { ShipmentModuleBase } from "./base/shipment.module.base";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";

@Module({
  imports: [ShipmentModuleBase],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
