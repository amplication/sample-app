import { SortOrder } from "../../util/SortOrder";

export type CustomerOrderByInput = {
  address?: SortOrder;
  createdAt?: SortOrder;
  email?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  phone?: SortOrder;
  updatedAt?: SortOrder;
};
