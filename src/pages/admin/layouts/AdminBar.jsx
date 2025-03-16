import { NavLink, Outlet } from "react-router-dom"
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
// import '../assets/reset.css'
const paths=[
    {
        path:'products',
        name:'商品管理'
    },
    {
        path:'orders',
        name:'訂單管理'
    }
] 

 function AdminBar(){
    
    const navigate= useNavigate();


  useEffect(function() {
    //取得目前的token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = `${token}`;
    checkAdmin();
  }, []);
    //登入驗證 不成功就回到登入頁面
    async function checkAdmin() {
        try {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/check`);
          navigate("/admin/products");

        } catch (err) {
          navigate("/admin/login");
          alert(err.response.data.message);
        }
      };


    return (<><nav className="navbar p-0">
        <ul className='navbar-nav flex-row justify-content-between' style={{ width:'100%',padding:'10px 0px'}}>
            <div style={{display:'flex'}}>{paths.map(function(item){
            return <><li key={item.path} className="nav-item" style={{padding:'10px'}}>
            <NavLink className="nav-link" aria-current="page" to={item.path}>{item.name}</NavLink>
            </li></>
            })}
      </div>
      </ul></nav>
     <Outlet></Outlet>
  </>)}

  export default AdminBar