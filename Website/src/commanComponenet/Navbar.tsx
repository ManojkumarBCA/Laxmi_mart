import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        
        <>
            <nav className="navbar navbar-expand-lg bg-dark ">
                <div className="container ">
                   
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-white" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                <Link className="nav-link active text-white" aria-current="page" to="/">HOME</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link text-white" to="/Category">CATEGORY</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link text-white" to="/Product">PRODUCTS</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link active text-white" aria-current="page" to="/About">ABOUT US</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link active text-white" aria-current="page" to="/Contact us">CONTACT US</Link>
                            </li>
                        </ul>
                        
                    </div>
                    <span className="navbar-text text-white">
                        CLEARANCE UP TO 30% OFF
                    </span>
                </div>
            </nav>
            
        
        
        </>
    );
};

export default Navbar;