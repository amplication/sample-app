import { InputJsonValue } from "../../types";
import { OrderUpdateManyWithoutCustomersInput } from "./OrderUpdateManyWithoutCustomersInput";

export type CustomerUpdateInput = {
  address?: InputJsonValue;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  orders?: OrderUpdateManyWithoutCustomersInput;
  phone?: string | null;
};
