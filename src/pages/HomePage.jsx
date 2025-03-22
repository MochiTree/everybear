import { Link } from "react-router-dom"

function HomePage(){
    return (<> 
    <div className="lxgw-wenkai-mono-tc-regular"><header>
    <img className='position-relative object-fit w-100 opacity-50'src='https://images.unsplash.com/photo-1594172104231-f5ba30c28366?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
    <div className='position-absolute top-50 start-50 translate-middle' style={{transform:'translateY(-100%)'}}>
        <h1 className='display-2'>熊滿屋</h1>
        <p className='fs-3'>與泰迪一同 紀錄生活故事</p>
    </div>
    </header>
    <div className="container">
    <div className="d-flex flex-column mt-5">
        <div className="fs-3 fw-bolder mb-3">什麼是泰迪熊？</div>
        <div className="row row-cols-lg-2 row-cols-1 border">
            <img className='col object-fit  opacity-75' src='https://images.unsplash.com/photo-1585224652632-5cfa1f38d184?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
            <p className='col lh-base p-3'>泰迪熊(Teddy Bear),一種非常受歡迎的毛絨玩具熊。名字源自美國第26任總統西奧多·羅斯福(Theodore Roosevelt),他曾經有一個事件，在一次狩獵中，他拒絕射殺一隻被捉住的黑熊，這個故事被報導後，引發了人們製作泰迪熊玩具的熱潮。<br></br><br></br>
            泰迪熊通常是由柔軟的布料和填充物製成，並且具有圓圓的耳朵、大大的眼睛和可愛的外觀。<br></br><br></br>
            泰迪熊通常代表著溫暖、舒適和關愛，許多人將它視為陪伴、慰藉和情感寄託的象徵。<br></br><br></br>泰迪熊的外觀和款式隨著時間發展也有很多不同的變化，從經典的棕色熊到各種顏色和尺寸的版本都有。無論是作為裝飾、收藏品，還是作為孩子的玩伴，泰迪熊在全球都有廣泛的影響力。
            </p>
        </div>
        <Link className="nav-link my-3" aria-current="page" to='/products'>
        <div className="fs-4 text-center">點我看更多<span className='seeMore'>→</span></div></Link>

    </div>

    <div className="d-flex flex-column mt-5">
        <div className="fs-3 fw-bolder mb-3 ">幫熊熊洗澡的三大方法</div>
        <div className="row row-cols-lg-3 row-cols-1 p-5">
           
           <div className='position-relative border rounded my-5 my-lg-0 p-5'>
            <h3 className='lh-base fs-4 fw-bolder pb-5 text-center'>手洗<br></br>（最安全的方法）</h3>
            <ul className='lh-base'>
                <li><h4 className='fw-bolder'>準備：</h4>溫水（約 30°C）並加入適量的中性洗滌劑（如嬰兒洗衣精）。</li><br></br>
                <li><h4 className='fw-bolder'>局部去漬：</h4>如果有明顯污漬，可用柔軟的刷子或牙刷輕輕刷洗髒污處。</li><br></br>
                <li><h4 className='fw-bolder'>浸泡清洗：</h4>將玩偶浸泡約 10-15 分鐘，然後輕輕揉洗，不要用力擰扭。</li><br></br>
                <li><h4 className='fw-bolder'>沖洗乾淨：</h4>用清水沖洗數次，確保完全去除洗劑。</li><br></br>
                <li><h4 className='fw-bolder'>擠水 & 風乾：</h4>用毛巾包裹後輕壓去水分，然後放置通風處晾乾，避免陽光直曬以防止褪色。</li>
            </ul>
            <div className='position-absolute rounded-circle p-4 top-0 start-0 translate-middle fs-2 fw-bolder'
            style={{backgroundColor:'rgb(97, 151, 121)'}}
            >手</div>
            </div>
            
            
           
            <div className='position-relative border rounded  p-5'>
            <h3 className='lh-base fs-4 fw-bolder pb-5 text-center'>洗衣機清洗<br></br>（適用於耐洗款玩偶）</h3>
            <ul className='lh-base'>
                <li><h4 className='fw-bolder'>裝入洗衣袋：</h4>將玩偶放入洗衣袋或枕頭套內，可避免過度摩擦。</li><br></br>
                <li><h4 className='fw-bolder'>使用溫和模式：</h4>選擇柔洗/輕柔模式，水溫 30°C 以下，並加入中性洗劑。</li><br></br>
                <li><h4 className='fw-bolder'>脫水處理：</h4>短時間低速脫水，不可長時間高速甩乾，以免變形。</li><br></br>
                <li><h4 className='fw-bolder'>自然晾乾：</h4>用毛巾吸乾多餘水分後，放在陰涼處風乾，避免陽光曝曬。</li>
            </ul>
            <div className='position-absolute rounded-circle p-4 top-0 start-0 translate-middle fs-2 fw-bolder'
            style={{backgroundColor:'rgb(97, 151, 121)'}}
            >機</div>
            </div>
           
            <div className='position-relative border rounded my-5 my-lg-0  p-5'>
            <h3 className='lh-base fs-4 fw-bolder pb-5 text-center'>乾洗<br></br>（特殊材質/不能碰水）</h3>
            <ul className='lh-base'>
                <li><h4 className='fw-bolder'>使用乾洗劑：</h4>可選擇專用玩偶乾洗劑或小蘇打粉（可吸附污垢和異味）。</li><br></br>
                <li><h4 className='fw-bolder'>均勻撒上：</h4>在玩偶表面撒上乾洗劑或小蘇打粉，靜置 30 分鐘。</li><br></br>
                <li><h4 className='fw-bolder'>輕輕拍打：</h4>用乾淨的毛巾或刷子輕輕拍打，帶走髒污與灰塵。</li><br></br>
                <li><h4 className='fw-bolder'>吸塵器清潔：</h4>使用吸塵器低速模式吸走殘留粉末，使玩偶恢復乾淨。
                </li>
            </ul>
            <div className='position-absolute rounded-circle p-4 top-0 start-0 translate-middle fs-2 fw-bolder'
            style={{backgroundColor:'rgb(97, 151, 121)'}}
            >乾</div>
            </div>
        </div>


    </div>
    </div></div></>)
}

export default HomePage