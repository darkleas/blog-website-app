import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const [loginUsername, setloginUsername] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  const [registerUsername, setregisterUsername] = useState("");
  const [registerPassword, setregisterPassword] = useState("");
  const [registerConfirmPassword, setregisterConfirmPassword] = useState("");
  const history = useHistory();

  function loginbtn() {
    document.querySelector(".login-btn").style.backgroundColor = "white";
    document.querySelector(".register-btn").style.backgroundColor = "#f1f1f1";

    document.querySelector("#login").style.display = "block";
    document.querySelector("#register").style.display = "none";
    document.querySelector("#register").classList.remove("scaled");

    setTimeout(() => {
      document.querySelector("#login").classList.add("scaled");
    }, 50);
  }
  function signupbtn() {
    document.querySelector(".register-btn").style.backgroundColor = "white";
    document.querySelector(".login-btn").style.backgroundColor = "#f1f1f1";

    document.querySelector("#login").style.display = "none";
    document.querySelector("#register").style.display = "block";

    document.querySelector("#login").classList.remove("scaled");

    setTimeout(() => {
      document.querySelector("#register").classList.add("scaled");
    }, 50);
  }
  function login() {
    const loginregisterbg = document.querySelector(".login-registerbg");
    const login = document.querySelector(".login-register");
    const loginerror = document.querySelector(".login-error");
    const loginerrortext = document.querySelector(".login-error-text");
    const loginbtn = document.querySelector("#loginbtn");
    const loginusernameinput = document.querySelector(".login-username-input");
    const loginpasswordinput = document.querySelector(".login-password-input");
    const loginusernameerror = document.querySelector(".login-username-error");
    const loginpassworderror = document.querySelector(".login-password-error");

    if (loginUsername == "") {
      loginusernameinput.classList.add("error");
      loginusernameerror.classList.add("d-active");
    } else {
      loginusernameinput.classList.remove("error");
      loginusernameerror.classList.remove("d-active");
    }
    if (loginPassword == "") {
      loginpassworderror.classList.add("d-active");

      loginpasswordinput.classList.add("error");
    } else {
      loginpasswordinput.classList.remove("error");
      loginpassworderror.classList.remove("d-active");
    }
    if (loginUsername != "" && loginPassword != "") {
      const fetchData = async () => {
        loginbtn.innerHTML =
          "<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></button>";
        loginbtn.disabled = true;
        fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'X-CSRFToken': Cookies.get('csrftoken')

          },
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
        })
          .then(
            setTimeout(() => {
              loginbtn.innerHTML = "Login";
              loginbtn.disabled = false;
            }, 1000)
          )
          .then((i) => i.json())
          .then((data) =>
            data["detail"] || data["username"]
              ? data["detail"]
                ? setTimeout(() => {
                    loginerror.classList.remove("scaled");
                    loginerror.classList.add("d-active");
                    loginerrortext.innerHTML =
                      "Username or password is incorrect.";
                    setTimeout(() => {
                      loginerror.classList.add("scaled");
                    }, 50);
                  }, 1000)
                : ""
              : setTimeout(() => {
                  loginerror.classList.remove("d-active");
                  loginpasswordinput.value = "";
                  loginusernameinput.value = "";
                  setloginUsername("");
                  setloginPassword("");
                  localStorage.setItem("token", data["access"]);
                  loginregisterbg.classList.toggle("d-active");
                  login.classList.toggle("d-active");
                  setTimeout(() => {
                    document
                      .querySelector(".login-register-form")
                      .classList.toggle("scaled");
                  }, 10);
                  document
                    .querySelector(".bottom-alert")
                    .classList.toggle("open-bottom-alert");
                  document
                    .querySelector(".bottom-alert")
                    .classList.add("success");
                  document
                    .querySelector(".bottom-alert")
                    .classList.remove("warning");
                  document.querySelector("#bottom-alert-text").innerHTML =
                    "You have logged successfully";
                  setTimeout(() => {
                    document
                      .querySelector(".bottom-alert")
                      .classList.toggle("open-bottom-alert");
                  }, 2000);
                  history.push("/profile/ ");
                }, 1000)
          );
      };
      fetchData();
    }
  }

  function register() {
    const registererror = document.querySelector(".register-error");
    const registersuccess = document.querySelector(".register-success");
    const registerbtn = document.querySelector("#registerbtn");

    const registererrortext = document.querySelector(".register-error-text");
    const registersuccesstext = document.querySelector(
      ".register-success-text"
    );

    const registerusernameerror = document.querySelector(
      ".register-username-error"
    );
    const registerpassworderror = document.querySelector(
      ".register-password-error"
    );
    const registerconfirmpassworderror = document.querySelector(
      ".register-confirmpassword-error"
    );

    const usernameinput = document.querySelector("#username");
    const passwordinput = document.querySelector("#password");
    const confirmpasswordinput = document.querySelector("#confirmpassword");

    if (registerUsername == "") {
      usernameinput.classList.add("error");
      registerusernameerror.classList.add("d-active");
    } else {
      usernameinput.classList.remove("error");
      registerusernameerror.classList.remove("d-active");
    }
    if (registerPassword == "") {
      registerpassworderror.classList.add("d-active");

      passwordinput.classList.add("error");
    } else {
      passwordinput.classList.remove("error");
      registerpassworderror.classList.remove("d-active");
    }
    if (registerConfirmPassword == "") {
      registerconfirmpassworderror.classList.add("d-active");

      confirmpasswordinput.classList.add("error");
    } else {
      confirmpasswordinput.classList.remove("error");
      registerconfirmpassworderror.classList.remove("d-active");
    }

    if (registerUsername && registerUsername.length < 4) {
      registersuccess.classList.remove("d-active");
      registersuccess.classList.remove("scaled");
      registererror.classList.remove("d-active");
      registererror.classList.remove("scaled");
      registererror.classList.add("d-active");
      registererrortext.innerHTML = "Username length should be more than 4";
      setTimeout(() => {
        registererror.classList.add("scaled");
      }, 100);
    } else if (registerUsername && registerUsername.length > 24) {
      registersuccess.classList.remove("d-active");
      registersuccess.classList.remove("scaled");
      registererror.classList.remove("d-active");
      registererror.classList.remove("scaled");
      registererror.classList.add("d-active");
      registererrortext.innerHTML = "Username length should be less than 24";
      setTimeout(() => {
        registererror.classList.add("scaled");
      }, 100);
    } else if (registerPassword && registerPassword.length < 6) {
      registersuccess.classList.remove("d-active");
      registersuccess.classList.remove("scaled");
      registererror.classList.remove("d-active");
      registererror.classList.remove("scaled");

      registererror.classList.add("d-active");

      registererrortext.innerHTML = "Password length should be more than 6";
      setTimeout(() => {
        registererror.classList.add("scaled");
      }, 100);
    } else if (registerPassword && registerPassword.length > 32) {
      registersuccess.classList.remove("d-active");
      registersuccess.classList.remove("scaled");
      registererror.classList.remove("d-active");
      registererror.classList.remove("scaled");

      registererror.classList.add("d-active");

      registererrortext.innerHTML = "Password length should be less than 32";
      setTimeout(() => {
        registererror.classList.add("scaled");
      }, 100);
    }
    else if (registerPassword != registerConfirmPassword) {
      registersuccess.classList.remove("d-active");
      registersuccess.classList.remove("scaled");
      registererror.classList.remove("d-active");
      registererror.classList.remove("scaled");

      registererror.classList.add("d-active");

      registererrortext.innerHTML = "Passwords are not same";
      setTimeout(() => {
        registererror.classList.add("scaled");
      }, 100);
    } 
    if ( registerUsername != "" 
    && registerPassword != "" 
    && registerConfirmPassword != "" 
    && registerPassword == registerConfirmPassword
    && registerUsername.length > 4
    && registerPassword.length > 6
    && registerPassword.length < 32
    && registerUsername.length < 24
    )
    {
      registerbtn.innerHTML =
      "<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></button>";
      registerbtn.disabled = true;
      fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'X-CSRFToken': Cookies.get('csrftoken'),

          
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
          repassword: registerConfirmPassword,
        }),
      })
      .then(
        setTimeout(() => {
          registerbtn.innerHTML = "Register";
          registerbtn.disabled = false;
        }, 1000)
      )
        .then((i) => i.json())
        .then((data) =>
          data["username"] != registerUsername
            ? setTimeout(() => {
              registersuccess.classList.remove("d-active")
              registersuccess.classList.remove("scaled")
              registererror.classList.remove("d-active")
              registererror.classList.remove("scaled")
              registererror.classList.add("d-active")
              registererrortext.innerHTML = data["username"]
              setTimeout(() => {
                registererror.classList.add("scaled")
              }, 100)
            },1000)
            : setTimeout(() => {
              usernameinput.value = ""
              passwordinput.value = ""
              confirmpasswordinput.value = ""
              setregisterConfirmPassword("")
              setregisterPassword("")
              setregisterUsername("")
              registererror.classList.remove("d-active")
              registererror.classList.remove("scaled")
              registersuccess.classList.remove("d-active")
              registersuccess.classList.remove("scaled")
              registersuccess.classList.add("d-active")
              registersuccesstext.innerHTML = "You signed up successfully"
              setTimeout(() => {
                registersuccess.classList.remove("d-active");
              }, 5000)
              setTimeout(() => {
                registersuccess.classList.add("scaled");
              }, 100)
            },1000)
        );
    }
    
  }
  function registerDown(e) {
    if (e.key === 'Enter') {
      register()
    }
  }
  function loginDown(e) {
    if (e.key === 'Enter') {
      login()
    }
  }
  return (
    <div className="login-register">
      <div className="container">
        <div className="login-register-form">
          <div className="login-register-side">
            <div className="row">
              <div className="col-6">
                <button className="login-btn w-100" onClick={loginbtn}>
                  Sign In
                </button>
              </div>
              <div className="col-6">
                <button className="register-btn w-100" onClick={signupbtn}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <br />
          <div id="login" className="scaled">
            <div className="alertz danger login-error">
              <p className="login-error-text">hi</p>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="input login-username-input"
                onChange={(e) => setloginUsername(e.target.value)}
                type="text"
                placeholder="Username"
                onKeyDown={loginDown}

              />
              <div className="login-username-error">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <br />
            <div style={{ position: "relative" }}>
              <input
                onChange={(e) => setloginPassword(e.target.value)}
                className="input login-password-input input-password"
                type="password"
                placeholder="Password"
                onKeyDown={loginDown}

              />
              <div className="login-password-error">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <br />
            <button onClick={login} id="loginbtn" className="btn2 w-100 mb-2">
              Login
            </button>
          </div>
          <div id="register">
            <div className="alertz danger register-error">
              <p className="register-error-text">hi</p>
            </div>
            <div className="alertz success register-success">
              <p className="register-success-text">hi</p>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="username"
                onChange={(e) => setregisterUsername(e.target.value)}
                className="input"
                type="text"
                onKeyDown={registerDown}

                placeholder="Username"
              />
              <div className="register-username-error">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <br />
            <div style={{ position: "relative" }}>
              <input
                className="input input-password"
                type="password"
                placeholder="Password"
                id="password"
                onKeyDown={registerDown}

                onChange={(e) => setregisterPassword(e.target.value)}
              />
              <div className="register-password-error">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <br />
            <div style={{ position: "relative" }}>
              <input
                className="input input-password"
                type="password"
                placeholder="Confirm Password"
                id="confirmpassword"
                onKeyDown={registerDown}
                onChange={(e) => setregisterConfirmPassword(e.target.value)}
              />
              <div className="register-confirmpassword-error">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <br />
            <button onClick={register} id="registerbtn" className="btn2 w-100 mb-2">
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Login;
