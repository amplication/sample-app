import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CustomerWhereInput } from "./CustomerWhereInput";
import { Type } from "class-transformer";
import { CustomerOrderByInput } from "./CustomerOrderByInput";

@ArgsType()
class CustomerFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CustomerWhereInput,
  })
  @Field(() => CustomerWhereInput, { nullable: true })
  @Type(() => CustomerWhereInput)
  where?: CustomerWhereInput;

  @ApiProperty({
    required: false,
    type: CustomerOrderByInput,
  })
  @Field(() => CustomerOrderByInput, { nullable: true })
  @Type(() => CustomerOrderByInput)
  orderBy?: CustomerOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { CustomerFindManyArgs };
