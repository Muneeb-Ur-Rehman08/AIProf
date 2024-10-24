"use client";

import { useState } from "react";
// import "../../../index.css"
import { setUser } from "../../../comon.lib";
import axios from "axios";

export function EnhancedLoginWithSignup({
  show,
  handleClose,
  setToken,
}: {
  show: boolean;
  handleClose: () => void;
  setToken: (token: any) => void;
}) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    fullName: "",
    signUpEmail: "",
    signUpPassword: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(values);

    e.preventDefault();
    // Add your login logic here
    if (values.email === "" || values.password === "") {
      setError("Please fill in all fields");
    } else {
      // Simulate a login process
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setUser({
            ...response?.data?.user,
            ...response?.data?.user?.session,
          });
          setToken({
            ...response?.data?.user,
            ...response?.data?.user?.session,
          });
          handleClose(); // Close the modal on successful login
        })
        .catch((error) => {
          setError("Invalid email or password");
        });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Sign up attempted with:",
      values.fullName,
      values.signUpEmail,
      values.signUpPassword
    );
    setIsDialogOpen(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signingoogle`,
        { withCredentials: true }
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Google Sign-In URL not found.");
      }
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      alert("An error occurred during Google Sign-In.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center position-absolute top-0 left-0 w-100 h-100 text-black bg-black bg-opacity-50">
      <div
        className="card w-100"
        style={{
          maxWidth: "350px",
          background: "linear-gradient(to right, #f8f9fa, #e9ecef, #f8f9fa)",
        }}
      >
        <div className="card-header">
          <h5 className="card-title">Welcome Back</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Please sign in to continue
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                defaultValue={values.email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                defaultValue={values.password}
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="btn btn-dark w-100"
              type="submit"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>
          <div className="mt-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setIsDialogOpen(true)}
            >
              Sign Up
            </button>
            {isDialogOpen && (
              <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Create an Account</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsDialogOpen(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSignUp}>
                        <div className="mb-3 d-flex align-items-center">
                          <label
                            htmlFor="fullName"
                            className="form-label text-nowrap me-2"
                            style={{ width: "100px" }}
                          >
                            Full Name
                          </label>
                          <input
                            id="fullName"
                            className="form-control"
                            style={{ flex: 1 }}
                            defaultValue={values.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            name="fullName"
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <label
                            htmlFor="signUpEmail"
                            className="form-label text-nowrap me-2"
                            style={{ width: "100px" }}
                          >
                            Email
                          </label>
                          <input
                            id="signUpEmail"
                            type="email"
                            className="form-control"
                            style={{ flex: 1 }}
                            defaultValue={values.signUpEmail}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            name="signUpEmail"
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                          <label
                            htmlFor="signUpPassword"
                            className="form-label text-nowrap me-2"
                            style={{ width: "100px" }}
                          >
                            Password
                          </label>
                          <input
                            id="signUpPassword"
                            type="password"
                            className="form-control"
                            style={{ flex: 1 }}
                            defaultValue={values.signUpPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            name="signUpPassword"
                            required
                          />
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="btn btn-primary" style={{ width: "150px" }}>
                            Create Account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr className="my-4" />
          <div className="d-flex flex-column">
            <button
              className="btn btn-outline-secondary w-100 mb-2"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="me-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                style={{ width: "1rem", height: "1rem" }}
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
            <button className="btn btn-link w-100">Forgot Password?</button>
          </div>
        </div>
        <button
          className="btn border-top w-100 card-footer"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
