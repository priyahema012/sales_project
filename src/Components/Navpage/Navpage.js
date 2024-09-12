import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined, UnorderedListOutlined, ProductOutlined } from "@ant-design/icons";
import classes from "./Navpage.module.css"; 

const Navpage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.navpageContainer}>
      <nav className={`navbar navbar-expand-lg navbar-dark shadow-sm ${classes.navbar}`}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className={`navbar-nav ms-auto ${classes.navbarNav}`}>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${classes.navLink}`}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <UnorderedListOutlined />
                  User Management
                </a>
                <ul className={`dropdown-menu ${classes.dropdownMenu}`}>
                  <li>
                    <button
                      className={classes.port}
                      onClick={() => navigate("/admin")}
                    >
                      Admin
                    </button>
                  </li>
                  <li>
                    <button
                      className={classes.port}
                      onClick={() => navigate("/employee")}
                    >
                      Employee
                    </button>
                  </li>
                  <li>
                    <button
                      className={classes.port}
                      onClick={() => navigate("/dealer")}
                    >
                      Dealer
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className={`nav-link active ${classes.navLink}`} aria-current="page" href="#">
                  <ProductOutlined />
                  <button
                      className={classes.lead}
                      onClick={() => navigate("/lead")}
                  >
                    Leads
                  </button>
                </a>
              </li>
              <li className="nav-item">
                <button
                  className={classes.port}
                  onClick={() => {
                    localStorage.removeItem("userdata");
                    navigate("/login");
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`content ${classes.content}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Navpage;
