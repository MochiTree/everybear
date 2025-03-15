import axios from 'axios';
import { useEffect,useState } from 'react';
import '../assets/all.scss';
import Lottie from "lottie-react";
import teaBearLoading from '../animations/tea-bear-loading.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from "react-select";
import Pagination from '../components/Pagination';


function ProductPage(){
    const [products,setProducts]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [search,setSearch]=useState('');//搜尋用
    const [searchRes,setSearchRes]=useState([]);//將搜尋結果放入searchRes陣列中
    const [unSearch,setUnSearch]=useState(false);
    const [options,setOptions]=useState([{value:'all',label:'全部'}]);//取得產品資料後，產生分類選項用
    const [selectRes,setSelectRes]=useState([]);//將分類結果放入selectRes陣列
    const [pageStatus, setPageStatus] = useState({});//分頁設定
    async function getProducts(page=1){
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}`);
            console.log(res.data.products);
            setProducts(res.data.products);
            setPageStatus(res.data.pagination);
            setLoading(false);
            
        }
        catch(err){
            console.log('出錯囉');
        }
    }
    useEffect(function(){
        getProducts();
    },[])

     //預設瀏覽頁面為第一頁(page=1)
    function changePage(nowPage){
        getProducts(nowPage);
    }
 

    useEffect(function(){//當產品列表更新時，分類也隨時更新
        products.map(function(item){
            setOptions(options=>[...options,{value:item.category,label:item.category}]);
        })
    },[products])
    
    //搜尋是從產品列表的title去搜尋,將搜尋結果放入新陣列(每次有搜尋就更新),來取代原先的產品列表顯示
    function searchProduct(){
        // console.log(search);
        setSelectRes([]);//將分類還原為全部(all)

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
                if(item.title.match(search.trim())!=null){//如果搜尋得到 就會丟進去searchResult陣列(trim為刪除空格用，避免不必要的搜尋錯誤)
                                    // console.log(item);
                                    setUnSearch(false);
                                    return item
                                 }
            })
        // setSearchRes([...searchRes,searchResult]);//不需要push
        setSearchRes(searchResult);
        if(searchResult.length===0){//如果搜尋不到 額外顯示搜尋錯誤提示
            setUnSearch(true);
        }
        // console.log(unSearch);
        // console.log("結果是",searchRes)console放這裡會有生命週期問題
    }
    // useEffect(function(){
    //     console.log(searchRes);
    // },[searchRes])


    function selectProduct(opt){
        let selectResult;
        document.getElementById('searchBar').value='';//81~83 分類時將搜尋內部文字(input)與useState清空
        setSearch('');
        setSearchRes([]);
        setUnSearch(false);

            if(opt.value==='all'){//如果選擇 全部(all) 就把類別篩選的陣列清空
                selectResult=[];
            }
            else {selectResult = products.filter(function(item){
                 if(item.category===opt.value){//如果篩選得到 就會丟進去selectResult陣列
                                return item
                             }
        })}
        setSelectRes(selectResult);
        // console.log(opt)
    }
    // useEffect(function(){
    //     console.log(selectRes);
    //     console.log('陣列長度',selectRes.length);
    // },[selectRes])
      

      
    return (<><h1>產品列表</h1><div  className='d-flex justify-content-center m-5'><input id='searchBar' type='text' placeholder='搜尋' onChange={function(e){setSearch(e.target.value)}}></input>
            <div className='d-flex align-items-center px-2'><button className='btn btn-sm btn-primary' onClick={searchProduct}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></div>
            <Select options={options} placeholder='透過類別搜尋' onChange={function(opt){selectProduct(opt)}}/></div>
             {/* <div style={{display:'flex'}}> */}
             <div className="container">
             {unSearch && <div className='d-flex justify-content-center py-3 mb-3 bg-success'>搜尋不到相關商品</div>}
             <div className='row row-cols-4'>
                {/* 當有搜尋/分類結果資料時，顯示搜尋/分類結果*/}
                {selectRes.length>0 ? (selectRes.map(function(selectItem){
                return <div className="col py-3" key={selectItem.id}><div className='card'>
                <img src={selectItem.imageUrl} className="product-img" alt={selectItem.title}></img>
                    <div className='card-body'>
                        <h5 className="card-title">{selectItem.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{selectItem.category}</h6>
                        <p className='card-text'>{selectItem.description}</p>
                    </div>
                </div></div>    
                }))
                :(searchRes.length>0 ? (searchRes.map(function(searchItem){
                return <div className="col py-3" key={searchItem.id}><div className='card'>
                        <img src={searchItem.imageUrl} className="product-img" alt={searchItem.title}></img>
                            <div className='card-body'>
                                <h5 className="card-title">{searchItem.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{searchItem.category}</h6>
                                <p className='card-text'>{searchItem.description}</p>
                            </div>
                        </div></div>}))
                        : (products.map(function(item){
                return <div className="col py-3" key={item.id}><div className='card'>
                        <img src={item.imageUrl} className="product-img" alt={item.title}></img>
                            <div className='card-body'>
                                <h5 className="card-title">{item.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                                <p className='card-text'>{item.description}</p>
                            </div>
                        </div></div>}))) }


             </div>
             <Pagination pageStatus={pageStatus} changePage={changePage}></Pagination>
             </div>
             {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
         </>)
}

export default ProductPage