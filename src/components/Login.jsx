import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import Pagetransition from "./pagetransition";
export default function Login() {
  const [check, setcheck] = useState(false);
  const [error, seterror] = useState(false);
  function changeCheck(e) {
    setcheck(e.target.checked);
  }
  function showError(e) {
    e.preventDefault();
    seterror(true);
  }
  return (
    <Pagetransition>
      <div className="login">
        <div className="col">
          <h1 className="title"> login Account</h1>
          <form className="information" onSubmit={showError}>
            <div className="name">
              <input type="name" placeholder="username" required />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
              </svg>
            </div>
            <div className="password">
              <input
                type={check ? "text" : "password"}
                placeholder="password"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
              </svg>
            </div>
            <div className="check">
              <input type="checkbox" checked={check} onChange={changeCheck} />
              <p>show password</p>
            </div>

            <input type="submit" value="Login" className="loginbtn" />
          </form>
          <div className={error ? "error-login" : "none"}>
            <p>Incorrect email or password</p>
          </div>
          <p className="quetion">
            d'ont have an account?
            <Link to={"/createaccount"}>
              <span>Create Account</span>
            </Link>
          </p>
        </div>
      </div>
    </Pagetransition>
  );
}
