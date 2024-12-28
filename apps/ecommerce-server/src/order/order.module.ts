import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { OrderModuleBase } from "./base/order.module.base";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [OrderModuleBase, forwardRef(() => AuthModule)],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
