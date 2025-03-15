import axios from 'axios';
import { useEffect,useState } from 'react';
import '../assets/all.scss';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function ProductPage(){
    const [products,setProducts]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [search,setSearch]=useState('');
    async function getProducts(){
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/products`)
            console.log(res.data.products);
            setProducts(res.data.products);
            setLoading(false);
        }
        catch(err){
            console.log('出錯囉');
        }
    }
    useEffect(function(){
        getProducts();
    },[])
    
    function searchProduct(){
        console.log(search);
    }

    return (<><h1>產品列表</h1><div  className='d-flex justify-content-center'><input type='text' placeholder='搜尋' onChange={function(e){setSearch(e.target.value)}}></input>
            <div className='d-flex align-items-center px-2'><button className='btn btn-sm btn-primary' onClick={searchProduct}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></div></div>
             {/* <div style={{display:'flex'}}> */}
             <div className="container">
             <div className='row row-cols-4'>
                {products.map(function(item){
                return <div className="col py-3" key={item.id}><div className='card'>
                        <img src={item.imageUrl} className="product-img" alt={item.title}></img>
                            <div className='card-body'>
                                <h5 className="card-title">{item.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                                <p className='card-text'>{item.description}</p>
                            </div>
                        </div></div>})}
             </div></div>
             {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
         </>)
}

export default ProductPage