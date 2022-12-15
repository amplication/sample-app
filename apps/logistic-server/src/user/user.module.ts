import { Module } from "@nestjs/common";
import { UserModuleBase } from "./base/user.module.base";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [UserModuleBase],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
