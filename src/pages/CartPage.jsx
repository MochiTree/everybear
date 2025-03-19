import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';

function CartPage(){
    const [cart,setCart]=useState({});
    const [isLoading,setLoading]=useState(true);
    async function getCart(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`)
            setCart(res.data.data)
            console.log(res.data.data)
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
    }
}
    useEffect(function(){
        getCart();
    },[])

    //更新購物車
    async function updateCart(item,qty){
        setLoading(true);
        if(qty>0){
        try{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`,{
                data:{
                    product_id:item.product_id,
                    qty:Number(qty)
                }
            });
            getCart();
            setLoading(false);
        }catch(err){
            alert(err);
        }}else{
        alert('數量不得小於1');}
        setLoading(false);
    }

    //刪除購物車
    async function deleteSingleItem(item){
        setLoading(true);
        try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`);
            getCart();
            setLoading(false);
        }catch(err){
            alert(err);
            setLoading(false);
        }
    }

    //刪除購物車(所有)
    async function deleteAllCart(){
        setLoading(true);
        try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/carts`);
            getCart();
            setLoading(false);
        }catch(err){
            alert(err);
            setLoading(false);
        }
    }
    
        return (<><div className='container py-5 mt-5 cartPage lxgw-wenkai-mono-tc-regular'>
            <table className="table align-middle text-center">
        <thead className='text-center'>
        <tr>
            <th></th>
            <th>圖片</th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
        </tr>
        </thead>

        <tbody>
            {cart.carts?.map(function(item){
                return (           
        <tr key={item.id}>
        <td>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>deleteSingleItem(item)}>
            刪除
        </button>
        </td>
        <td><img src={item.product.imageUrl} className='rounded-3 small-img' style={{width:'300px'}}></img></td>
        <td>{item.product.title}</td>
        <td>
        <div className="d-flex align-items-center justify-content-center">
            <div className="btn-group" role="group">
            <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={()=>updateCart(item,item.qty-1)}
            >
                -
            </button>
            <span
                className="btn border border-dark"
                style={{ width: "50px", cursor: "auto" }}
            >{item.qty}</span>
            <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={()=>updateCart(item,item.qty+1)}
            >
                +
            </button>
            </div>

        </div>
        </td>
        <td>{item.total}</td>
    </tr>
            )})}
        </tbody>
        <tfoot>
        <tr>
            <td colSpan="4" className="text-end">
            總計：
            </td>
            <td style={{ width: "130px" }}>{cart.total}</td>
        </tr>
        <tr>
            <td colSpan="1"><button className='btn btn-danger' onClick={deleteAllCart} disabled={cart.carts?.length==0}>清空購物車</button></td>
            <td colSpan="5" className='text-end'><Link to={'/checkout'} style={{color:'green'}}>前往結帳</Link></td>
        </tr>
        </tfoot>
    </table></div>
    {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
            </>)
}

export default CartPage