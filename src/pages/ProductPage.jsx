import axios from 'axios';
import { useEffect,useState } from 'react';
import '../assets/all.scss'



function ProductPage(){
    const [products,setProducts]=useState([]);

    async function getProducts(){
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/products`)
            console.log(res.data.products);
            setProducts(res.data.products);
        }
        catch(err){
            console.log('出錯囉');
        }
    }
    useEffect(function(){
        getProducts();
    },[])

    return (<><h1>產品列表</h1>
             {/* <div style={{display:'flex'}}> */}
             <div className="container">
             <div className='row row-cols-4'>
                {products.map(function(item){
                return <div class="col py-3"><div className='card'  key={item.id}>
                        <img src={item.imageUrl} className="product-img" alt={item.title}></img>
                            <div className='card-body'>
                                <h5 className="card-title">{item.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                                <p className='card-text'>{item.description}</p>
                            </div>
                        </div></div>})}
             </div></div>         
         </>)
}

export default ProductPage