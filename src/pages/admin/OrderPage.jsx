import axios from 'axios';
import { useState,useEffect} from 'react';
import OrderModal from '../admin/components/OrderModal';
import DelOrderModal from '../admin/components/DelOrderModal';
function OrderPage(){
    const [orders,setOrders]=useState([]);
    const [isOpen,setIsOpen]=useState(false);
    const [isDelOpen,setDelIsOpen]=useState(false);

    async function getOrder(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/orders`)
            console.log(res.data)
            setOrders(res.data.orders)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(function(){
        getOrder();
    },[])

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
            </table></>)
}

export default OrderPage