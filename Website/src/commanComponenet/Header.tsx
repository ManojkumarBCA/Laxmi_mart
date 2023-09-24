import { useNavigate } from "react-router-dom";
import "../Component/Home Page/CSS/Login.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-between text-dark px-2 container">
      <p className="Navtext">
        <i className="bi bi-telephone-fill"></i>
        Call us:{" "}
        <a href="tel:+919998198011" className="text-dark text-decoration-none">
          +91 99981 98011
        </a>
        ,{" "}
        <a href="tel:+917433955222" className=" text-dark text-decoration-none">
          +91 74339 55222
        </a>
      </p>

      <div className="flex-container ms-auto">
        <div>
          <i className="bi bi-facebook"></i>
        </div>
        <div>
          <i className="bi bi-twitter"></i>
        </div>
        <div>
          <i className="bi bi-instagram"></i>
        </div>
        <div>
          <i className="bi bi-pinterest"></i>
        </div>
        <div className="d-flex Login" onClick={handleLoginClick}>
          <i className="bi bi-person-circle"></i>
          <p>Login</p>
        </div>
      </div>
    </div>
  );
}
