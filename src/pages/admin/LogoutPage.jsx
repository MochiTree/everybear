import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage(){
    const navigate=useNavigate();

    async function logout(){
        try{ 
            const res = axios.post(`${import.meta.env.VITE_BASE_URL}/v2/logout`);
            
            navigate("/admin/login");
        }catch(err){
            alert(err.message)
            navigate("/admin/login");
        }
    }
    useEffect(function(){
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        axios.defaults.headers.common.Authorization = token;
        
        logout()
    },[])
    return<></>
}

export default LogoutPage