/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { WarehouseService } from "../warehouse.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { WarehouseCreateInput } from "./WarehouseCreateInput";
import { Warehouse } from "./Warehouse";
import { WarehouseFindManyArgs } from "./WarehouseFindManyArgs";
import { WarehouseWhereUniqueInput } from "./WarehouseWhereUniqueInput";
import { WarehouseUpdateInput } from "./WarehouseUpdateInput";
import { ShipmentFindManyArgs } from "../../shipment/base/ShipmentFindManyArgs";
import { Shipment } from "../../shipment/base/Shipment";
import { ShipmentWhereUniqueInput } from "../../shipment/base/ShipmentWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class WarehouseControllerBase {
  constructor(
    protected readonly service: WarehouseService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Warehouse })
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createWarehouse(
    @common.Body() data: WarehouseCreateInput
  ): Promise<Warehouse> {
    return await this.service.createWarehouse({
      data: data,
      select: {
        address: true,
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Warehouse] })
  @ApiNestedQuery(WarehouseFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async warehouses(@common.Req() request: Request): Promise<Warehouse[]> {
    const args = plainToClass(WarehouseFindManyArgs, request.query);
    return this.service.warehouses({
      ...args,
      select: {
        address: true,
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Warehouse })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async warehouse(
    @common.Param() params: WarehouseWhereUniqueInput
  ): Promise<Warehouse | null> {
    const result = await this.service.warehouse({
      where: params,
      select: {
        address: true,
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Warehouse })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateWarehouse(
    @common.Param() params: WarehouseWhereUniqueInput,
    @common.Body() data: WarehouseUpdateInput
  ): Promise<Warehouse | null> {
    try {
      return await this.service.updateWarehouse({
        where: params,
        data: data,
        select: {
          address: true,
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Warehouse })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteWarehouse(
    @common.Param() params: WarehouseWhereUniqueInput
  ): Promise<Warehouse | null> {
    try {
      return await this.service.deleteWarehouse({
        where: params,
        select: {
          address: true,
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/shipments")
  @ApiNestedQuery(ShipmentFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "read",
    possession: "any",
  })
  async findShipments(
    @common.Req() request: Request,
    @common.Param() params: WarehouseWhereUniqueInput
  ): Promise<Shipment[]> {
    const query = plainToClass(ShipmentFindManyArgs, request.query);
    const results = await this.service.findShipments(params.id, {
      ...query,
      select: {
        createdAt: true,
        id: true,
        location: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/shipments")
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "update",
    possession: "any",
  })
  async connectShipments(
    @common.Param() params: WarehouseWhereUniqueInput,
    @common.Body() body: ShipmentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      shipments: {
        connect: body,
      },
    };
    await this.service.updateWarehouse({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/shipments")
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "update",
    possession: "any",
  })
  async updateShipments(
    @common.Param() params: WarehouseWhereUniqueInput,
    @common.Body() body: ShipmentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      shipments: {
        set: body,
      },
    };
    await this.service.updateWarehouse({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/shipments")
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "update",
    possession: "any",
  })
  async disconnectShipments(
    @common.Param() params: WarehouseWhereUniqueInput,
    @common.Body() body: ShipmentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      shipments: {
        disconnect: body,
      },
    };
    await this.service.updateWarehouse({
      where: params,
      data,
      select: { id: true },
    });
  }
}
