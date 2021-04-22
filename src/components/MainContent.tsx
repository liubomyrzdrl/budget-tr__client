import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Entries from "./Entries/Entries";
import { ApiAuth } from "../api";
import { connect } from "react-redux";
import {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} from "../modules/entries/entriesOperation";
import Layout from "./Layout";

const MainContent = ({
  user,
  entries,
  isLoadingUser,
  isLoadingEntries,
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
}) => {
  const [isLogin, setIslogin] = useState(ApiAuth.isLoggedIn())

   useEffect(() => {
    window.addEventListener("click", (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.classList.contains('logout')) {
        setIslogin(false)     
      }
    })
   },[]) 
  return (
    <Layout> 
    <Box mb={5}>
      {isLogin? (
        // <>
          isLoadingUser ? (
            <h1>Loading...</h1>
          ) : (
            <Entries
              {...{ user }}
              {...{ entries }}
              {...{ isLoadingEntries }}
              {...{ createEntry }}
              {...{ getEntries }}
              {...{ updateEntry }}
              {...{ deleteEntry }}
            />
          )
        // </>
      ) : (
        <div>Not Login</div>
      )}
    </Box>
    </Layout>
  );
};

const mapStateToProps = (state: MainStateType) => {
  return {
    user: state.userReducer.user,
    entries: state.entriesReducer.items,
    isLoadingEntries: state.entriesReducer.isLoading,
    isLoadingUser: state.userReducer.isLoading,
  };
};

const mapDispatchToState = {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
};

export default connect(mapStateToProps, mapDispatchToState)(MainContent);
