import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactions/transactionSlice";
import contactReducer from "./contacts/contactSlice";
export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    contacts: contactReducer,
  },
});
