import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

function CheckOut(){
    const [cart,setCart]=useState({});
    async function getCart(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`)
            setCart(res.data.data)
          
        }catch(err){
            console.log(err)
    }
}
    useEffect(function(){
        getCart();
    },[])

    
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    }=useForm()

    
    const onSubmit=handleSubmit((data)=>{
        const {message,...user} = data;
        const orderForm = {
            data:{
            user,
            message
            }
        }
        checkoutCart(orderForm)
    })

    async function checkoutCart(formData) {
        try{
            await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/order`,formData);
            alert('結帳成功');
            getCart();
            reset();
        }catch(err){
            console.log(err);
            alert('結帳失敗');
        }
    }

    return (<><h1>結帳頁面</h1>
     <div className='container'>
        {cart?.carts?.length>0 && <div>請確認購物車資料<Link to={'../carts'}>修改訂單</Link></div>}
        <ul>{cart.carts?.map(function(item){
                return <li key={item.id} className='d-flex align-items-center justify-content-between my-3 border'>
                    <img src={item.product.imageUrl} className='img-thumbnail object-fit-cover' style={{height:'100px',width:'100px'}}></img>
                        <div style={{width:'20%'}}>{item.product.title}</div>
                        <div style={{width:'20%'}}>{`單價:${item.product.price}`}</div>
                        <div style={{width:'20%'}}>{`數量:${item.qty}`}</div>
                        <div style={{width:'20%'}}>{`合計:${item.final_total}`}</div>
                </li>
        })}
                    {cart?.carts?.length>0  && <li className='float-end' style={{width:'20%'}}>總計:{cart.total}</li>}       
        </ul>

     <div className="my-5 row justify-content-center">
                    <form onSubmit={onSubmit} className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                        Email
                        </label>
                        <input
                        {...register('email',{
                            required:'Email 為必填欄位',
                            pattern:{
                                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message:'格式錯誤'
                            }
                        })}
                        id="email"
                        type="email"
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        placeholder="請輸入 Email"
                        />

                        {errors.email &&<p className="text-danger my-2">{errors.email.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                        收件人姓名
                        </label>
                        <input
                        {...register('name',{
                            required:'姓名 為必填欄位'
                        })}
                        id="name"
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        placeholder="請輸入姓名"
                        />

                        {errors.name &&<p className="text-danger my-2">{errors.name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">
                        收件人電話
                        </label>
                        <input
                        {...register('tel',{
                            required:'電話 為必填欄位',
                            pattern:{
                                value:/^(0[2-8]\d{7}|09\d{8})$/,
                                message:'電話格式錯誤 (家電/手機皆可)'
                            }
                        })}
                        id="tel"
                        type="text"
                        className={`form-control ${errors.tel && 'is-invalid'}`}
                        placeholder="請輸入電話"
                        />

                        {errors.tel &&<p className="text-danger my-2">{errors.tel.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                        收件人地址
                        </label>
                        <input
                        {...register('address',{
                            required:'地址 為必填欄位'
                        })}
                        id="address"
                        type="text"
                        className={`form-control ${errors.address && 'is-invalid'}`}
                        placeholder="請輸入地址"
                        />

                        {errors.name &&<p className="text-danger my-2">{errors.address.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                        留言
                        </label>
                        <textarea
                        {...register('message')}
                        id="message"
                        className="form-control"
                        cols="30"
                        rows="10"
                        ></textarea>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-danger" onSubmit={onSubmit}>
                        送出訂單
                        </button>
                    </div>
                    </form>
                </div></div>
                </>)

}

export default CheckOut