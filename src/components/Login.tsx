import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormField from "../components/Form/FromField";
import { Box, Button, TextField, makeStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { login } from "../modules/auth/authOperations";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import green from "@material-ui/core/colors/green";
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
}));

type AddBankFormType = {
  handleSubmit: (values: any, actions: FormikHelpers<any>) => any;
  setIsAddBank: (isOk: boolean) => void;
  login: any;
  isLoading: boolean;
  isError: boolean;
};

const Login: React.FC<AddBankFormType> = ({ login, isLoading, isError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorLogin(false);
    setEmail(e.target.value);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorLogin(false);
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
        height={400}
        width={400}
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
              const res = await login({
                email,
                password,
              });
              console.log("RES server", res);
      
              if (isError) {
                setEmail("");
                setPassword("");
              }
              
            } catch (error) {
              console.log("Error Login", error);
            }
            history.push("/");
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
                {isError && (
                  <Box color={red[200]} mt={1}>
                    Wrong email or password
                  </Box>
                )}

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

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.login.isLoading,
    isError: state.authReducer.login.isError,
  };
};
const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
