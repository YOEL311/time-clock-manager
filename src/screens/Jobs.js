import React, { useState, useEffect } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Avatar,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItem,
  List,
  Grid,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { getListJobs, addNewJob, removeJob } from "../store/actions/jobsAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import WorkIcon from "@material-ui/icons/Work";
import AddBoxIcon from "@material-ui/icons/AddBox";

const Login = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const [newJobTitle, setNewJobTitle] = useState("");
  useEffect(() => {
    dispatch(getListJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      <Container>
        <Typography variant="h5">Jobs</Typography>
        <List>
          {jobs.length > 0 &&
            jobs.map((job) => {
              return (
                <ListItem key={job.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={job.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        dispatch(removeJob(job.id));
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <TextField
              placeholder="Enter name"
              onChange={(event) => {
                setNewJobTitle(event.target.value);
              }}
              value={newJobTitle}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  if (newJobTitle.length > 0) {
                    dispatch(addNewJob(newJobTitle));
                    setNewJobTitle("");
                  } else {
                    toast.error("enter title job");
                  }
                }}
                edge="end"
                aria-label="delete"
              >
                <AddBoxIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </Grid>
  );
};

export default Login;
