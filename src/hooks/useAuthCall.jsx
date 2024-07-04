import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  const BASE_URL = process.env.VITE_BASE_URL;

  const login = async userInfo => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login successful");
      navigate("/stock");
      
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
toastErrorNotify("Login unsuccessful");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // let headers = {
      //   Authorization: `Token ${token}`,
      // };
      await axios.post(`${BASE_URL}/auth/logout/`, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });// post isteği atılırken axios ikinci parametreyi body olarak kabul eder. O nedenle eğer body bilgisi yoksa ikinci parametreye null veya boş obje tanımlanabilir. 3.parametre de headers verileri gönderilir.
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout successful");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout unsuccessful");
    }
  };

  const register = async userInfo => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register successful");
      navigate("/stock");
    } catch (err) {
      dispatch(fetchFail());
      if (err.response.status === 400) {
        for (const [key, value] of Object.entries(err.response.data)) {
          toastErrorNotify(`${key}: ${value[0]}`);
        }
      } else {
        toastErrorNotify("Register unsuccessful");
      }
    }
  };

  return { login, register, logout };
};

export default useAuthCall;





//! Birden fazla componentte aynı fonksiyona veya fonksiyonlara ihtiyacım varsa (fetch gibi) ve bu fonksiyonlar içerisinde hooklara ihtiyaç duyuyorsam dispatch,state gibi o zaman custom hook yazmak mantıklıdır.
//* custom hooklar "use" kelimesiyle başlar.
//+ custom hooklar jsx return etmez.
//* custom hookslar parametre alabilirler.
//? birden fazla değer veya fonksiyon paylaşabiliriz. Eğer tek bir değer veya fonskiyon paylaşacaksak return deger dememiz yeterli. Ama birden fazlaysa o zaman object içerisinde değerlerimi, fonksiyonlarımı paylaşabilirim.
//? Tek değer paylaştığımızda kullancağımız componentte direk olarka çağırabiliriz. Ama birden fazla değer paylaşıyorsak kullanırken destructuring yapmalıyız.