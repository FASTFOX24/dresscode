import React from 'react'
import ImageIcon from '@mui/icons-material/Image';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box } from '@mui/material';
const ReuploadIcon = () => {
  return (
    <Box sx={{display:"flex"}}>
        <AutorenewIcon/>
        <ImageIcon/>
    </Box>
  )
}

export default ReuploadIcon