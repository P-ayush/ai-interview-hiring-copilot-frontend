import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { login, signUp } from "../api/auth";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    try {
      if (isLogin) {
        response = await login({ email, password });
      } else {
        response = await signUp({ name, email, password });
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      if (response.user.role === "recruiter") {
        navigate("/recruiter/jobs");
      } else {
        navigate("/jobs");
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <br />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}

        <span
          onClick={() => {
            setIsLogin(!isLogin);

            setErrorMessage("");
          }}
          style={{
            color: "blue",

            cursor: "pointer",

            marginLeft: "5px",
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Login;
