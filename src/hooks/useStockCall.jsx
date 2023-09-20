
import { useDispatch } from 'react-redux';
import { fetchFail, fetchStart, getSuccess } from '../features/stockSlice';
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
      console.log(data);
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
      toastSuccessNotify("Firm successfully deleted!")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Firm could NOT be deleted!")
    }
  };

  return { getStockData, deleteStockData }
}

export default useStockCall

// https://react.dev/learn/reusing-logic-with-custom-hooks

//! Birden fazla componentte aynı fonksiyona veya fonksiyonlara ihtiyacım varsa (fetch gibi) ve bu fonksiyonlar içerisinde hooklara ihtiyaç duyuyorsam dispatch,state gibi o zaman custom hook yazmak mantıklıdır.
//* custom hooklar "use" kelimesiyle başlar.
//+ custom hooklar jsx return etmez.
//* custom hookslar parametre alabilirler.
//? birden fazla değer veya fonksiyon paylaşabiliriz. Eğer tek bir değer veya fonskiyon paylaşacaksak return deger dememiz yeterli. Ama birden fazlaysa o zaman object içerisinde değerlerimi, fonksiyonlarımı paylaşabilirim.
//? Tek değer paylaştığımızda kullancağımız componentte direk olarka çağırabiliriz. Ama birden fazla değer paylaşıyorsak kullanırken destructuring yapmalıyız.