import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function SignUp() {
  const [isShowed, setIsShowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const goTo = useNavigate();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameref = useRef(null);
  const occupationRef = useRef(null);
  const discriptionRef = useRef(null);
  const locationRef = useRef(null);

  const handleRegister = async () => {
    setLoading(true);
    if (
      !userNameRef.current.value ||
      !passwordRef.current.value ||
      !firstNameRef.current.value ||
      !lastNameref.current.value
    ) {
      alert("Please fill in all input boxs!");
      return;
    }
    const body = {
      user_name: userNameRef.current.value,
      password: passwordRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameref.current.value,
      occupation: occupationRef.current.value,
      location: locationRef.current.value,
      description: discriptionRef.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8081/api/admin/register",
        body,
      );
      setLoading(false);
      alert("Account created successfully!");
      goTo("/login");
    } catch (e) {
      setLoading(false);
      alert(e.response.data.message);
      console.error("Failed to create account!", e);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
        margin: "0px 30px 30px 30px",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Create new user
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
        <Typography sx={{ fontWeight: "bold" }}>First Name:</Typography>
        <TextField
          type="text"
          placeholder="Enter first name"
          inputRef={firstNameRef}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }}>Last Name:</Typography>
        <TextField
          type="text"
          placeholder="Enter last name"
          inputRef={lastNameref}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }}>Occupation:</Typography>
        <TextField
          type="text"
          placeholder="Enter occupation"
          inputRef={occupationRef}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }}>Location:</Typography>
        <TextField
          type="text"
          placeholder="Enter location"
          inputRef={locationRef}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }}>Description:</Typography>
        <TextField
          multiline
          rows={4}
          placeholder="Enter description"
          inputRef={discriptionRef}
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
        onClick={handleRegister}
        fullWidth
      >
        Register
      </Button>
      <Typography sx={{ marginTop: "20px" }}>
        Have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "blue", cursor: "pointer" }}
          onClick={() => goTo("/login")}
        >
          Log in
        </Typography>
      </Typography>
      {loading}
    </Box>
  );
}
