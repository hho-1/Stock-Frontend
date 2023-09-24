
import { useDispatch } from 'react-redux';
import { fetchFail, fetchStart, getProCatBrandSuccess, getSuccess } from '../features/stockSlice';
//import axios from 'axios';
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';
import useAxios from './useAxios';

const useStockCall = () => {
  const dispatch = useDispatch();
  //const { token } = useSelector(state => state.auth);
  const {axiosWithToken} = useAxios()

  //const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      //const url = "firms";
      /* const { data } = await axios(`${BASE_URL}stock/${url}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }); */
      const { data } = await axiosWithToken(`stock/${url}/`);
      
      // dispatch(getSuccess({data, url:"firms"}))
      dispatch(getSuccess({ data, url })); // {data:data,url:url}
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      //const url = "firms";
      /* const { data } = await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }); */
      const { data } = await axiosWithToken.delete(`stock/${url}/${id}/`);
      console.log(data);
      // dispatch(getSuccess({data, url:"firms"}))
      getStockData(url)
      toastSuccessNotify(`${url} successfully deleted!`)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} could NOT be deleted!`)
    }
  };
  const postStockData = async (url, firmData) => {
    dispatch(fetchStart());
    try {
      
      const { data } = await axiosWithToken.post(`stock/${url}/`, firmData);
      console.log(data);
      // dispatch(getSuccess({data, url:"firms"}))
      getStockData(url)
      toastSuccessNotify(`${url} successfully created!`)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} could NOT be created!`)
    }
  };

  const putStockData = async (url, firmData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`stock/${url}/${firmData.id}/`, firmData);

      getStockData(url);
      toastSuccessNotify(`${url} successfuly updated!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} could NOT be updated!`);
    }
  };


  //!Promise All 

  const getProCatBrand = async (url) => {
    dispatch(fetchStart());
    try {
      
      //const products = axiosWithToken(`stock/${url}/`);
      const [products, brands, categories, sales, purchases] = await Promise.all([
        axiosWithToken(`stock/products/`),
        axiosWithToken(`stock/brands/`),
        axiosWithToken(`stock/categories/`),
        axiosWithToken(`stock/sales/`),
        axiosWithToken(`stock/purchases/`),
      ]);
      
      dispatch(getProCatBrandSuccess([products?.data, brands?.data, categories?.data, sales?.data, purchases?.data]))
    } catch (error) {
      dispatch(fetchFail());
    }
  };



  return { getStockData, deleteStockData, postStockData, putStockData, getProCatBrand}
}

export default useStockCall

// https://react.dev/learn/reusing-logic-with-custom-hooks

//! Birden fazla componentte aynı fonksiyona veya fonksiyonlara ihtiyacım varsa (fetch gibi) ve bu fonksiyonlar içerisinde hooklara ihtiyaç duyuyorsam dispatch,state gibi o zaman custom hook yazmak mantıklıdır.
//* custom hooklar "use" kelimesiyle başlar.
//+ custom hooklar jsx return etmez.
//* custom hookslar parametre alabilirler.
//? birden fazla değer veya fonksiyon paylaşabiliriz. Eğer tek bir değer veya fonskiyon paylaşacaksak return deger dememiz yeterli. Ama birden fazlaysa o zaman object içerisinde değerlerimi, fonksiyonlarımı paylaşabilirim.
//? Tek değer paylaştığımızda kullancağımız componentte direk olarka çağırabiliriz. Ama birden fazla değer paylaşıyorsak kullanırken destructuring yapmalıyız.