import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import LoginRegister from "./LoginRegister";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  const [category, setCategory] = useState([]);
  const nav = document.querySelector(".nav-ul");
  const { pathname } = useLocation();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const hi2 = async () => {
      await fetch("http://localhost:8000/api/user/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((i) => i.json())
        .then(
          (x) => (
            setUser(x),
            fetch("http://localhost:8000/api/profile_list/")
              .then((res) => res.json())
              .then((data) =>
                setProfile(data.filter((i) => i.user === x["id"]))
              )
          )
        );
    };
    hi2();
  }, [pathname]);

  useEffect(() => {
    const hi = async () => {
      await fetch("http://localhost:8000/api/category_list/")
        .then((res2) => res2.json())
        .then((data2) => setCategory(data2));
    };

    hi();
  }, [setCategory]);

  function navclick() {
    nav.classList.remove("open");
    const menu = document.querySelector(".menu");
    menu.classList.remove("openmenu");
  }
  function openMenu() {
    nav.classList.toggle("open");
    const menu = document.querySelector(".menu");
    menu.classList.toggle("openmenu");
  }
  function signin() {
    const loginregisterbg = document.querySelector(".login-registerbg");
    loginregisterbg.classList.toggle("d-active");
    const login = document.querySelector(".login-register");
    login.classList.toggle("d-active");
    setTimeout(() => {
      document.querySelector(".login-register-form").classList.toggle("scaled");
    }, 10);
  }
  function categories() {
    const dropdownmobile = document.querySelector(".mobile-dropdown-category");
    const categorybg = document.querySelector(".categorybg");
    dropdownmobile.classList.toggle("mobile-dropdown-open");
    categorybg.classList.toggle("d-active");
  }
  function onclickcategories() {
    const dropdownmobile = document.querySelector(".mobile-dropdown-category");
    const categorybg = document.querySelector(".categorybg");
    dropdownmobile.classList.toggle("mobile-dropdown-open");
    categorybg.classList.toggle("d-active");
    navclick();
  }
  function Logout() {
    localStorage.removeItem("token");
    setUser("");
    document
      .querySelector(".bottom-alert")
      .classList.toggle("open-bottom-alert");
    document.querySelector(".bottom-alert").classList.remove("success");
    document.querySelector(".bottom-alert").classList.add("warning");

    document.querySelector("#bottom-alert-text").innerHTML =
      "You exit successfully";
    setTimeout(() => {
      document
        .querySelector(".bottom-alert")
        .classList.toggle("open-bottom-alert");
    }, 2000);
    history.push("/");
  }
  function accountdropdown() {
    const accountdropdownz = document.querySelector(".account-dropdown");
    accountdropdownz.classList.toggle("d-active");
    setTimeout(() => {
      accountdropdownz.classList.toggle("account-dropdown-animate");
    }, 20);
  }
  function accountdropdown2() {
    navclick();
    const accountdropdownz = document.querySelector(".account-dropdown");
    accountdropdownz.classList.toggle("d-active");
    setTimeout(() => {
      accountdropdownz.classList.toggle("account-dropdown-animate");
    }, 20);
  }
  return (
    <>
      <nav>
        <div className="container" style={{ position: "relative" }}>
          <div className="logo">
            <p>
              <span className="theme-color">BK</span>blog
            </p>
          </div>
          <ul className="nav-ul" style={{ marginLeft: "9rem" }}>
            <li className="nav-li">
              <NavLink exact to="/" onClick={navclick} activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink
                to="/articles/"
                onClick={navclick}
                activeClassName="active"
              >
                Articles
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink to="/about/" onClick={navclick} activeClassName="active">
                About
              </NavLink>
            </li>
            <li className="nav-li">
              <span onClick={categories} style={{ cursor: "pointer" }}>
                Categories <i className="fas fa-caret-down"></i>
              </span>
              <ul className="dropdown-ul">
                {category.map((i) => (
                  <li key={i.id}>
                    <Link to={`/category/${i.id}`} className="dropdown-linkz">
                      {i.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="row btnsrow" style={{ marginLeft: "6rem" }}>
              {user["username"] ? (
                <>
                  {profile.map((i) => (
                    <span key={i.id}>
                      <button
                        className="account-dropdown-btn"
                        onClick={accountdropdown}
                      >
                        <img
                          src={`${i.profile_pic}`}
                          className="account-dropdown-btn-img"
                          onError={() =>
                            (document.querySelector(
                              ".account-dropdown-btn-img"
                            ).src =
                              "https://i.ibb.co/J3cGYxy/default-user-image.png")
                          }
                        />
                        {user["username"]} <i className="fas fa-caret-down"></i>
                      </button>
                      <div className="account-dropdown">
                        <ul style={{ listStyle: "none" }}>
                          <li>
                            <Link onClick={accountdropdown2} to="/profile/">
                              <i
                                class="fas fa-user pr-2"
                                style={{
                                  marginRight: "0.5rem",
                                  color: "#adadad",
                                  fontSize: "18px",
                                }}
                              ></i>{" "}
                              Profile
                            </Link>
                          </li>
                          <li>
                            <button onClick={Logout} id="logout">
                              {" "}
                              <i
                                class="fas fa-sign-out-alt"
                                style={{
                                  marginRight: "0.5rem",
                                  color: "red",
                                  fontSize: "18px",
                                }}
                              ></i>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </span>
                  ))}
                </>
              ) : (
                <button
                  onClick={signin}
                  className="btn"
                  style={{ backgroundColor: "#e63e22", color: "white" }}
                >
                  Sign In
                </button>
              )}
            </li>
          </ul>

          <div className="w-100 bar" style={{ zIndex: 10 }}>
            <div className="menu" onClick={openMenu}>
              <div className="burger" id="burger1"></div>
              <div className="burger" id="burger2"></div>
              <div className="burger" id="burger3"></div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="mobile-dropdown-category">
          <ul>
            {category.length == 0 ? (
              <p style={{ color: "white" }}>There is no any Category</p>
            ) : (
              category.map((i) => (
                <li key={i.id}>
                  <Link onClick={onclickcategories} to={`/category/${i.id}`}>
                    {i.title}
                  </Link>
                  <hr style={{ backgroundColor: "rgb(66 66 66 / 12%)" }}></hr>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="categorybg" onClick={categories}></div>
        <div className="login-registerbg" onClick={signin}></div>
      </div>
      <LoginRegister />
      <div className="bottom-alert">
        <span id="bottom-alert-text"></span>
      </div>
    </>
  );
}
export default Navbar;
