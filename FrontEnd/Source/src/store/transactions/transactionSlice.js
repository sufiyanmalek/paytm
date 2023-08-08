import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    statement: [],
    Expenses: 0,
    Added: 0,
    dates: {
      startDate: Date.now(),
      endDate: Date.now(),
    },
    openingBalance: 0,
    closingBalance: 0,
    pageNo: 0,
    dataFetching: true,
  },
  reducers: {
    unshiftTransaction: (state, action) => {
      if (state.transactions.length !== 0) {
        state.transactions.unshift(action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = [
        ...state.transactions,
        ...action.payload.transactions,
      ];
      state.pageNo = action.payload.pageNo;
      if (action.payload.transactions.length < 10) {
        state.dataFetching = false;
      }
    });
    builder.addCase(fetchStatement.fulfilled, (state, action) => {
      if (action.payload.transaction) {
        state.statement = [...action.payload.transaction];
        state.Expenses = action.payload.Out;
        state.Added = action.payload.In;
        state.dates = {
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
        };
        state.openingBalance = action.payload.openingBalance;
        state.closingBalance = action.payload.closingBalance;
      } else {
        state.statement = [];
      }
    });
  },
});

export const fetchTransactions = createAsyncThunk(
  "fetchTransactions",
  async (params) => {
    try {
      var config = {
        method: "get",
        url: `${url}/transactions`,
        headers: {
          pageNo: params.pageNo,
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      response.data.transactions = response.data.transactions.map((e) => {
        if (e.sender._id.toString() == e.receiver._id.toString()) {
          e = { ...e, status: "Added" };
          return e;
        } else if (
          e.receiver._id.toString() == params.user._id.toString() &&
          e.sender._id.toString() != params.user._id.toString()
        ) {
          e = { ...e, status: "Credited" };
          return e;
        } else if (
          e.sender._id.toString() == params.user._id &&
          e.receiver._id.toString() != params.user._id.toString()
        ) {
          e = { ...e, status: "Debited" };
          return e;
        }
      });
      console.log(response.data, "asd");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchStatement = createAsyncThunk(
  "fetchStatement",
  async (params) => {
    try {
      var config = {
        method: "get",
        url: `${url}/statement?startDate=${params.invoiceData.startDate}&endDate=${params.invoiceData.endDate}`,
      };

      const response = await axios(config);
      console.log(response.data, "123");
      if (response.data.transaction) {
        const data = response.data.transaction.map((e) => {
          if (e.sender._id.toString() == e.receiver._id.toString()) {
            e = { ...e, status: "Added" };
            return e;
          } else if (
            e.receiver._id.toString() == params.user._id.toString() &&
            e.sender._id.toString() != params.user._id.toString()
          ) {
            e = { ...e, status: "Credited" };
            return e;
          } else if (
            e.sender._id.toString() == params.user._id &&
            e.receiver._id.toString() != params.user._id.toString()
          ) {
            e = { ...e, status: "Debited" };
            return e;
          }
        });
        console.log(data, "asd");
        return { ...response.data, transaction: data };
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const { unshiftTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
