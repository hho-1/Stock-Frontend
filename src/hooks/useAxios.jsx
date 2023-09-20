import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {

    const {token} = useSelector(state => state.auth)
  
    const axiosWithToken = axios.create({                      //Bu bir instance'dir, Baska instance'lar da olusturulabilir.
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {Authorization: `Token ${token}`}
    });

    return {axiosWithToken};
}

export default useAxios