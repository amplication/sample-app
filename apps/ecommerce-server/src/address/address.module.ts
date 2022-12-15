import { Module } from "@nestjs/common";
import { AddressModuleBase } from "./base/address.module.base";
import { AddressService } from "./address.service";
import { AddressResolver } from "./address.resolver";

@Module({
  imports: [AddressModuleBase],
  providers: [AddressService, AddressResolver],
  exports: [AddressService],
})
export class AddressModule {}
