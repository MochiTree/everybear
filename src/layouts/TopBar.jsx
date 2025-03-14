import { NavLink, Outlet } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
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
    {
        path:'about',
        name:'關於熊滿屋'
    }
] 


 function TopBar(){
    // const href=['首頁','產品列表']
    
    return (<><nav className="navbar p-0">
        <ul className='navbar-nav flex-row justify-content-between' style={{backgroundColor:'rgb(155, 158, 190)', width:'100%',padding:'10px 0px'}}>
            <div style={{display:'flex'}}>{paths.map(function(item){
            return <><li key={item.path} className="nav-item" style={{padding:'10px'}}>
            <NavLink className="nav-link" aria-current="page" to={item.path}>{item.name}</NavLink>
            </li></>
            })}
      </div>
      <div><li style={{padding:'10px'}}><NavLink className="nav-link" aria-current="page" to='carts'><FontAwesomeIcon icon={faCartShopping} /></NavLink></li></div>
      </ul></nav>
     <Outlet></Outlet>
  </>)}
  //記得之後把a換成NavLink
  export default TopBar