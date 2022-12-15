import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WarehouseService } from "./warehouse.service";
import { WarehouseControllerBase } from "./base/warehouse.controller.base";

@swagger.ApiTags("warehouses")
@common.Controller("warehouses")
export class WarehouseController extends WarehouseControllerBase {
  constructor(
    protected readonly service: WarehouseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
