import React, { useState, useEffect } from "react";
import { Box, Button, TextField, makeStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { Formik, Form, FormikHelpers } from "formik";
import FormField from "../components/Form/FromField";
import { connect } from "react-redux";
import { register } from "../modules/auth/authOperations";
import { useHistory, Link } from "react-router-dom";
import { MainStateType } from "../store/createState";
import AuthHeader from "./AuthHeader";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

type SendRegisterType = {
  username: string
  email: string 
  password: string
}

type AuthRegisterType = {
  handleSubmit: (values: any, actions: FormikHelpers<any>) => any
  setIsAddBank: (isOk: boolean) => void
  register: (body: SendRegisterType) => any
  isLoading: boolean
  isError: boolean
  error: string
};

const Register: React.FC<AuthRegisterType> = ({ register, isLoading, isError, error }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const [errorRgister, setErrorRegister] = useState(error);
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    if (isError) {
      setErrorRegister(error)
    }     
  }, [error, history, isError]);
  

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorRegister("")
    setUsername(e.target.value);
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorRegister("")
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setErrorRegister("")
    setPassword(e.target.value);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      
    > 
      <AuthHeader />
      <Box
        width={400}
        height={400}
        border="1px solid"
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <h1>Register</h1>
        </Box>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              await register({
                username,
                email,
                password,
              })
              history.push("/")
  
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          {(props) => (
            <Form>
              <Box textAlign="center">
                <Box>
                  <TextField
                    label="username"
                    onChange={handleUsername}
                    value={username}
                    className={classes.textField}
                  />
                </Box>
                <Box>
                  <TextField
                    label="email"
                    onChange={handleEmail}
                    value={email}
                    className={classes.textField}
                  />
                </Box>
                <Box>
                  <TextField
                    label="password"
                    onChange={handlePassword}
                    value={password}
                    className={classes.textField}
                  />
                </Box>            
                  <Box color={red[200]} mt={1}>
                    {errorRgister}
                  </Box>
                  <Box mt={4} mb={2}>
                    <Button type="submit" variant="contained" color="primary" disabled={username ==='' || email === '' || password === ''}>
                    {isLoading ? "Loading ..."  :"Register" }
                    </Button>
                  </Box>
                
                <Box>
                  <Link to="/login">Login</Link>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: MainStateType) => {
  return {
    isLoading: state.authReducer.register.isLoading,
    isError: state.authReducer.register.isError,
    error: state.authReducer.register.error,
  };
};

const mapDispatchToProps = {
  register,
};

//export default  Register
export default connect(mapStateToProps, mapDispatchToProps)(Register);
