import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    loading: false,
    error: false,
    products:[],
    sales: [],
    purchases: [],
    brands:[],
    firms: [],
    categories: []
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    /* firmsSuccess: (state, {payload}) =>{
        state.loading = false;                      Bu sekilde hepsini yazmak yerine alttaki gibi getSuccess fonksiyonu yazip onu kullanacagiz
        state.firms = payload;
    }, */
    getSuccess: (state, {payload: {data, url}}) => {
        state.loading = false;
        state[url] = data;
    },
    
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getSuccess,
} = stockSlice.actions;
export default stockSlice.reducer;