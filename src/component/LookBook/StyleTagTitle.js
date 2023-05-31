import { Grid, Tooltip, tooltipClasses, Typography } from '@mui/material'
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from '@mui/system';
import React from 'react'

const StyleTagTitle = () => {
    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} placement="right" />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 240,
        },
      });
  return (
    <Grid sx={{ display: "flex", alignItems: "center",mb:"6px" }}>
          <Typography>Style Tag</Typography>
          <CustomWidthTooltip
            arrow
            title={
              <h3 style={{ color: "white" }}>
                Manage your style room more uniquely with your own tags!!
              </h3>
            }
          >
            <HelpOutlineIcon
              sx={{ width: "20px", height: "20px", ml: "4px" }}
            />
          </CustomWidthTooltip>
        </Grid>
  )
}

export default StyleTagTitle