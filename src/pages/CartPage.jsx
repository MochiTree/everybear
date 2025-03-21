import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';
import { useNavigate } from 'react-router-dom';

function CartPage(){
    const [cart,setCart]=useState({});
    const [isLoading,setLoading]=useState(true);
    const navigate=useNavigate();

    async function getCart(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`)
            setLoading(false);
            console.log(res.data.data)
            if(res.data.data.carts.length===0){
                alert('還沒有將產品加入購物車喔，快去看看！')
                navigate("/products");
            }else if(res.data.data.carts.length>0) {
                setCart(res.data.data)
            }
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
        <tbody>
            {cart.carts?.map(function(item){
                return (           
        <tr key={item.id} className='d-flex flex-column flex-lg-row justify-content-between align-items-center mb-4 mb-lg-0'>
        <td><img src={item.product.imageUrl} className='rounded-3 small-img' style={{width:'300px'}}></img></td>
        <td className='fs-4 fw-bolder'>{item.product.title}</td>
        <td>單價：{item.product.price}</td>
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
        <td className='fs-5'>總計：{item.total}</td>
        <td>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>deleteSingleItem(item)}>
            移除此產品
        </button>
        </td>
    </tr>
            )})}
        </tbody>
        <tfoot className='d-flex flex-column'>
        <tr className='d-flex flex-column'>
            <td colSpan="4" className="text-center fs-5">
                總計：{cart.total}
            </td>
            {/* <td style={{ width: "130px" }}></td> */}
        </tr>
        <tr className='d-flex justify-content-between align-items-center'>
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