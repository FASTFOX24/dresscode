import { Backdrop, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const LoadginBackDrop = ({backdrop,loadingMessage}) => {
  return (
    <Backdrop
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: "flex",
      flexDirection: "column",
    }}
    open={backdrop}
  >
    <CircularProgress sx={{ color: "#ff5722",marginBottom:"16px" }} />
    <Typography fontWeight={"bold"}>
      {loadingMessage}
    </Typography>
  </Backdrop>
  )
}

export default LoadginBackDrop