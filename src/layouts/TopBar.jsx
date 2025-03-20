import { NavLink, Outlet, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Navbear from './images/teddy_bear_PNG58.png';
import '../assets/reset.css'
const paths=[
    {
        path:'/',
        name:'首頁'
    },
    {
        path:'products',
        name:'產品列表'
    },
    // {
    //     path:'about',
    //     name:'關於熊滿屋'
    // }
] 


 function TopBar(){
    // const href=['首頁','產品列表']
    
    return (<><div style={{position:'fixed',top:0,left:0,right:0,zIndex:99,backgroundColor:'rgba(142,175,157,0.7)'}}><nav className="navbar p-0 lxgw-wenkai-mono-tc-regular">
        <ul className='navbar-nav flex-row justify-content-between' style={{width:'100%',padding:'10px 0px 0px 0px'}}>
       
            
        <Link className="nav-link" aria-current="page" to='/'>
        <div className='h2 d-flex align-items-center'>
        <div className='d-flex justify-content-end w-25'>
            <img src={Navbear}  className='object-fit-cover w-50 w-sm-25'></img>
        </div>
        <h1>熊滿屋</h1>
        </div>
        </Link>


        <div className='d-flex justify-content-evenly align-items-center'>
 

            <div className='d-none d-md-flex'>{paths.map(function(item){
            return <><li key={item.path} className="nav-item" style={{padding:'10px'}}>
            <NavLink className="nav-link fs-5" aria-current="page" to={item.path}>{item.name}</NavLink>
            </li></>
            })}
      </div>
      <div><li style={{padding:'10px'}}><NavLink className="nav-link" aria-current="page" to='carts'><FontAwesomeIcon icon={faCartShopping} /></NavLink></li></div>
      <div className="d-md-none">
        <div className="collapse" id="navbarToggleExternalContent">
            <div className="p-2 pt-0 d-block" style={{backgroundColor:'rgba(142, 175, 157, 0.94)'}}>
            <div className=''>{paths.map(function(item){
                        return <><li key={item.path} className="nav-item" style={{padding:'10px'}}>
                        <NavLink className="nav-link" aria-current="page" to={item.path}>{item.name}</NavLink>
                        </li></>
                        })}
                </div>
            </div>
            </div>

            <nav className="navbar">
            <div className="">

                <span className="navbar-toggler-icon">
                    <div className="p-3"  data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"></div>
                </span>
                
            </div>
            </nav></div>
      
      </div>
      </ul></nav></div>
     <Outlet></Outlet>
  </>)}
  //記得之後把a換成NavLink
  export default TopBar