import React from "react";
import { Box } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { Link } from "react-router-dom";
import "./index.scss";

const AuthHeader = () => {
  return (
    <Box
      position="absolute"
      top="0"
      height={100}
      width={"100%"}
      bgcolor={green[100]}
      display="flex"
      alignItems="center"
    >
      <Box ml={23}>
        <Link to="/ ">
          <Box width={150} height={100} className="img-auth-header">
            <img className="img-auth-header__logo" src="/morimage.png" alt="" />
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default AuthHeader;
