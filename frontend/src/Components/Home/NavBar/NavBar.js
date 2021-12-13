import React, { useContext } from "react";
import logo from "../../../assets/logos/logo.png";
import { Link } from "react-router-dom";
import { AdminContext, AdminContextTemp, UserContext } from "../../../App";
import "firebase/auth";
import { isLoggedIn } from "../../Login/loginManager";

const NavBar = () => {
  // Context from App.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isAdmin] = useContext(AdminContext);
  const [isAdminTemp] = useContext(AdminContextTemp);

  // is logged in
  const isLogged = isLoggedIn();

  // Handle sign out button
  const signOut = () => {
    setLoggedInUser({});
    sessionStorage.removeItem("token");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <Link to="/" className="navbar-brand" href="#">
          <img src={logo} style={{ height: "50px" }} alt="creative-agency" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav  justify-content-between nav-link ml-auto align-items-md-center">
            {/* Home Navigation Click redirect to home */}
            <li className="nav-item">
              <Link to="/home" className="nav-link  active mr-3">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link mr-3" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mr-3" href="#service">
                Service
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mr-3" href="#about">
                Concerns
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link mr-3" href="#about">
                Event
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link mr-3" href="#contact">
                Contact
              </a>
            </li>

            <li className="nav-item">
              {(loggedInUser.email || isLogged) && (
                <Link
                  to={
                    isAdminTemp || isAdmin ? "/admin-booking-lists" : "/my-rent"
                  }
                  className="nav-link"
                >
                  <button
                    type="button"
                    className={
                      isAdminTemp || isAdmin
                        ? "btn btn-dark w-100 px-4"
                        : "btn btn-info w-100 px-3"
                    }
                  >
                    {isAdminTemp || isAdmin ? "Admin" : "Dashboard"}
                  </button>
                </Link>
              )}
            </li>

            <li className="nav-item">
              {loggedInUser.email || isLogged ? (
                <Link to="/" className="nav-link">
                  <button
                    onClick={signOut}
                    type="button"
                    className="btn btn-danger w-100 px-3"
                  >
                    Sign Out
                  </button>
                </Link>
              ) : (
                <Link to="/login" className="nav-link">
                  <button type="button" className="btn btn-brand w-100 px-5">
                    Login
                  </button>
                </Link>
              )}
            </li>
            {/* If user is not logged in show Login else Sign out  */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
