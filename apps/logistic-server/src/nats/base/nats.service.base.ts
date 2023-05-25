import { Inject } from "@nestjs/common";
import { ClientNats } from "@nestjs/microservices";

export class NatsServiceBase {
  constructor(
    @Inject("NATS_CLIENT") protected readonly natsClient: ClientNats
  ) {}

  async onModuleInit() {
    await this.natsClient.connect();
  }
}
