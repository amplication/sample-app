import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { NatsController } from "./nats.controller";
import { natsClientModuleFactory } from "./nats.module.factory";
import { NatsService } from "./nats.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "NATS_CLIENT",
        inject: [ConfigService],
        useFactory: natsClientModuleFactory,
      },
    ]),
  ],
  controllers: [NatsController],
  providers: [NatsService],
  exports: [NatsService, ClientsModule],
})
export class NatsModule {}
