import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import api from "../api/axios";
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
 

const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // clear old error on new attempt

    try {
        const res = await api.post("/admin/login", {
            email,
            password,
        });

        if (res.data.success) {
            setIsLoggedIn(true);
            setShowLoginModal(false);
            navigate("/admin");
        }

    } catch (err) {
        setLoginError(err.response?.data?.message || "Invalid Credentials");
    }
};

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeMobileMenu();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">

          {/* Logo */}

          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <span className="logo-text">
              Rental <span>King</span>
            </span>
          </Link>

          {/* Mobile Button */}

          <button
            className={`mobile-menu-btn ${
              mobileMenuOpen ? "active" : ""
            }`}
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}

          <ul
            className={`nav-menu ${
              mobileMenuOpen ? "active" : ""
            }`}
          >
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/properties"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Properties
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/support-contact"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Support
              </Link>
            </li>

 <li className="nav-item">
              <Link
                to="/collaboration"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Collaboration 
              </Link>
            </li>
            

            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Right Buttons */}

          <div className="nav-actions">

            {!isLoggedIn ? (
             <button
  className="btn btn-primary nav-login-btn"
  onClick={() => {
    setShowLoginModal(true);
    setLoginError("");
  }}
>
  Admin Access
</button>
            ) : (
              <button
                className="btn btn-secondary nav-login-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* Login Modal */}

      {showLoginModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Admin Login</h2>

            <form onSubmit={handleLogin}>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="admin@rentalking.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
                {loginError && (
  <p className="login-error">{loginError}</p>
)}
              </div>

              <div className="modal-actions">

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    setShowLoginModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;