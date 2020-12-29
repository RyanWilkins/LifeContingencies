import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl } from "../baseUrl";
import { DeathTable, UserInputs } from "../types";

interface DeathTableState {
    loadingStatus: "idle" | "loading" | "processing" | "failed";
    loaded_tables: string[];
    current_table: string;
    tables : DeathTable[];
}

export const initialDeathTableState: DeathTableState = {
    loadingStatus: "idle",
    loaded_tables: [],
    current_table: "",
    tables: []
}


export const fetchDeathTable = createAsyncThunk('deathtable/fetchDeathTable', async ({input, loaded_tables} : {input: UserInputs, loaded_tables: string[]} ) => {
    //TODO: What is an axios CancelToken
    // const tableToFetch: string = `lifetable_2018_${input.country}_${input.gender === "other" ? "all" : input.gender}_${input.ethnicity}_${input.smoking}`.toLowerCase()
    const tableToFetch = input.gender === "other" 
                                ? "all_causes_all_us"
                                : input.gender === "male" 
                                    ? "all_causes_male_us"
                                    : "all_causes_female_us"
    if(loaded_tables.includes(tableToFetch)){
        return tableToFetch
    }
    const response = await axios.get(process.env.NODE_ENV === "development"
                                        ? baseUrl + tableToFetch
                                        : baseUrl + tableToFetch + ".json");

    const newTable: DeathTable = {
        table_name: tableToFetch,
        table_link: baseUrl + tableToFetch,
        gender: "all",
        country: "US",
        elements: response.data
    }

    return newTable
    }
)

const deathTableSlice = createSlice({
    name: "deathtable",
    initialState: initialDeathTableState,
    reducers:{
        loadDeathTable: (state, 
            action: PayloadAction<UserInputs>) => {
                    state.loadingStatus = "loading"
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchDeathTable.pending, (state,action) =>{
                state.loadingStatus = 'loading'
            })
            .addCase(fetchDeathTable.fulfilled, (state, action) => {
                state.loadingStatus = 'processing'

                if(typeof action.payload !== "string"){
                    const newtable = action.payload as DeathTable
                    state.loaded_tables = [...state.loaded_tables, newtable.table_name]
                    state.current_table = newtable.table_name
                    state.tables = [...state.tables, newtable]
                } else{
                    state.current_table = action.payload
                }

                state.loadingStatus = 'idle'
            })
    }
})

export const {loadDeathTable} = deathTableSlice.actions
export default deathTableSlice.reducer
