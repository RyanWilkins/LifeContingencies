import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { LifeTable, UserInputs } from "../types";

export {};

interface LifeTableState {
  loadingStatus: "idle" | "loading" | "processing" | "failed";
  loaded_tables: string[];
  current_table: string;
  tables: LifeTable[];
}

export const initialLifeTableState: LifeTableState = {
  loadingStatus: "idle",
  loaded_tables: [],
  current_table: "",
  tables: [],
};

export const fetchLifeTable = createAsyncThunk(
  "lifetable/fetchLifeTable",
  async ({
    input,
    loaded_tables,
  }: {
    input: UserInputs;
    loaded_tables: string[];
  }) => {
    //TODO: What is an axios CancelToken
    const tableToFetch: string = `lifetable_2018_${input.country}_${
      input.gender === "other" ? "all" : input.gender
    }_${input.ethnicity}_${input.smoking}`.toLowerCase();
    if (loaded_tables.includes(tableToFetch)) {
      return tableToFetch;
    }
    const response = await axios.get(process.env.NODE_ENV === "development"
                                        ? baseUrl + tableToFetch
                                        : baseUrl + tableToFetch + ".json");

    const newTable: LifeTable = {
      table_name: tableToFetch,
      table_link: baseUrl + tableToFetch,
      gender: input.gender === "other" ? "all" : input.gender,
      ethnicity: input.ethnicity,
      country: input.country,
      smoking: input.smoking,
      elements: response.data,
    };

    return newTable;
  }
);

const lifeTableSlice = createSlice({
  name: "lifetable",
  initialState: initialLifeTableState,
  reducers: {
    loadLifeTable: (state, action: PayloadAction<UserInputs>) => {
      state.loadingStatus = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLifeTable.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchLifeTable.fulfilled, (state, action) => {
        state.loadingStatus = "processing";

        if (typeof action.payload !== "string") {
          const newtable = action.payload as LifeTable;
          state.loaded_tables = [...state.loaded_tables, newtable.table_name];
          state.current_table = newtable.table_name;
          state.tables = [...state.tables, newtable];
        } else {
          state.current_table = action.payload;
        }

        state.loadingStatus = "idle";
      });
  },
});

export const { loadLifeTable } = lifeTableSlice.actions;
export default lifeTableSlice.reducer;
