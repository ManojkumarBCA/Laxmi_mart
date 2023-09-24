import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Fromourblog() {
    const [imageIndex, setImageIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
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
        autoplay: true,
        autoplaySpeed: 1000,
        dots:true
    };
  return (
    <div>
          <div>
              <b>
                  <h2 className='fromourblog'>FROM OUR BLOG</h2>
              </b>
          </div>
          <div className='container mt-5 ' >
              <div className='row container' style={{width:"100%"}}>
                  <Slider {...settings}>

                      <div className="card border-0 p-3" >
                          <img src="images/fromourblog1.jpg" className="card-img-top img-fluid" alt="..."  style={{width:"100%",height:"auto"}}/>
                          <div className="card-body">
                              <p className="card-text text-center text-muted">03rd Aug 2022 By Charis Jorden.</p>
                              <h6 className='text-center mt-3'>CRAS ORNARE TRISTIQUE ELIT</h6>
                              <p className='text-center mt-3 readmoreblog'> READ MORE</p>
                          </div>
                      </div>


                      <div className="card border-0  p-3">
                          <img src="images/fromourblog2.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
                          <div className="card-body">
                              <p className="card-text text-center text-muted">03rd Aug 2022 By Charis Jorden.</p>
                              <h6 className='text-center mt-3'>CRAS ORNARE TRISTIQUE ELIT</h6>
                              <p className='text-center mt-3  readmoreblog'> READ MORE</p>
                          </div>
                      </div>


                      <div className="card border-0  p-3">
                          <img src="images/fromourblog3.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
                          <div className="card-body">
                              <p className="card-text text-center text-muted">03rd Aug 2022 By Charis Jorden.</p>
                              <h6 className='text-center mt-3'>CRAS ORNARE TRISTIQUE ELIT</h6>
                              <p className='text-center mt-3  readmoreblog'> READ MORE</p>
                          </div>
                      </div>


                      <div className="card border-0  p-3">
                          <img src="images/fromourblog4.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
                          <div className="card-body">
                              <p className="card-text text-center text-muted">03rd Aug 2022 By Charis Jorden.</p>
                              <h6 className='text-center mt-3'>CRAS ORNARE TRISTIQUE ELIT</h6>
                              <p className='text-center mt-3  readmoreblog'> READ MORE</p>
                          </div>
                      </div>


                      <div className="card border-0  p-3">
                          <img src="images/fromourblog2.jpg" className="card-img-top img-fluid" alt="..." style={{ width: "100%", height: "auto" }} />
                          <div className="card-body">
                              <p className="card-text text-center text-muted">03rd Aug 2022 By Charis Jorden.</p>
                              <h6 className='text-center mt-3'>CRAS ORNARE TRISTIQUE ELIT</h6>
                              <p className='text-center mt-3  readmoreblog'> READ MORE</p>
                          </div>
                      </div>

                  </Slider>
              </div>
              
              
                  
                  
              
              
        </div>
    </div>
  )
}
