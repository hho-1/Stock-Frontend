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
    getProCatBrandSuccess: (state, {payload}) => {
      state.loading = false;
      state.products = payload[0];
      state.brands = payload[1];
      state.categories = payload[2];
      state.sales = payload[3];
      state.purchases = payload[4];
    },
    
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSuccess,
  getProCatBrandSuccess,
  fetchFail,
} = stockSlice.actions;
export default stockSlice.reducer;