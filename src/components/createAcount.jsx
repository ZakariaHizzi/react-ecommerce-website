import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../context/authcontext";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Pagetransition from "./pagetransition";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { signup } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setSuccessMsg("");
    setLoading(true);
    const result = await signup(formData.email, formData.password, {
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    setLoading(false);
    if (result.success) {
      navigate("/");
    } else if (result.needsEmailConfirmation) {
      setSuccessMsg(result.error);
    } else {
      setError(result.error);
    }
  }
  return (
    <Pagetransition>
      <div className="auth-page">
        {successMsg ? (
          <div className="auth-card">
            <div className="auth-header">
              <h1 className="auth-title">Check Your Email</h1>
              <p className="auth-subtitle">We sent you a confirmation link</p>
            </div>
            <div className="auth-success">
              <p>{successMsg}</p>
            </div>
            <p className="auth-footer-text">
              Already confirmed?
              <Link to="/login">
                <span>Sign in</span>
              </Link>
            </p>
          </div>
        ) : (
          <div className="auth-card">
            <div className="auth-header">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join us and start shopping</p>
            </div>

            {error && (
              <div className="auth-error">
                <p>{error}</p>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-row">
                <div className="auth-input-group">
                  <div className="auth-input-icon">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <div className="auth-input-icon">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="auth-input-group">
                <div className="auth-input-icon">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-options">
                <label className="auth-checkbox">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span>Show password</span>
                </label>
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="auth-footer-text">
              Already have an account?
              <Link to="/login">
                <span>Sign in</span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </Pagetransition>
  );
}
