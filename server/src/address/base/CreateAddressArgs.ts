import { ArgsType, Field } from "@nestjs/graphql";
import { AddressCreateInput } from "./AddressCreateInput";

@ArgsType()
class CreateAddressArgs {
  @Field(() => AddressCreateInput, { nullable: false })
  data!: AddressCreateInput;
}

export { CreateAddressArgs };
