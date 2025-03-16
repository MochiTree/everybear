import { NavLink, Outlet } from "react-router-dom"
// import '../assets/reset.css'
const paths=[
    {
        path:'products',
        name:'商品管理'
    },
    {
        path:'orders',
        name:'訂單管理'
    },
    {
        path:'logout',
        name:'登出'
    }
] 

 function AdminBar(){

    return (<><nav className="navbar p-0">
        <ul className='navbar-nav flex-row justify-content-between' style={{ width:'100%',padding:'10px 0px'}}>
            <div style={{display:'flex'}}>{paths.map(function(item){
            return <><li key={item.path} className="nav-item" style={{padding:'10px'}}>
            <NavLink className="nav-link" aria-current="page" to={item.path}>{item.name}</NavLink>
            </li></>
            })}
      </div>
      </ul></nav>
     <Outlet></Outlet>
  </>)}

  export default AdminBar