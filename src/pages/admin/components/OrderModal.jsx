import {useEffect,useRef } from 'react';
import axios from 'axios';
import {Modal} from 'bootstrap';

function OrderModal(props) {
      const modalRef =useRef(null);
        console.log(123,props.orderContent)
        useEffect(()=>{
            new Modal(modalRef.current);
           //從cookie抓出token，讓每次使用axios的時候把token放入header傳送
          const takeToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
          );
          axios.defaults.headers.common['Authorization'] = takeToken;
        },[])

        useEffect(()=>{
            if(props.isOpen){
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.show();}
        },[props.isOpen])

            function handleCloseOrderModal() {
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.hide();
            props.setIsOpen(false);
            }

            function modalInputChange(e) {
                const {name,value,type,checked} = e.target
                props.setContent({
                  ...props.orderContent,
                  [name]: type==='checkbox' ? checked : value,
                })
              }
            
              async function updateOrder(){
                try {
                  await axios.put(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/order/${props.orderContent.id}`,
                    {
                      data:{
                        ...props.orderContent,
                        is_paid:props.orderContent.is_paid ? 1 : 0,
                        user:{
                            name:props.orderContent.user.name
                        }
                    }
                })
                props.getOrders();
                handleCloseOrderModal();
            }
                    catch(err){ alert('更新失敗',err.message)
                        props.getOrders();
                        handleCloseOrderModal();
                     }
              }

    return(<div id="OrderModal" ref={modalRef} className="modal fade" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">編輯訂單</h5>
              <button type="button" className="btn-close" onClick={handleCloseOrderModal} aria-label="Close"></button>
            </div>

            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="mb-4">
                    {/* <label htmlFor="primary-image" className="form-label">
                      主圖
                    </label> */}
                    <div className="input-group">
                      {/* <input
                        name="imageUrl"
                        type="text"
                        id="primary-image"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                        onChange={modalInputChange}
                        value={props.orderContent.imageUrl}
                      /> */}
                    </div>
                    {/* <img
                      src={props.orderContent.imageUrl}
                      alt=""
                      className="img-fluid"
                    /> */}
                  </div>

                  {/* 副圖 */}
                  {/* <div className="border border-2 border-dashed rounded-3 p-3">
                    {props.orderContent.imagesUrl?.map((image, index) => (
                      <div key={index} className="mb-2">
                        <label
                          htmlFor={`imagesUrl-${index + 1}`}
                          className="form-label"
                        >
                          副圖 {index + 1}
                        </label>
                        <input
                          id={`imagesUrl-${index + 1}`}
                          type="text"
                          placeholder={`圖片網址 ${index + 1}`}
                          className="form-control mb-2"
                          value={image}
                          onChange={function (e){
                            // changeSubImages(e,index)
                          }}
                        />
                        {image && (
                          <img
                            src={image}
                            alt={`副圖 ${index + 1}`}
                            className="img-fluid mb-2"
                          />
                        )}
                      </div>
                    ))} */}
                      {/* <div className="btn-group w-100">
                        {props.orderContent.imagesUrl.length <5 && props.orderContent.imagesUrl[(props.orderContent.imagesUrl.length)-1] !=='' && <button className="btn btn-outline-primary btn-sm w-100" onClick={addImages}>新增圖片</button>}

                        {props.orderContent.imagesUrl.length >1 && <button className="btn btn-outline-danger btn-sm w-100" onClick={removeImgaes}>取消圖片</button>}
                      </div> */}
                  {/* </div> */}
                </div>

                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      訂購人
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                    //   value={props.orderContent.name}
                      value={props.orderContent?.user?.name}
                      onChange={modalInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tel" className="form-label">
                      連絡電話
                    </label>
                    <input
                      name="tel"
                      id="tel"
                      type="text"
                      className="form-control"
                      placeholder="請輸入分類"
                      onChange={modalInputChange}
                    //   value={props.orderContent.tel}
                      value={props.orderContent?.user?.tel}
                    />
                  </div>

                  <div className="form-check">
                    <input
                      name="is_paid"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                      onChange={modalInputChange}
                      checked={props.orderContent.is_paid}
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      是否付款
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button type="button" className="btn btn-secondary" onClick={handleCloseOrderModal}>
                取消
              </button>
              <button type="button" className="btn btn-primary" onClick={updateOrder}>
                確認
              </button>
            </div>
          </div>
        </div>
      </div>)
}

export default OrderModal