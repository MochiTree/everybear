import axios from 'axios';
import { useState,useEffect} from 'react';
import Pagination from '../../components/Pagination';
import ProductModal from '../admin/components/ProductModal';
import DelProductModal from '../admin/components/DelProductModal';
import Lottie from "lottie-react";
import teaBearLoading from '../../animations/tea-bear-loading.json';
import {useNavigate} from 'react-router-dom';

function AdminProductPage(){
      const [products, setProducts] = useState([]);
      const [modalMode, setModalMode]=useState(null);
      const [isOpen,setIsOpen]=useState(false);
      const [isDelOpen,setDelIsOpen]=useState(false);
      const [pageStatus, setPageStatus] = useState({});
      const [isLoading,setLoading]=useState(true);

          
    const navigate= useNavigate();

      //登入驗證 不成功就回到登入頁面
      async function checkAdmin() {
          try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/check`);
            getProducts();
          } catch (err) {
            navigate("/admin/login");
            setLoading(false);
            alert(err.response.data.message);
          }
        };

      const defaultModalState = {
        imageUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: 0,
        imagesUrl: [""]
      };
      const [productContent, setContent]=useState(defaultModalState);//後台頁面:編輯/新增用

      function handleOpenProductModal(mode,currentItem) {
        
        // 從不同按鈕開啟modal 使用編輯/新增
        setModalMode(mode);
        // (編輯mode下) 之前axios get的產品資料已經用跑map取得，可取得每個item的值來顯示，若是新增mode 則不顯示
        switch (mode){
        case 'edit':
            setContent(currentItem);
            break;
        case 'add':
            setContent(defaultModalState);
            break;
        default:
            break;
        }
    
        setIsOpen(true);
        }
        function handleOpenDelProductModal(item) {
            setContent(item)
            setDelIsOpen(true);
          }   

            async function getProducts(page=1) {
                try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products?page=${page}`);
                setProducts(res.data.products);
                setPageStatus(res.data.pagination);
                setLoading(false)
                } catch (err) {
                alert(err.message);
                navigate("/admin/login");
                }
            };

              //初始化時將資料傳入
                useEffect(()=>{
                    //取得目前的token
                    const token = document.cookie.replace(
                        /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
                        "$1"
                    );
                    axios.defaults.headers.common.Authorization = token;
                    checkAdmin();
                },[]);

            //預設瀏覽頁面為第一頁(page=1)
            function changePage(nowPage){
                setLoading(true)
                getProducts(nowPage);
            }



 
    return (<>
            <ProductModal modalMode={modalMode} productContent={productContent} isOpen={isOpen} setIsOpen={setIsOpen} setContent={setContent} getProducts={getProducts}></ProductModal>
            <DelProductModal getProducts={getProducts} productContent={productContent} isDelOpen={isDelOpen} setDelIsOpen={setDelIsOpen} setContent={setContent}></DelProductModal>
                <div className="container">
                <div className="row  lxgw-wenkai-mono-tc-regular">
                    <div className='col col'>
                    <div className='d-flex justify-content-between'>
                    <h1 className='fw-bold fs-3'>後台頁面</h1><button className='btn btn-primary' onClick={()=>{handleOpenProductModal('add')}}>加入新產品</button></div>
                <table className="table">
            <thead>
            <tr className='fs-4'>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
            <th scope="col">編輯/刪除</th>

            </tr>
            </thead>
            <tbody>
            {products.map(function(item){
            return(<tr key={item.id} className='fs-5'>
            <th scope="row">{item.title}</th>
            <td>{item.origin_price}</td>
            <td>{item.price}</td>
            <td>{item.is_enabled ? <span className='text-success'>已啟用</span>: <span>未啟用</span>}</td>
            <td><div className="btn-group">
            <button className='btn btn-primary btn-sm'onClick={function() {
                handleOpenProductModal('edit',item);
            }}>編輯</button><button className='btn btn-danger btn-sm' onClick={()=>handleOpenDelProductModal(item)}>刪除</button></div></td>
            </tr>)
            })}
            </tbody>
            </table>
            <Pagination pageStatus={pageStatus} changePage={changePage}></Pagination>
            </div>
      </div>
      </div>
      {isLoading && (<><div className='d-flex justify-content-center align-items-center'
            style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:3}}><Lottie animationData={teaBearLoading} loop={true} style={{width:'18%',height:'18%'}} /></div></>)}
      </>)
}

export default AdminProductPage;
