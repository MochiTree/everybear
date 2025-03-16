import axios from 'axios';
import { useState,useEffect} from 'react';
import OrderModal from '../admin/components/OrderModal';
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

    function handleOpenOrderModal(currentItem) {
        setContent(currentItem);
        setIsOpen(true);
        }


    function handleOpenDelOrderModal(item) {
            setContent(item)
            setDelIsOpen(true);
          }   
    return (<>訂單管理
                <OrderModal orderContent={orderContent} isOpen={isOpen} setIsOpen={setIsOpen} setContent={setContent} getOrders={getOrder}></OrderModal>
                <DelOrderModal getOrders={getOrder} orderContent={orderContent} isDelOpen={isDelOpen} setDelIsOpen={setDelIsOpen} setContent={setContent}></DelOrderModal>
        <table className="table">
            <thead>
            <tr>
            <th scope="col">訂購人</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">連絡電話</th>
            <th scope="col">訂單詳細</th>

            </tr>
            </thead>
            <tbody>
            {orders.map(function(item){
            return(<tr key={item.id}>
            <th scope="row">{item.user.name}</th>
            <td>{item.total}</td>
            <td>{item.is_enabled ? <span className='text-success'>已付款</span>: <span>未付款</span>}</td>
            <td>{item.user.tel}</td>
            <div className="btn-group">
            <button className='btn btn-primary btn-sm'onClick={function() {
                handleOpenOrderModal(item);
            }}>編輯</button><button className='btn btn-danger btn-sm' onClick={()=>handleOpenDelOrderModal(item)}>刪除</button></div>
            </tr>)
            })}
            </tbody>
            </table>
            {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
            </>)
}

export default OrderPage