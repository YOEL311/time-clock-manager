import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, TextField } from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  getListEmploys,
  addNewEmploy,
  removeJob,
} from "../store/employsAction";
import { getListJobs } from "../store/jobsAction";
import { useDispatch } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddBoxIcon from "@material-ui/icons/AddBox";

// const useStyles = makeStyles((theme) => ({
//   TextField: {
//     margin: 20,
//   },
// }));

const useStyles = makeStyles({
  table: {
    minWidth: "30vw",
  },
});

const Employs = () => {
  const dispatch = useDispatch();
  const employs = useSelector((state) => state.employs);
  const jobs = useSelector((state) => state.jobs);
  const classes = useStyles();

  const [nameNewEmploy, setNameNewEmploy] = useState("");
  const [titleNewEmploy, setTitleNewEmploy] = useState("");
  const [phoneNewEmploy, setPhoneNewEmploy] = useState("");

  useEffect(() => {
    dispatch(getListEmploys());
    dispatch(getListJobs());
  }, []);

  const handleAddEmploy = () => {
    if (
      nameNewEmploy.length > 0 &&
      titleNewEmploy.length > 0 &&
      phoneNewEmploy.length > 0
    ) {
      dispatch(
        addNewEmploy({
          name: nameNewEmploy,
          title: titleNewEmploy,
          phone: phoneNewEmploy,
        })
      );
      setTitleNewEmploy("");
      setPhoneNewEmploy("");
      setNameNewEmploy("");
    } else {
      toast.error("Enter details");
    }
  };
  return (
    <Grid>
      <Container>
        <Typography variant="h5">Employs</Typography>
        {/* <List> */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employs.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => {
                          dispatch(removeJob(row.id));
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow key={"new"}>
                <TableCell align="center">
                  <TextField
                    variant="outlined"
                    placeholder="Enter Phone"
                    value={phoneNewEmploy}
                    onChange={(event) => {
                      setPhoneNewEmploy(event.target.value);
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    variant="outlined"
                    placeholder="Enter name"
                    value={nameNewEmploy}
                    onChange={(event) => {
                      setNameNewEmploy(event.target.value);
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    id="demo-simple-select"
                    value={titleNewEmploy}
                    onChange={(event) => {
                      setTitleNewEmploy(event.target.value);
                    }}
                  >
                    {jobs.map((job) => (
                      <MenuItem key={job.id} value={job.title}>
                        {job.title}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <AddBoxIcon onClick={handleAddEmploy} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Grid>
  );
};

export default Employs;
