import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem(
                "token",
                response.data.token
            );
            navigate("/jobs");
        } catch (error) {
              setErrorMessage(
        error.response.data.message
    );
       
        }
    };

    return (

        <div>

            <h1>Login</h1>
            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <br />
                <br />
    {
            errorMessage && (
              <p>
               {errorMessage}
              </p>
              )
}
                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;