import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getListEmploys, setEmploy } from "../store/actions/employsAction";
import { getListJobs } from "../store/actions/jobsAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditEmploy = (props) => {
  const { isOpen, employId, closeModel } = props;

  const EditInvitationSchema = Yup.object().shape({
    name: Yup.string().required("mandatoryField"),
    mobile: Yup.number()
      .required("mandatoryField")
      .test("len", "phoneNumberLength", (val) => val?.toString().length > 8),
    title: Yup.string().required("mandatoryField"),
  });

  const initialValues = {
    name: "",
    mobile: employId,
    title: "",
  };

  async function onSubmit(data, { resetForm }) {
    const { name, mobile, title } = data;
    dispatch(setEmploy({ name, mobile, title }));
    resetForm();
    closeModel();
  }

  const configForm = {
    initialValues,
    onSubmit,
    validationSchema: EditInvitationSchema,
    enableReinitialize: true,
  };

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);

  const formData = useFormik(configForm);

  useEffect(() => {
    dispatch(getListEmploys());
    dispatch(getListJobs());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={isOpen} onClose={closeModel}>
      <DialogTitle id="form-dialog-title">Edit Employ</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="mobile"
          label="Mobile"
          inputProps={{ readOnly: true }}
          fullWidth
          value={formData.values.mobile}
        />
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={formData.handleChange("name")}
          error={!!formData.errors.name}
          value={formData.values.name}
        />

        <InputLabel>Select Job</InputLabel>
        <Select
          fullWidth
          id="demo-simple-select"
          onChange={formData.handleChange("title")}
          error={!!formData.errors.title}
          value={formData.values.title}
          label="Name"
        >
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.title}>
              {job.title}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (!Object.entries(formData.errors).length) {
              formData.handleSubmit();
              formData.handleReset();
              closeModel();
            }
          }}
          color="primary"
        >
          Save Changes
        </Button>
        <Button onClick={closeModel} color="primary">
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmploy;
