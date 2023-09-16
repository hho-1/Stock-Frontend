import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, registerSuccess } from "../features/authSlice";
import axios from "axios";


const useAuthCall = () => {                     //custom Hook 'use' ile baslamak zorunda
    const dispatch = useDispatch();               //Bunu direkt olarak kullanamiyorsun, mecburen bir custom hook ile sarmalliyoruz. useAuthCall bir custom hook
  
    const register = async userInfo => {
      dispatch(fetchStart());
      try {
        const { data } = await axios.post(
          "http://16105.fullstack.clarusway.com/account/register/",
          userInfo
        );
        console.log(data);
        dispatch(registerSuccess(data));
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    return register;
  };
  
  export default useAuthCall;