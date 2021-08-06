import React, { useState, useEffect } from "react";
import { Box, Button, TextField, makeStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import { Route, useHistory } from "react-router-dom";
import EntriesList from "./EntriesList";
import { EntrySingleType, EntrieType, UserSingleType } from "../../types";
import "./entries.scss";


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

type EntriesType = {
  user: UserSingleType
  entries: Array<EntrySingleType>
  isLoadingUser: boolean
  isLoadingEntries: boolean
  isLoadingApp: boolean
  createEntry: (entry: EntrySingleType) => EntrySingleType
  getEntries: (userId: number, date: string) => Array<EntrieType>
  updateEntry: (entry: EntrySingleType) => EntrySingleType
  deleteEntry: (id: number) => boolean
};

const Entries: React.FC<EntriesType> = ({
  user,
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
  entries,
  isLoadingEntries
}) => {
  const [date, setDate] = useState("2021-04-21")
  const [amount, setAmount] = useState<number>(null)
  const [catagorie, setCatagorie] = useState("")
  const classes = useStyles()
  const history = useHistory()
  
  useEffect(() => {
    history.push(`/e/${user.id}/${date}`)
  },[date, history, user.id])

  function handeleDate(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
     history.push(`/e/${user.id}/${e.target.value}`)
    setDate(e.target.value);
  }

  function handeleCatagorie(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setCatagorie(e.target.value);
  }
  function handeleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setAmount(Number(e.target.value));
  }

  return (
    <Box>
      <Box className="entries-container" >
        <Formik
          initialValues={{
            date:"",
            catagorie: "",
            amount: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              await createEntry({
                amount,
                catagorie,
                userId: user.id,
                date,
              });

              setCatagorie("")
              setAmount(null)
            } catch (error) {
              console.log("Error", error)
            }
          }}
        >
          {(props) => (
            <Form>
              <Box  className="entries-container__form">
                <Box className="entries-container__date-amount entries-field">
                  <TextField            
                    id="date"
                    label="Trecker"
                    onChange={handeleDate}
                    value={date}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
      
                 
                  className="entries-field"
                >
                  <Box mb={3} className="entries-field">
                    <TextField
                      label="amount"
                      onChange={handeleAmount}
                      value={amount ? amount : ""}
                      type="number"
                      placeholder="Spent Amount ($)"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>

                  <Box mb={3} className="entries-field">
                    <TextField
                    
                      label="Catagory"
                      onChange={handeleCatagorie}
                      value={catagorie}
                      placeholder="Catagory"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={catagorie === "" || amount === null}
                  >
                    Create Entry
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box>
        <Route path={`/e/:userId/:date`}>
          <EntriesList
            {...{ getEntries }}
            {...{ updateEntry }}
            {...{ deleteEntry }}
            {...{ entries }}
            {...{ isLoadingEntries }}
          />
        </Route>
      </Box>
    </Box>
  );
};

export default Entries;

