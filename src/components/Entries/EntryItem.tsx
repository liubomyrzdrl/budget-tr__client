import DeleteIcon from "@material-ui/icons/Delete"
import { memo } from "react"
import EditIcon from "@material-ui/icons/Edit"
import CancelIcon from "@material-ui/icons/Cancel"
import SaveIcon from "@material-ui/icons/Save"
import green from "@material-ui/core/colors/green"
import React, { useState } from "react"
import {
  Button,
  makeStyles,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import { EntrySingleType } from "../../types"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

type EntryItemType = {
  id: number
  userId: number
  catagorie: string
  amount: number
  date: string
  deleteEntry: (id: number) => boolean
  updateEntry: (entry: EntrySingleType) => EntrySingleType
  isLoadingEntries: boolean
}

const EntryItem: React.FC<EntryItemType> = memo(
  ({
    id,
    userId,
    catagorie,
    amount,
    date,
    deleteEntry,
    updateEntry,
    isLoadingEntries,
  }) => {
    const [catagorieData, setCatagorieData] = useState('test')
    const [amountData, setAmountData] = useState(amount)
    const [isEdit, setEdit] = useState(false)
    const classes = useStyles()
    
    
    function handleIsEdit() {
      setEdit(!isEdit)
    }

    function handleIsCancel() {
      setCatagorieData(catagorie)
      setAmountData(amount)
      setEdit(!isEdit)
    }

   
    function handleCategorie(e: React.ChangeEvent<HTMLInputElement>) {
      console.log(e.target.value)
      setCatagorieData(e.target.value)
    
    }

    function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
      setAmountData(Number(e.target.value))
    }

    async function handleSave() {
      try {
         await updateEntry({
          id,
          catagorie: catagorieData,
          amount: amountData,
          userId,
          date,
        })
  
      } catch (error) {
        console.log("error", error)
      }
    }

    async function handleDelete() {
      try {
        await deleteEntry(id)
      } catch (error) {
        console.log("error", error)
      }
    }
    return (
      <TableRow key={catagorie}>
        {isEdit ? (
          <>
            <TableCell>
              <TextField
                id="standard-size-small"
                // value={catagorieData ? catagorieData : ""}   
                value={catagorieData}         
                helperText={
                  catagorieData === "" && "Empty input is not allowed"
                }
                type="text"
                size="small"
                rowsMax={4}
                onChange={handleCategorie}
              />
            </TableCell>
            <TableCell>
              <TextField
                id="standard-size-small"
                value={amountData ? amountData : ""}             
                helperText={
                  catagorieData === "" && "Empty input is not allowed"
                }
                type="number"
                size="small"
                rowsMax={4}
                onChange={handleAmount}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell component="th" scope="row">
              {catagorie}
            </TableCell>
            <TableCell align="right">{amount}</TableCell>
          </>
        )}
        <TableCell>
          {isEdit ? (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              style={{ color: green[300] }}
              className={classes.button}
              startIcon={<SaveIcon />}
              disabled={catagorieData === ''}
            >
              {isLoadingEntries ? "loading ..." : "Save"}
            </Button>
          ) : (
            <Button
              onClick={handleIsEdit}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
          {isEdit ? (
            <Button
              onClick={handleIsCancel}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              {isLoadingEntries ? "Deleting ...." : "Delete"}
            </Button>
          )}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    )
  }
)

export default EntryItem;
