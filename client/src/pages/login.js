import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData)); // ✅ only user login
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} className="inner-shadow">
        <h3 className="text-uppercase text-center mb-4 auth-heading ">
          Socialix
        </h3>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <div className="outer-shadow hover-in-shadow form-input-wrap">
            <input
              type="email"
              className="form-control"
              onChange={handleChangeInput}
              value={email}
              name="email"
            />
          </div>
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="pass">
            <div className="outer-shadow hover-in-shadow form-input-wrap">
              <input
                type={typePass ? "text" : "password"}
                className="form-control"
                onChange={handleChangeInput}
                value={password}
                name="password"
              />
              <small onClick={() => setTypePass(!typePass)}>
                {typePass ? "Hide" : "Show"}
              </small>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn-1 w-100 d-flex outer-shadow hover-in-shadow justify-content-center"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        {/* Register */}
        <p className="my-2">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;