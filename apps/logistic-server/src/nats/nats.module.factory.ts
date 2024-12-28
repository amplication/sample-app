import { ConfigService } from "@nestjs/config";
import { ClientProvider, Transport } from "@nestjs/microservices";

export const natsClientModuleFactory = (
  configService: ConfigService
): ClientProvider => {
  const natsServersString = configService.get<string>("NATS_SERVERS");
  if (!natsServersString) {
    throw new Error("NATS_SERVERS environment variable must be defined");
  }

  return {
    transport: Transport.NATS,
    options: {
      servers: [...natsServersString.split(",")],
      name: "logistic",
    },
  };
};
