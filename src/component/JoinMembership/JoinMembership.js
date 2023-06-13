import {
  Box,
  Checkbox,
  FormControl,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import validator from "validator";
import ErrorIcon from "@mui/icons-material/Error";
const gridStyle = {
  height: "100%",
  mt: "80px",
  mb: "80px",
  flexDirection: "column",
  alignContent: "space-around",
  justifyContent: "space-around",
  bgcolor: "white",
};
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
  fontWeight: 780,
  "&:hover": { bgcolor: "#ff5722", color: "black" },
};

const JoinMembership = () => {
  const [newNickname, setNewNickName] = useState("");
  const [newAccountEmail, setNewAccountEmail] = useState("");
  const [newAccountPassword, setNewAccountPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [error4, setError4] = useState(null);
  const [error5, setError5] = useState(null);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "nickname") {
      setNewNickName(value);
    } else if (name === "email") {
      setNewAccountEmail(value);
    } else if (name === "password") {
      setNewAccountPassword(value);
    } else if (name === "confirmPassword") {
      console.log("done");
      setConfirmPassword(value);
    }
  };
  const handleCheckBox = (event) => {
    const {
      target: { name, checked },
    } = event;
    if (name === "checkBox1") {
      setCheckBox1(checked);
    } else {
      setCheckBox2(checked);
    }
  };

  const clickCreate = async () => {
    const x = [];
    const querySnapshot = await getDocs(collection(db, "User"));
    querySnapshot.forEach((doc) => {
      x.push(doc.data().nickname);
    });
    if (newAccountEmail === "") {
      setError1("Enter your email.");
    } else if (!validator.isEmail(newAccountEmail)) {
      setError1("your email is not valid.");
    } else {
      setError1(true);
    }
    if (newAccountPassword === "") {
      setError2("Enter Password.");
    } else if (
      newAccountPassword.length < 6 ||
      newAccountPassword.length > 19
    ) {
      setError2("Password must be between 9 and 18 characters.");
    } else {
      setError2(true);
    }
    if (newAccountPassword !== confirmPassword) {
      setError3("Password don't match.");
    } else {
      setError3(true);
    }
    if (newNickname === "") {
      setError4("Enter nickname.");
    } else if (x.includes(newNickname)) {
      setError4("This nickname is already used.");
    } else {
      setError4(true);
    }
    if (checkBox1 === false || checkBox2 === false) {
      setError5("Please check all the check boxes.");
    } else {
      setError5(true);
    }
  };
  useEffect(() => {
    if (
      error1 === true &&
      error2 === true &&
      error3 === true &&
      error4 === true &&
      error5 === true
    ) {
      createUserWithEmailAndPassword(auth, newAccountEmail, newAccountPassword)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await setDoc(doc(db, "User", `${user.uid}`), {
            nickname: newNickname,
          });
        })
        .then(navigate("/"));
    }
  }, [error1, error2, error3, error4, error5]);
  return (
    <Grid container sx={gridStyle}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          width: 500,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 5 }}>
          <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
            Create an account
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 500,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={textFieldStyle}
              name={"email"}
              label="E-mail"
              onChange={onChange}
            />
            {error1 !== null && error1 !== true ? (
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            {error2 !== null && error2 !== true ? (
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl sx={textFieldStyle} variant="outlined">
              <InputLabel>Confirm password</InputLabel>
              <OutlinedInput
                name="confirmPassword"
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword2} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="confirmPassword"
              />
            </FormControl>
            {error3 !== null && error3 !== true ? (
              <Box sx={{ display: "flex", height: 0 }}>
                <ErrorIcon
                  sx={{ color: "red", width: "17px", height: "17px" }}
                />
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  {error3}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={textFieldStyle}
              label="Nickname"
              name="nickname"
              onChange={onChange}
            />
            {error4 !== null && error4 !== true ? (
              <Box sx={{ display: "flex", height: 0 }}>
                <ErrorIcon
                  sx={{ color: "red", width: "17px", height: "17px" }}
                />
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  {error4}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Checkbox
                sx={{ width: "18px", height: "18px", m: 1 }}
                name="checkBox1"
                onClick={handleCheckBox}
              />
              <Typography sx={{ fontSize: 12, mt: 1 }}>
                Accept the terms and conditions of personal information
                collection
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Checkbox
                sx={{ width: "18px", height: "18px", m: 1 }}
                name="checkBox2"
                onClick={handleCheckBox}
              />
              <Typography sx={{ fontSize: 12, mt: 1 }}>
                Acceptance of Terms and Conditions
              </Typography>
            </Box>

            {error5 !== null && error5 !== true ? (
              <Box sx={{ display: "flex", height: 0 }}>
                <ErrorIcon
                  sx={{ color: "red", width: "17px", height: "17px" }}
                />
                <Typography sx={{ fontSize: "12px", color: "red" }}>
                  {error5}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Button sx={buttonStyle} onClick={clickCreate}>
            Create
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#888888", fontSize: "13px", mr: 1 }}>
            Do you already have an account?
          </Typography>
          <Link to="/">
            <Button
              variant="text"
              sx={{
                color: "black",
                textTransform: "none",
                "&:hover": { bgcolor: "white" },
              }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default JoinMembership;
