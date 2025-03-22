import axios from 'axios';
import { useState,useEffect} from 'react';
import DelOrderModal from '../admin/components/DelOrderModal';
import Lottie from "lottie-react";
import teaBearLoading from '../../animations/tea-bear-loading.json';
import {useNavigate} from 'react-router-dom';
function OrderPage(){
    const [orders,setOrders]=useState([]);
    const [isOpen,setIsOpen]=useState(false);
    const [isDelOpen,setDelIsOpen]=useState(false);
    const [isLoading,setLoading]=useState(true);

    async function getOrder(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/orders`)
            console.log(res.data)
            setOrders(res.data.orders)
            setLoading(false)
        }catch(err){
            alert(err);
            setLoading(false);
            navigate("/admin/login");
        }
    }
    useEffect(function(){
          //取得目前的token
        //   const token = document.cookie.replace(
        //     /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
        //     "$1"
        // );
        // axios.defaults.headers.common.Authorization = `${token}`;
        checkAdmin();
    },[])

    const navigate= useNavigate();

    //登入驗證 不成功就回到登入頁面
    async function checkAdmin() {
        try {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/check`);
          getOrder();
        } catch (err) {
          navigate("/admin/login");
          setLoading(false);
          alert(err.response.data.message);
        }
      };


    const [orderContent, setContent]=useState({});//後台頁面:編輯/新增用


    function handleOpenDelOrderModal(item) {
            setContent(item)
            setDelIsOpen(true);
          }   
    return (<>
                <DelOrderModal getOrders={getOrder} orderContent={orderContent} isDelOpen={isDelOpen} setDelIsOpen={setDelIsOpen} setContent={setContent}></DelOrderModal>
       <div className="container  lxgw-wenkai-mono-tc-regular">
        <h1 className='fw-bold fs-3 mb-2'>訂單管理</h1>
        <table className="table">
            <thead>
            <tr className='fs-4'>
            <th scope="col">訂購人</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">連絡電話</th>
            <th scope="col">刪除訂單</th>

            </tr>
            </thead>
            <tbody>
            {orders.map(function(item){
            return(<tr key={item.id} className='fs-5'>
            <th scope="row">{item.user.name}</th>
            <td>{item.total}</td>
            <td>{item.is_enabled ? <span className='text-success'>已付款</span>: <span>未付款</span>}</td>
            <td>{item.user.tel}</td>
            <td><div className="btn-group">
            <button className='btn btn-danger btn-sm' onClick={()=>handleOpenDelOrderModal(item)}>刪除</button></div></td>
            </tr>)
            })}
            </tbody>
            </table>
            </div>
            {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
            </>)
}

export default OrderPage