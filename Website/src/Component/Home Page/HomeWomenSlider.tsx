import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomeWomenSlider() {
    const [imageIndex, setImageIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(4);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings: Settings = {
        infinite: true,
        lazyLoad: 'ondemand',
        speed: 1000,
        slidesToShow,
        centerMode: true,
        centerPadding: '10px',
        beforeChange: (current: number, next: number) => setImageIndex(next),
        autoplay: false,
        autoplaySpeed: 1000,
        dots: false
    };
  return (
      <>
          <div className='container'>
              <div className='row container  '>
                  <Slider {...settings}>
                      <div className="card border-0 p-3" >
                          <h5><span className="badge bg-dark mt-2 text-white bagdge">SALE</span></h5>
                          <img src="images/fromourblog1.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
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


                      <div className="card border-0  p-3">
                          <h5><span className="badge bg-dark mt-2 text-white bagdge">SALE</span></h5>
                          <img src="images/fromourblog2.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
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


                      <div className="card border-0  p-3">
                          <h5><span className="badge bg-dark text-white">SALE</span></h5>
                          <img src="images/fromourblog3.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
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


                      <div className="card border-0  p-3">
                          <h5><span className="badge bg-dark mt-2 text-white bagdge">SALE</span></h5>
                          <img src="images/fromourblog4.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
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


                      <div className="card border-0  p-3">
                          <h5><span className="badge bg-dark mt-2 text-white bagdge">SALE</span></h5>
                          <img src="images/fromourblog2.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
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

                      

                  </Slider>

                 
              </div>

          </div>


      </>
  )
}
