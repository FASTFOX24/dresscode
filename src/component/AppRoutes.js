import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DressRoom from "./DressRoom/DressRoom";
import Home from "./Home/Home";
import JoinMembership from "./JoinMembership/JoinMembership";
import LookBook from "./LookBook/LookBook";
import Profile from "./TitleBar/Profile";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import MultiBar from "../reuse/MultiBar";
import Footer from "../reuse/Footer";
import { Box, Grid } from "@mui/material";
import AddStyle from "./AddStyle/AddStyle";
const AppRoutes = ({ isLoggedIn }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const user = auth.currentUser;
        onSnapshot(doc(db, "User", `${user.uid}`), (doc) => {
          setUserInfo(doc.data());
        });
      }
    })();
  }, []);
  return (
    <Grid container flexDirection={"column"}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <MultiBar isLoggedIn={isLoggedIn} userInfo={userInfo} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/dressroom" element={<DressRoom />} />
              <Route path="/lookbook" element={<LookBook />} />
              <Route
                path="/profile"
                element={<Profile userInfo={userInfo} />}
              />
              <Route path="/addingStyle" element={<AddStyle />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Auth />} />
              <Route
                exact
                path="/joinMembership"
                element={<JoinMembership />}
              />
            </>
          )}
        </Routes>
      </Box>
      <Footer />
    </Grid>
  );
};

export default AppRoutes;
