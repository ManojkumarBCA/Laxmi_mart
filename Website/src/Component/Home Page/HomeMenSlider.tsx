import { Link } from "react-router-dom";


export default function HomeMenSlider() {
    

    return (
        <>
            <div className='container'>
            <div className='row newwrap'>

                <div className="card tradingcard" style={{ height: "auto", width: "18rem" }}>
                    <h5><span className="badge bg-dark mt-2 text-white bagdge">SALE</span></h5><span className='ms-auto whishlisicon'><i className="bi bi-heart-fill"></i></span>
                    <img src="images/newsshoes.jpg" className="card-img-top" alt="..." />
                    <Link to="" type="button" className="btn addtocartnewbutton"><span><i className="bi bi-cart-fill"></i></span> add to Cart</Link>
                    <div className="card-body">
                        <p className='text-muted text-center'>Casual shoes</p>
                        <p className='titleoftranding'><b>Roadster seasonal Sport Shoes</b></p>
                        <div className='trandingprice'>
                            <p className='text-danger'>910</p>
                            <del>1000</del>
                        </div>

                    </div>
                </div>
                <div className="card tradingcard" style={{ height: "30rem", width: "18rem" }}>
                    <h5><span className="badge bg-dark mt-2 text-white bagdge">SALE</span></h5><span className='ms-auto whishlisicon'><i className="bi bi-heart-fill"></i></span>
                    <img src="images/bag.jpg" className="card-img-top" alt="..." />
                    <Link to="" type="button" className="btn addtocartnewbutton"><span><i className="bi bi-cart-fill"></i></span> add to Cart</Link>
                    <div className="card-body">
                        <p className='text-muted text-center'>Casual shoes</p>
                        <p className='titleoftranding'><b>Roadster seasonal Sport Shoes</b></p>
                        <div className='trandingprice'>
                            <p className='text-danger'>910</p>
                            <del>1000</del>
                        </div>

                    </div>
                </div>
            </div>

        </div>


        </>

    );
}
