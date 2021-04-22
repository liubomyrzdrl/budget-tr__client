import React from "react"
import Layout from "../components/Layout"
import { appOperations } from "../modules/app"
import Entries from "../components/Entries/Entries"
import {  Box } from "@material-ui/core"
import { connect } from "react-redux"
import { UserSingleType } from "../types"
import { MainStateType } from '../store/createState'
import Router from '../components/Router'
import MainContent from "../components/MainContent"

type MainType = {
  isLoading: boolean
  user: UserSingleType
};

class Main extends React.Component<MainType> {
 
  constructor(props) {
    super(props);
    console.log("props", props);
    props.dispatch(appOperations.init());
  }
  
  render() {
  
    if (this.props.isLoading) {

      return <div>Loading...</div>;
    }
    console.log("this.props.isLoadingApp", this.props.isLoading)
    return  <Router />
   
     
  }
}

const mapStateToProps = (state: MainStateType )=> {
  console.log(state);
  return {
    isLoading: state.appReducer.isLoading,
    user: state.userReducer.user,
    isError: state.userReducer.isError
  };
};

export default connect(mapStateToProps)(Main);
