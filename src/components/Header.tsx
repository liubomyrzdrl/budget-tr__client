/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import green from "@material-ui/core/colors/green";
import { connect } from "react-redux";
import "../scss/style.scss";
import { UserSingleType } from "../types";
import { getUser } from "../modules/user/userOperations";
import { ApiAuth } from '../api'

type HeaderType = {
  user: UserSingleType;
  isLoading: boolean;
  getUser: any;
};

const Header: React.FC<HeaderType> = ({ user, isLoading }) => {
  const [isLogin, setIslogin] = useState(ApiAuth.isLoggedIn())
  const history = useHistory()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {    
    setIslogin(ApiAuth.logout())   
    history.push('/')
  };

  const auth = (
    <Box  className="container__auth"  alignContent="center">
      <Link to="/register">
        <Box>Register</Box>
      </Link>
      <Box className="container__login">
        <Link to="/login">
          <Box>Login</Box>
        </Link>
      </Box>
    </Box>
  )

  return (
    <Box bgcolor={green[200]} width="100%" height="120px" color="text.primary" display="flex" alignItems="center">
      <Box
        className="container"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="container__logo">
          <Link to="/">
            <img src="/morimage.png" alt="Logo" />
          </Link>
          
        </Box>
        {isLogin ? (
          isLoading ? <div>Loading ...</div> : (
          <Box className="container__auth">
            <Box>{user.username}</Box>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
      
          </Box>
          )
        ) : (
          auth
        )}
      </Box>
    </Box>
  );
};
const mapDispatchToState = {
  getUser,
};
function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToState)(Header);
