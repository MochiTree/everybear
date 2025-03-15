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
        <button type="button" className="btn btn-outline-danger btn-sm">
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
                
            >
                +
            </button>
            </div>
            {/* <span className="input-group-text bg-transparent border-0">
            {item.product.unit}
            </span> */}
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
            <td colSpan="6"><button className='btn btn-danger'  disabled={cart.carts?.length==0}>清空購物車</button></td>
        </tr>
        </tfoot>
    </table></div></>)
}

export default CartPage