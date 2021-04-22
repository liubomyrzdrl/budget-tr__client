import React from "react";
import { Box } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import "../scss/style.scss";

const Footer: React.FC<{}> = () => {
  return (
    <Box bgcolor={green[200]} width="100%" height="80px">
      <Box className="container">
        <Box className="footer-info">@all rights reserved</Box>
      </Box>
    </Box>
  )
}

export default Footer;
