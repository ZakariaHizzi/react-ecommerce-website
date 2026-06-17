import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagetransition from "./pagetransition";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [check, setcheck] = useState(false);
  function changeCheck(e) {
    setcheck(e.target.checked);
  }
  function toHome(e) {
    navigate("/home");
    e.preventDefault();
  }
  return (
    <Pagetransition>
      <div className="create">
        <form className="col" onSubmit={toHome}>
          <h1 className="title">Create Account</h1>
          <div className="name">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="text" placeholder="Email" />
          <input
            type={check ? "text" : "password"}
            placeholder="password"
            required
          />
          <input
            type={check ? "text" : "password"}
            placeholder=" confirm password"
            required
          />
          <div className="check">
            <input type="checkbox" checked={check} onChange={changeCheck} />
            <p>show password</p>
          </div>

          <input type="submit" value="Login" className="loginbtn" />
        </form>
      </div>
    </Pagetransition>
  );
}
