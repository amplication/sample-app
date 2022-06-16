import { InputJsonValue } from "../../types";
import { OrderCreateNestedManyWithoutCustomersInput } from "./OrderCreateNestedManyWithoutCustomersInput";

export type CustomerCreateInput = {
  address?: InputJsonValue;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  orders?: OrderCreateNestedManyWithoutCustomersInput;
  phone?: string | null;
};
