import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';

function ProductDetail(){
    let params=useParams();//取得路由上的productId
    const [product,setProduct]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [imgMulti,setMulti]=useState(true);

    async function getProductDetail(){
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/product/${params.productId}`)
            console.log(res.data.product)
            let result = res.data.product;
            if(result.imagesUrl[0].length!=''){
            result.imagesUrl.unshift(res.data.product.imageUrl);
            setMulti(true);
            }
            setProduct(result)
            setLoading(false);
        }catch(err){
            console.log(err.message);
            setLoading(false);
        }
        
    }
    useEffect(function(){
        getProductDetail();
        setLoading(true);
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
        setMulti(false);
    },[params])

    function changeImg(src){
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
    setProduct({...product,imageUrl:src})
    
    }

    async function addCart(item){
        setLoading(true);
        try{
            await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`,{
                data:{
                  product_id:item.id,
                  qty:Number(1),
                }
              });
              setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
      }

    return (<><div className='p-3 p-sm-5 rounded-2 ' style={{backgroundColor:'rgba(99, 145, 120,0.5)'}}><div className='d-flex'><h1 className='h1'>{product.title}</h1><span>{product.category}</span></div>
            <div className='row'>
            <div className='col-md-6 col-lg-7'>
                 <img src={product.imageUrl} className='productDetail-img'></img>
            </div>            
            <div className='col-md-6 col-lg-5'>
                <ul className='d-flex flex-column lh-lg fs-4'>
                    <li className='my-3'>{product.description}</li>
                    <p className='fw-bold'>商品規格：</p><li className='my-3'>{product.content}</li>
                    <p className='fw-bold'>原價：</p><li className='my-3'>{product.origin_price}</li>
                    <p className='fw-bold'>促銷：</p><li className='my-3'>{product.price}</li>
                    <li className='my-3'><button className="rounded-3 btn btn-success" onClick={()=>addCart(product)}>加入購物車</button></li>
                </ul>
            </div>
            </div></div>
            {imgMulti && <p className='h5 mt-5 pt-3 border-top'>其他圖片</p>}<div className='d-flex flex-wrap  border-bottom pb-5'>{product?.imagesUrl?.map(function(item){
                if(item!=''){
                        return <img src={item} className='img-thumbnail w-50 w-sm-25  small-img' onClick={function(){changeImg(item)}}></img>
                        }
            })}</div>
            {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
            </>)

}

export default ProductDetail