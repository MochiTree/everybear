import footerBear from './images/teddy_bear_PNG136.png';
import {useState } from 'react';

function ScrollTopBtn(){
    // const [isTop,setIsTop]=useState(true);


    function toTop(){
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
      }

    return (<><div>
    <button onClick={toTop} style={{position:'fixed',right:'45px',bottom:'0px',zIndex:99}} className="btn btn-info p-3 rounded-circle opacity-75">top</button>
    </div>
    
    <div className='container-fluid p-0 d-flex' style={{backgroundColor:'rgba(142,175,157,0.7)',height:'400px'}}>
      <img className='object-fit-cover' src={footerBear} style={{width:'100px',height:'100px',position:'fixed',right:'20px',bottom:'0px',zIndex:1}}></img>
    </div></>)
}

export default ScrollTopBtn