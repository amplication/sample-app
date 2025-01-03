/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { WarehouseWhereUniqueInput } from "../../warehouse/base/WarehouseWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class WarehouseUpdateManyWithoutShipmentsInput {
  @Field(() => [WarehouseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseWhereUniqueInput],
  })
  connect?: Array<WarehouseWhereUniqueInput>;

  @Field(() => [WarehouseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseWhereUniqueInput],
  })
  disconnect?: Array<WarehouseWhereUniqueInput>;

  @Field(() => [WarehouseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [WarehouseWhereUniqueInput],
  })
  set?: Array<WarehouseWhereUniqueInput>;
}

export { WarehouseUpdateManyWithoutShipmentsInput as WarehouseUpdateManyWithoutShipmentsInput };
