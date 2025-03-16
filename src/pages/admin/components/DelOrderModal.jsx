import {useEffect,useRef } from 'react';
import axios from 'axios';
import {Modal} from 'bootstrap';

function DelOrderModal(props) {
    const delModalRef=useRef(null);
    useEffect(()=>{
        new Modal(delModalRef.current);
              //從cookie抓出token，讓每次使用axios的時候把token放入header傳送
              const takeToken = document.cookie.replace(
                /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
                "$1",
              );
              axios.defaults.headers.common['Authorization'] = takeToken;
      },[])
      useEffect(()=>{
        if(props.isDelOpen){
        const modalInstance = Modal.getInstance(delModalRef.current);
        modalInstance.show();}
    },[props.isDelOpen])
    
  function handleCloseDelOrderModal() {
    const modalInstance = Modal.getInstance(delModalRef.current);
    modalInstance.hide();
    props.setDelIsOpen(false);
  }
  async function deleteOrder(){
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/order/${props.orderContent.id}`)
    }catch(err){ alert('刪除失敗',err.message) }
  }

  async function handleDeleteOrder(){
    try {
      await deleteOrder();
      props.getOrders();
      handleCloseDelOrderModal();
    }catch(err){alert('發生錯誤',err.message)}
  }
    return (
                <div
                className="modal fade"
                ref={delModalRef}
                id="delOrderModal"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">刪除產品</h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleCloseDelOrderModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      你是否要刪除 
                      <span className="text-danger fw-bold">{props.orderContent?.user?.name}</span>的訂單
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseDelOrderModal}
                      >
                        取消
                      </button>
                      <button type="button" className="btn btn-danger" onClick={handleDeleteOrder}>
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default DelOrderModal