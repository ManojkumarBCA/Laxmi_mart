
export default function Header2() {
    return (

        <div className="d-flex justify-content-between  text-dark px-2 container">

            <img src="images/logo_with_name.png" alt='logo' className='img-fluid logoImg' />

            <div className="flex-container">
                <div>
                    <i className="bi bi-heart-fill"></i>
                    <span>My Wishlist</span>

                </div>
                <div>
                    <i className="bi bi-cart-fill"></i>

                </div>


            </div>

        </div>
    )
}
