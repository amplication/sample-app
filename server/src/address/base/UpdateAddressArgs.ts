import { ArgsType, Field } from "@nestjs/graphql";
import { AddressWhereUniqueInput } from "./AddressWhereUniqueInput";
import { AddressUpdateInput } from "./AddressUpdateInput";

@ArgsType()
class UpdateAddressArgs {
  @Field(() => AddressWhereUniqueInput, { nullable: false })
  where!: AddressWhereUniqueInput;
  @Field(() => AddressUpdateInput, { nullable: false })
  data!: AddressUpdateInput;
}

export { UpdateAddressArgs };
