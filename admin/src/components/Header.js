import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Header() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfoExpiry");
    const responsce = await axios.get("/api/user/me/logout", {
      withCredentials: true,
    });

    if (responsce.data.logout) {
      navigate("/admin/login");
    }
  };

  return (
    <>
      <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <div className="me-3">
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-bs-toggle="minimize"
            >
              <span className="icon-menu"></span>
            </button>
          </div>
          <div>
            <a className="navbar-brand brand-logo">
              <img src="./images/logo.svg" alt="logo" />
            </a>
          </div>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-top">
          <ul className="navbar-nav">
            <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
              <h1 className="welcome-text">
                <span className="text-black fw-bold">
                  {user && user.name && user.name ? user.name : ""}
                </span>{" "}
                {user && user.name && user.name.isAdmin === true
                  ? "(Admin)"
                  : ""}{" "}
              </h1>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown d-none d-lg-block">
              <p
                onClick={logout}
                style={{ backgroundColor: "#ccc", cursor: "pointer" }}
                className="dropdown-item"
              >
                <i className="dropdown-item-icon mdi mdi-power text-primary me-2"></i>
                Log out
              </p>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-bs-toggle="offcanvas"
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
