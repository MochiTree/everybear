import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';


function ProductDetail(){
    let params=useParams();//取得路由上的productId
    const [product,setProduct]=useState([]);
    async function getProductDetail(){
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/product/${params.productId}`)
            console.log(res.data.product)
            let result = res.data.product;
            result.imagesUrl.push(res.data.product.imageUrl);
            setProduct(result)
        }catch(err){
            console.log(err.message)
        }
        
    }
    useEffect(function(){
        getProductDetail();
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
            </>)

}

export default ProductDetail