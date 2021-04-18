import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: "30vw",
  },
});

export default function BasicTable({ rows }) {
  const classes = useStyles();

  const colors = {
    0: "#FFC107",
    1: "#17A2B8",
    2: "#28A745",
  };

  const getColor = (status) => {
    return colors[status];
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Queue num</TableCell>
            <TableCell align="right">Customer name</TableCell>
            <TableCell align="right">chek in time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              style={{ backgroundColor: getColor(row.status) }}
              key={row.id}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.full_name}</TableCell>
              <TableCell align="right">
                {moment(row.timestamp).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
