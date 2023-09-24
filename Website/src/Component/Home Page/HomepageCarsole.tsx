import { useState } from "react";

export interface homeImages {
    id: string,
    imagePath: string,
    description: string,
    button:String,
}

export default function HomepageCarsole() {
    const [data, setData] = useState<homeImages[]>([
        {
            id: "1",
            imagePath: "https://placehold.co/1550x700",
            description: "Gallery",
            button:"Button",
        }
    ])
console.log(data)
    return (
        <>
            {/* Carsole */}

            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    {
                        data.map((el) => {
                            return (
                                <>
                                    <div className="carousel-item active">
                                        <img src={el.imagePath} className="d-block w-100" alt="..." />

                                        <div className="centered">
                                            {el.description}
                                            <div className="centeredbutton mt-3">
                                                <button type="button" className="btn btn-outline-light "><span className='p-5'>{el.button}</span></button>
                                            </div>


                                        </div>

                                    </div>
                                </>
                            )
                        })
                   }
                   
                   
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </>
    )
}
