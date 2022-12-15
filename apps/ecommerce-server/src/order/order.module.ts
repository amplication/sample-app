import { Module } from "@nestjs/common";
import { OrderModuleBase } from "./base/order.module.base";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [OrderModuleBase],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
