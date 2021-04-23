import React, { useEffect, useState } from "react";
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
import { setEmploy, getListEmploys, removeJob } from "../store/employsAction";
import { getListJobs } from "../store/jobsAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditEmploy from "./EditEmploy";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [editOpen, setEditOpen] = useState(false);
  const [editEmployId, setEditEmployId] = useState("123456");

  const EditEmploySchema = Yup.object().shape({
    name: Yup.string().required("mandatoryField"),
    mobile: Yup.number()
      .required("mandatoryField")
      .test("len", "phoneNumberLength", (val) => val?.toString().length > 8),
    title: Yup.string().required("mandatoryField"),
  });

  const initialValues = {
    name: "",
    mobile: "",
    title: "",
  };

  async function onSubmit(data, { resetForm }) {
    const { name, mobile, title } = data;
    dispatch(setEmploy({ name, mobile, title }));
    resetForm();
  }

  const configForm = {
    initialValues,
    onSubmit,
    validationSchema: EditEmploySchema,
    enableReinitialize: true,
  };

  const formData = useFormik(configForm);

  useEffect(() => {
    dispatch(getListEmploys());
    dispatch(getListJobs());
  }, []);

  return (
    <Grid>
      <Container>
        <Typography variant="h5">Employs</Typography>
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
                    <IconButton
                      onClick={() => {
                        setEditEmployId(row.id);
                        setEditOpen(true);
                      }}
                    >
                      <EditIcon />
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
                    style={{ width: 120 }}
                    variant="outlined"
                    placeholder="Enter Phone"
                    onChange={formData.handleChange("mobile")}
                    error={!!formData.errors.mobile}
                    value={formData.values.mobile}
                    type="number"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    style={{ width: 120 }}
                    variant="outlined"
                    placeholder="Enter name"
                    onChange={formData.handleChange("name")}
                    error={!!formData.errors.name}
                    value={formData.values.name}
                  />
                </TableCell>
                <TableCell align="center">
                  <Select
                    style={{ width: 120 }}
                    id="demo-simple-select"
                    onChange={formData.handleChange("title")}
                    error={!!formData.errors.title}
                    value={formData.values.title}
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
                    <AddBoxIcon onClick={formData.handleSubmit} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <EditEmploy
        employId={editEmployId}
        closeModel={() => setEditOpen(false)}
        isOpen={editOpen}
      ></EditEmploy>
    </Grid>
  );
};

export default Employs;
