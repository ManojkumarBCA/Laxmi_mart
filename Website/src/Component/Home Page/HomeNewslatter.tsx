import React from 'react'

export default function HomeNewslatter() {

    return (
        <div className='container p-5'>
            <div className='container newslatter2ndtext mt-5 mb-5'>
                <div className='row'>
                    <div className='col-md-6 subscribeimage'>
                        <div className=' d-flex align-items-center justify-content-center h-100 text-center'>
                            <div className='row'>
                                <h6 className='mt-5 text-center text-white '>LIMITED TIME ONLY.</h6>
                                <h3 className='text-center text-white'>END OF SEASON<br></br>
                                    SAVE 50% OFF</h3>

                                <div className="  text-center mb-5">
                                    <button type="button" className="btn  border-0"><span className='newnewslatterbutton'>SHOP NOW</span></button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-6 newslatter2ndtext d-flex align-items-center justify-content-center'>
                        <div className='row g-3'>
                            <h6 className='mt-5 text-center '>SUBSCRIBE TO OUR NEWSLETTER</h6>
                            <p className='text-center textofnews'>Sign up now for <span className='newslattertextnew'>10% discount</span> on first order.<br></br>
                                Customise my news:</p>

                            <form className='d-flex justify-content-center'>
                                <input
                                    type="email"
                                    className="form-control text-center"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter your Email Address"
                                    style={{ width: "50%" }}
                                    required
                                />

                            </form>
                            <div className="  text-center mb-5">
                                <button type="submit" className="btn  border-0"><span className='showmorebutton'>SUBSCRIBE</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
