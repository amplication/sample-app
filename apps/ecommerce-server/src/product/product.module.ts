import { Module } from "@nestjs/common";
import { ProductModuleBase } from "./base/product.module.base";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";

@Module({
  imports: [ProductModuleBase],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
