
export default function Homepagecards() {
    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className="col-md-6 ">
                    <div className="card  border-white text-center" >
                        <img src={"https://placehold.co/300x300"} className="card-img-top img-fluid" alt="..."  />
                        <div className="centeredcard">
                            WOMEN
                            <div className="centeredbuttonofcard mt-5">
                                <button type="button" className="btn btn-outline-light border-0"><span className='buttonetxt text-dark'>Shop Now</span></button>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="card  border-white text-center" >
                        <img src={"https://placehold.co/300x300"} className="card-img-top img-fluid" alt="..." />
                        <div className="centeredcard">
                            MEN
                            <div className="centeredbuttonofcard mt-5">
                                <button type="button" className="btn btn-outline-light border-0"><span className='buttonetxt text-dark'>Shop Now</span></button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
