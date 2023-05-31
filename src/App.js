import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import AppRoutes from "./component/AppRoutes";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "grey.500",
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    (async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
      });
    })();
  });
  return init ? (
    <AppRoutes isLoggedIn={isLoggedIn} />
  ) : (
    <Stack sx={style} spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
  );
}

export default App;
