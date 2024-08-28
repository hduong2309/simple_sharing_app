import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Login({ setToken }) {
  const [isShowed, setIsShowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const goTo = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await axios.post(
        "http://localhost:8081/api/admin/login",
        {
          username,
          password,
        },
      );

      const token = res.data.token;
      localStorage.setItem("token", token);
      setLoading(false);
      alert("Login successfully!");
      goTo("/");
    } catch (e) {
      alert("Login failed! Please check your username or password");
      passwordRef.current.value = "";
      setLoading(false);
      console.error("Login Failed: ", e);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
        margin: "80px",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Login
      </Typography>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }}>User name:</Typography>
        <TextField
          type="text"
          placeholder="Enter user name"
          inputRef={userNameRef}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }}>Password:</Typography>
        <TextField
          type={isShowed ? "text" : "password"}
          placeholder="Password"
          inputRef={passwordRef}
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <FontAwesomeIcon
                icon={isShowed ? faEye : faEyeSlash}
                style={{ cursor: "pointer" }}
                onClick={() => setIsShowed(!isShowed)}
              />
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Login
      </Button>
      <Typography sx={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "blue", cursor: "pointer" }}
          onClick={() => goTo("/signup")}
        >
          Register
        </Typography>
      </Typography>
      {loading}
    </Box>
  );
}
