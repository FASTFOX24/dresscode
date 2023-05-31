import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import ErrorIcon from "@mui/icons-material/Error";
import { GoogleIcon } from "../../shared/icon";
const textFieldStyle = {
  "& label.Mui-focused": {
    color: "#191919",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#191919",
    },
  },
};
const buttonStyle = {
  width: 500,
  height: 60,
  bgcolor: "#191919",
  color: "white",
  textTransform: "none",
  fontWeight: "bold",
  "&:hover": { bgcolor: "#ff5722", color: "black" },
};
const gridStyle = {
  height: "100%",
  width: "100%",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  mt: "80px",
  bgcolor: "white",
};
const Root = styled("div")(({ theme }) => ({
  margin: "30px 0",
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(),
  },
}));
const Auth = ({}) => {
  const [logInId, setLogInId] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const signIn = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, logInId, logInPassword)
      .then(navigate("/"))
      .catch(() => {
        if (!validator.isEmail(logInId)) {
          setError1("Enter a valid email.");
        } else {
          setError2("Invalid password. Try again or find Password.");
        }
        if (validator.isEmail(logInId)) {
          setError1("");
        }
      });
  };
  const onSubmit = (event) => {
    console.log(event.type, event.code);
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "id") {
      setLogInId(value);
    } else if (name === "password") {
      setLogInPassword(value);
    }
  };
  const popupGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((data) => {
      setDoc(doc(db, "User", data.user.uid), {});
    });
  };
  return (
    <Grid container sx={gridStyle}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          sx={{ fontSize: 30, fontWeight: "bold", textAlign: "center", mb: 10 }}
        >
          Login
        </Typography>
        <Button variant="text" sx={buttonStyle} onClick={popupGoogle}>
          <GoogleIcon />
          <Typography sx={{ fontSize: "14px", fontWeight: "bold", ml: "8px" }}>
            LogIn with Google
          </Typography>
        </Button>
        <Root>
          <Divider sx={{ fontSize: "16px" }}>or</Divider>
        </Root>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <form onSubmit={signIn}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 4,
                width: 500,
              }}
            >
              <TextField
                sx={textFieldStyle}
                label="E-mail"
                name="id"
                onChange={onChange}
              />
              {error1 !== "" ? (
                <Box sx={{ display: "flex", height: 0 }}>
                  <ErrorIcon
                    sx={{ color: "red", width: "17px", height: "17px" }}
                  />
                  <Typography sx={{ fontSize: "12px", color: "red" }}>
                    {error1}
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 4,
                width: 500,
              }}
            >
              <FormControl sx={textFieldStyle} variant="outlined">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  name="password"
                  onChange={onChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {error2 !== "" ? (
                <Box sx={{ display: "flex", height: 0 }}>
                  <ErrorIcon
                    sx={{ color: "red", width: "17px", height: "17px" }}
                  />
                  <Typography sx={{ fontSize: "12px", color: "red" }}>
                    {error2}
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
            </Box>
            <Button type="submit" sx={buttonStyle}>
              Login
            </Button>
          </form>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#888888", fontSize: "13px" }}>
              Did you forget your password?
            </Typography>
            <Link to="/findingPassword">
              <Button
                variant="text"
                sx={{
                  width: 120,
                  color: "black",
                  textTransform: "none",
                  "&:hover": { bgcolor: "white" },
                }}
              >
                Find password
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#888888", fontSize: "13px" }}>
              Do you already have an account?
            </Typography>
            <Link to="/joinMembership">
              <Button
                variant="text"
                sx={{
                  width: 140,
                  color: "black",
                  textTransform: "none",
                  p: 0,
                  "&:hover": { bgcolor: "white" },
                }}
              >
                Create an account
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Auth;
