import React from "react"
import { appOperations } from "../modules/app"
import {  Box } from "@material-ui/core"
import { connect } from "react-redux"
import { UserSingleType } from "../types"
import { MainStateType } from '../store/createState'
import Router from '../components/Router'

type MainType = {
  isLoading: boolean
  user: UserSingleType
}

class Main extends React.Component<MainType> {
 
  constructor(props) {
    super(props)
    console.log("props", props)
    props.dispatch(appOperations.init())
  }
  
  render() {  
    if (this.props.isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">           
           <img src="/spinner.gif" alt=""/>
        </Box>
      )       
    }
    return  <Router />    
  }
}

const mapStateToProps = (state: MainStateType )=> {
  console.log(state);
  return {
    isLoading: state.appReducer.isLoading,
    user: state.userReducer.user,
    isError: state.userReducer.isError
  }
}

export default connect(mapStateToProps)(Main)
