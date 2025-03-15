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
    const [search,setSearch]=useState('');//搜尋用
    const [searchRes,setSearchRes]=useState([]);//將搜尋結果放入searchRes陣列中
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
    
    //搜尋是從產品列表的title去搜尋,將搜尋結果放入新陣列(每次有搜尋就更新),來取代原先的產品列表顯示
    function searchProduct(){
        console.log(search);
        //外層再用map會產生重複結果(巢狀),故僅用fliter
        // const searchResult = products.map(function(item){
        //     return products.filter(function(item){ 
        //              if(item.title.match(search)!=null){//如果搜尋得到
        //                 console.log('yes');
        //                 return item
                       
        //              }else{
        //                 return {title:'無資料'}
        //              }
        //     })
        // })
            const searchResult = products.filter(function(item){
                if(item.title.match(search)!=null){//如果搜尋得到 就會丟進去searchResult陣列
                                    // console.log(item);
                                    return item
                                 }
            })
        // setSearchRes([...searchRes,searchResult]);//不需要push
        setSearchRes([searchResult]);
        // console.log("結果是",searchRes)console放這裡會有生命週期問題
    }
    useEffect(function(){
        console.log("目前結果是",searchRes)

    },[searchRes])


    return (<><h1>產品列表</h1><div  className='d-flex justify-content-center'><input type='text' placeholder='搜尋' onChange={function(e){setSearch(e.target.value)}}></input>
            <div className='d-flex align-items-center px-2'><button className='btn btn-sm btn-primary' onClick={searchProduct}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></div></div>
             {/* <div style={{display:'flex'}}> */}
             <div className="container">
             <div className='row row-cols-4'>
                {/* 當有搜尋結果資料時，顯示搜尋結果 */}
                {/* {searchRes ? searchRes.map} */}
                {products.map(function(item){
                return <div className="col py-3" key={item.id}><div className='card'>
                        <img src={item.imageUrl} className="product-img" alt={item.title}></img>
                            <div className='card-body'>
                                <h5 className="card-title">{item.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                                <p className='card-text'>{item.description}</p>
                            </div>
                        </div></div>})}
                 {/* {searchRes.map(function(item){
                    console.log(item)
                return <div className="col py-3" key={item.id}><div className='card'>
                        <img src={item.imageUrl} className="product-img" alt={item.title}></img>
                            <div className='card-body'>
                                <h5 className="card-title">{item.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                                <p className='card-text'>{item.description}</p>
                            </div>
                        </div></div>})}         */}
             </div></div>
             {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
         </>)
}

export default ProductPage