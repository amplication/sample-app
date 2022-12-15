import { Module } from "@nestjs/common";
import { CustomerModuleBase } from "./base/customer.module.base";
import { CustomerService } from "./customer.service";
import { CustomerResolver } from "./customer.resolver";

@Module({
  imports: [CustomerModuleBase],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
