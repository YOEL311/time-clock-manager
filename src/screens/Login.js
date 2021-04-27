import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import { signIn } from "../store/actions/authActions";
import { getTimes } from "../store/actions/timesAction";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-google-charts";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const Login = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <Typography variant="h5">Login</Typography>

      {userName ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers?.map((user, index) => {
                return (
                  <TableRow key={user}>
                    <TableCell align="left">{user}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid style={{ width: 150 }} direction="column" container>
          <TextField onChange={(e) => setUser(e.target.value)}></TextField>
          <TextField onChange={(e) => setPassword(e.target.value)}></TextField>

          <Button
            onClick={() => {
              dispatch(signIn(user, password));
            }}
          >
            SIGN IN
          </Button>
        </Grid>
      )}
    </Container>
  );
};

export default Login;
