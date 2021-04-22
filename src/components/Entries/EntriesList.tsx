import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { useParams } from "react-router-dom";
import EntryItem from "./EntryItem";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TablePagination
} from "@material-ui/core";
import { createData } from "../../utils/createData";
import "./entries.scss";
import { EntrySingleType, EntrieType } from "../../types"
import  './entries.scss'

const useStyles = makeStyles({
  table: {
    minWidth: 250,
    borderCollapse: "separate",
    borderSpacing: "10px",
  },
})

type EntriesItemsType = {
  isLoadingEntries: boolean
  entries: Array<EntrySingleType>
  deleteEntry: (id: number) => boolean
  getEntries: (userId: number, date: string) => Array<EntrieType>
  updateEntry: (entry: EntrySingleType ) => EntrySingleType
}

const EntriesItems: React.FC<EntriesItemsType> = ({
  getEntries,
  updateEntry,
  deleteEntry,
  entries,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyles();
  const { userId, date } = useParams();
  let total: number = entries.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);

  const rows = entries.map((e) =>
    createData(e.id, e.catagorie, e.amount, e.date)
  );

  useEffect(() => {
    getEntries(userId, date);
  }, [getEntries, date, userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <h2>Day spending: </h2>
      {entries.length && (
        <>
        <TableContainer component={Paper} style={{ width: "60%" }}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableBody>
            {rows.map((row) => (
              <EntryItem
                key={row.id}
                {...row}
                {...{ userId }}
                {...{ updateEntry }}
                {...{ deleteEntry }}
         
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          className="table-pagination"          
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      <Box display="flex" justifyContent="space-between" width={"20%"} fontSize="bold" color={red[500]} marginTop={2}>
        <span className="total-spend">Total:</span> <span>{total} $</span>
      </Box>
      </>
      )}
      
    </Box>
  );
};

export default EntriesItems;
