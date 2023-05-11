import {Link} from "react-router-dom";
import './style-head.css'
import logo from './../../img/sgspu.png'
import Buttons from "../buttons/Buttons";
import jwt_decode from 'jwt-decode';

const Header = () => {
  function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  return (
        <div className="header">
          <div className="container">
              <div className="row">
                  <div className="col-md-2 align-self-center">
                      <img src={logo} alt="logo" className="logoSGSPU"/>
                  </div>
                  <div className="col-md-6 align-self-center">
                      <nav className="menu">
                          <ul className="nav justify-content-end">
                            <li className="nav-item dropdown">
                              <Link to="/" className="nav-link one">О конкурсе</Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/nomination" className="nav-link">Номинации</Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/rules" className="nav-link">Правила</Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/archive" className="nav-link">Архив</Link>
                            </li>
                            {checkToken() && (
                              <li className="nav-item">
                                <Link to="/gallery" className="nav-link">Галерея</Link>
                              </li>
                            )}
                          </ul>
                        </nav>
                  </div>
                  <div className="col-md-4 align-self-center">
                      <Buttons/>
                  </div>
              </div>
          </div>
      </div>
);
}
 
export default Header;