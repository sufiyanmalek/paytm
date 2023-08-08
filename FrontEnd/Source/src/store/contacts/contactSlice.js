import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contactList",
  initialState: {
    contactList: {},
  },
  reducers: {
    getContactList: (state, action) => {
      state.contactList = action.payload;
    },
  },
});

export const { getContactList } = contactSlice.actions;
export default contactSlice.reducer;
