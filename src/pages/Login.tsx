import React, { useState,  useEffect } from "react"
import { Formik, Form, FormikHelpers } from "formik"
import { Box, Button, TextField, makeStyles } from "@material-ui/core"
import red from "@material-ui/core/colors/red"
import { login } from "../modules/auth/authOperations"
import { connect } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import green from "@material-ui/core/colors/green"
import AuthHeader from "../components/AuthHeader"
import { MainStateType } from "../store/createState"
import "../scss/style.scss"

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
}));

type SendLoginType = {
  email: string 
  password: string
}

type AuthLoginType = {
  handleSubmit: (values: any, actions: FormikHelpers<any>) => any
  setIsAddBank: (isOk: boolean) => void
  login: (body: SendLoginType) => any
  isLoading: boolean
  isError: boolean
  error: string
};

const Login: React.FC<AuthLoginType> = ({ login, isLoading, isError, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorLogin, setErrorLogin] = useState(error);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (isError) {
      setErrorLogin(error)
    }     
  }, [error, history, isError]);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorLogin("");
    setEmail(e.target.value);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorLogin("");
    setPassword(e.target.value);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        border="1px solid"
        className="login-container"
      >
        <Box
          position="absolute"
          top="0"
          height={100}
          width={"100%"}
          bgcolor={green[200]}
          display="flex"
          alignItems="center"
        >
          <AuthHeader />
        </Box>
        <Box>
          <h1>Login</h1>
        </Box>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            try {      
               await login({
                email,
                password,
              })    
              history.push('/')         
            } catch (error) {
              console.log("Error Login", error)
            }           
          }}
        >
          {(props) => (
            <Form>
              <Box textAlign="center">
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
                    {errorLogin}
                  </Box>
               

                <Box mt={4} mb={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={email === "" || password === ""}
                  >
                    {isLoading ? "Loading ..." : "Login"}
                  </Button>
                </Box>
                <Box>
                  <Link to="/register">Register</Link>
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
    isLoading: state.authReducer.login.isLoading,
    isError: state.authReducer.login.isError,
    error: state.authReducer.login.error,
  };
};
const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
