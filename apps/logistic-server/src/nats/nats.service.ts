import { Injectable } from "@nestjs/common";
import { NatsServiceBase } from "./base/nats.service.base";

@Injectable()
export class NatsService extends NatsServiceBase {}
