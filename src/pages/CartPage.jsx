import axios from 'axios';
import { useEffect,useState } from 'react';

function CartPage(){
    const [cart,setCart]=useState({});
    async function getCart(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`)
            setCart(res.data.data)
            console.log(res.data.data)
        }catch(err){
            console.log(err)
    }
}
    useEffect(function(){
        getCart();
    },[])

    //更新購物車
    async function updateCart(item,qty){
        if(qty>0){
        try{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`,{
                data:{
                    product_id:item.product_id,
                    qty:Number(qty)
                }
            });
            getCart();
        }catch(err){
            alert(err);
        }}else{
        alert('數量不得小於1');}
    }

    //刪除購物車
    async function deleteSingleItem(item){
        try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`);
            getCart();
        }catch(err){
            alert(err);
        }
    }

    //刪除購物車(所有)
    async function deleteAllCart(){
        try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/carts`);
            getCart();
        }catch(err){
            alert(err);
        }
    }
    
        return (<><div className='container py-5'><table className="table align-middle text-center table-primary table-striped">
        <thead className='text-center'>
        <tr>
            <th className='bg-success'></th>
            <th className='bg-success'>圖片</th>
            <th className='bg-success'>品名</th>
            <th className='bg-success'>數量</th>
            <th className="bg-success">單價</th>
        </tr>
        </thead>

        <tbody>
            {cart.carts?.map(function(item){
                return (           
        <tr key={item.id}>
        <td>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>deleteSingleItem(item)}>
            x
        </button>
        </td>
        <td><img src={item.product.imageUrl} className='img-thumbnail small-img' style={{width:'300px'}}></img></td>
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
            <td colSpan="6"><button className='btn btn-danger' onClick={deleteAllCart} disabled={cart.carts?.length==0}>清空購物車</button></td>
        </tr>
        </tfoot>
    </table></div></>)
}

export default CartPage