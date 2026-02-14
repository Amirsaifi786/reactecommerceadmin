import { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import API from "../services/axiosInstance";
function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="login-container" style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Login</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Login
                </button>
          

                <p>
                    New User? <Link to="/register">Register Here</Link>
                </p>

            </form>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
    },
    form: {
        width: "300px",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "black",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
};

export default Login;
