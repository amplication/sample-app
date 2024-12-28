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
import { ShipmentService } from "../shipment.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ShipmentCreateInput } from "./ShipmentCreateInput";
import { Shipment } from "./Shipment";
import { ShipmentFindManyArgs } from "./ShipmentFindManyArgs";
import { ShipmentWhereUniqueInput } from "./ShipmentWhereUniqueInput";
import { ShipmentUpdateInput } from "./ShipmentUpdateInput";
import { WarehouseFindManyArgs } from "../../warehouse/base/WarehouseFindManyArgs";
import { Warehouse } from "../../warehouse/base/Warehouse";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ShipmentControllerBase {
  constructor(
    protected readonly service: ShipmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Shipment })
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createShipment(
    @common.Body() data: ShipmentCreateInput
  ): Promise<Shipment> {
    return await this.service.createShipment({
      data: data,
      select: {
        createdAt: true,
        id: true,
        location: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Shipment] })
  @ApiNestedQuery(ShipmentFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async shipments(@common.Req() request: Request): Promise<Shipment[]> {
    const args = plainToClass(ShipmentFindManyArgs, request.query);
    return this.service.shipments({
      ...args,
      select: {
        createdAt: true,
        id: true,
        location: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Shipment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async shipment(
    @common.Param() params: ShipmentWhereUniqueInput
  ): Promise<Shipment | null> {
    const result = await this.service.shipment({
      where: params,
      select: {
        createdAt: true,
        id: true,
        location: true,
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
  @swagger.ApiOkResponse({ type: Shipment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateShipment(
    @common.Param() params: ShipmentWhereUniqueInput,
    @common.Body() data: ShipmentUpdateInput
  ): Promise<Shipment | null> {
    try {
      return await this.service.updateShipment({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          location: true,
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
  @swagger.ApiOkResponse({ type: Shipment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteShipment(
    @common.Param() params: ShipmentWhereUniqueInput
  ): Promise<Shipment | null> {
    try {
      return await this.service.deleteShipment({
        where: params,
        select: {
          createdAt: true,
          id: true,
          location: true,
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
  @common.Get("/:id/warehouse")
  @ApiNestedQuery(WarehouseFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Warehouse",
    action: "read",
    possession: "any",
  })
  async findWarehouse(
    @common.Req() request: Request,
    @common.Param() params: ShipmentWhereUniqueInput
  ): Promise<Warehouse[]> {
    const query = plainToClass(WarehouseFindManyArgs, request.query);
    const results = await this.service.findWarehouse(params.id, {
      ...query,
      select: {
        address: true,
        createdAt: true,
        id: true,
        name: true,
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

  @common.Post("/:id/warehouse")
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "update",
    possession: "any",
  })
  async connectWarehouse(
    @common.Param() params: ShipmentWhereUniqueInput,
    @common.Body() body: WarehouseWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      warehouse: {
        connect: body,
      },
    };
    await this.service.updateShipment({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/warehouse")
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "update",
    possession: "any",
  })
  async updateWarehouse(
    @common.Param() params: ShipmentWhereUniqueInput,
    @common.Body() body: WarehouseWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      warehouse: {
        set: body,
      },
    };
    await this.service.updateShipment({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/warehouse")
  @nestAccessControl.UseRoles({
    resource: "Shipment",
    action: "update",
    possession: "any",
  })
  async disconnectWarehouse(
    @common.Param() params: ShipmentWhereUniqueInput,
    @common.Body() body: WarehouseWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      warehouse: {
        disconnect: body,
      },
    };
    await this.service.updateShipment({
      where: params,
      data,
      select: { id: true },
    });
  }
}
