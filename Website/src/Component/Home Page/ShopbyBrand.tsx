import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ShopbyBrand() {
    const [imageIndex, setImageIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(5);
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
          <div>
              <b>
                  <h2 className='trandingHomepagetext'>SHOP BY BRANDS</h2>
              </b>
          </div>

          <div className='container mt-5'>
              <div className='row container mt-5   ' style={{ width: "100%" }}>
                  <Slider {...settings}>
                      <div className="card border-0 p-3" >
                          <img src="images/brand1.png" className="card-img-top img-fluid" alt="..." />

                      </div>
                      <div className="card border-0 p-3" >
                          <img src="images/brand2.jpg" className="card-img-top img-fluid" alt="..." />

                      </div>
                      <div className="card border-0 p-3" >
                          <img src="images/brand3.png" className="card-img-top img-fluid" alt="..." />

                      </div>
                      <div className="card border-0 p-3" >
                          <img src="images/brand4.png" className="card-img-top img-fluid" alt="..." />

                      </div>
                      <div className="card border-0 p-3" >
                          <img src="images/brand5.png" className="card-img-top img-fluid" alt="..." />

                      </div>

                  </Slider>
                  {/* <div className='col-md-2'>
                      <div className="card border-0" >
                          <img src="images/brand1.png" className="card-img-top img-fluid" alt="..."  />
                             
                      </div>
                  </div>
                  <div className='col-md-2'>
                      <div className="card border-0" >
                          <img src="images/brand2.jpg" className="card-img-top img-fluid" alt="..."  />
                          
                      </div>
                  </div>
                  <div className='col-md-2'>
                      <div className="card border-0" >
                          <img src="images/brand3.png" className="card-img-top img-fluid" alt="..."  />
                          
                      </div>
                  </div>
                  <div className='col-md-2'>
                      <div className="card border-0" >
                          <img src="images/brand4.png" className="card-img-top img-fluid" alt="..."  />
                          
                      </div>
                  </div>
                  <div className='col-md-2'>
                      <div className="card border-0" >
                          <img src="images/brand5.png" className="card-img-top img-fluid" alt="..."  />
                          
                      </div>
                  </div> */}
                  
                 </div>
              
          </div>
      
      </>
  )
}
