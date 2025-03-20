import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';

function CheckOut(){
    const [cart,setCart]=useState({});
    const [isLoading,setLoading]=useState(true);
    async function getCart(){
        try{
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`)
            setCart(res.data.data)
            setLoading(false)
        }catch(err){
            console.log(err);
            setLoading(false);
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
        setLoading(true)
        try{
            await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/order`,formData);
            alert('結帳成功');
            getCart();
            reset();
            setLoading(false)
        }catch(err){
            setLoading(false)
            console.log(err);
            alert('結帳失敗');
        }
    }

    return (<><h1>結帳頁面</h1>
     <div className='container mt-5 pt-5 lxgw-wenkai-mono-tc-regular'>
        {cart?.carts?.length>0 && <div><p className='py-3 py'>請確認購物車資料</p><Link to={'../carts'} style={{color:'green'}}>修改訂單</Link></div>}
        <ul className='row  row-cols-1 row-cols-lg-2'>{cart.carts?.map(function(item){
                return <li key={item.id} className='col d-flex flex-column flex-sm-row align-items-center justify-content-between p-3 my-3 border'>
                    <img src={item.product.imageUrl} className='img-thumbnail object-fit-cover' style={{height:'100px',width:'100px'}}></img>
                        <div className='py-3 fw-bolder fs-4'>{item.product.title}</div>
                        <div className='py-3 fs-5'>{`單價:${item.product.price}`}</div>
                        <div className='py-3 fs-5'>{`數量:${item.qty}`}</div>
                        <div className='py-3 fw-bolder fs-5'>{`合計:${item.final_total}`}</div>
                </li>
        })}
                    {cart?.carts?.length>0  && <div className='d-flex justify-content-sm-end justify-content-center'><li style={{textAlign:'right'}} className='py-3 fw-bolder fs-5'>總計:{cart.total}</li></div>}       
        </ul>

     <div className="my-5 row justify-content-center">
                    <form onSubmit={onSubmit} className="col-md-6">
                    <div className="mb-3 fw-bolder fs-5">
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

                    <div className="mb-3 fw-bolder fs-5">
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

                    <div className="mb-3 fw-bolder fs-5">
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

                    <div className="mb-3 fw-bolder fs-5">
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

                    <div className="mb-3 fw-bolder fs-5">
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
                {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
                </>)

}

export default CheckOut