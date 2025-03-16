import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';

function ProductDetail(){
    let params=useParams();//取得路由上的productId
    const [product,setProduct]=useState([]);
    const [isLoading,setLoading]=useState(true);

    async function getProductDetail(){
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/product/${params.productId}`)
            console.log(res.data.product)
            let result = res.data.product;
            result.imagesUrl.push(res.data.product.imageUrl);
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
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    },[params])

    function changeImg(src){

    setProduct({...product,imageUrl:src})
    
    }
    return (<><h1 className='h1'>{product.title}</h1>
            <img src={product.imageUrl} className='productDetail-img'></img>
            其他圖片<div className='d-flex flex-wrap'>{product?.imagesUrl?.map(function(item){
                if(item!=''){
                        return <img src={item} className='img-thumbnail w-25 small-img' onClick={function(){changeImg(item)}}></img>
                        }
            })}</div>
            {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
            </>)

}

export default ProductDetail