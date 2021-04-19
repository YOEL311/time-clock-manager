// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Container,
//   Card,
//   Typography,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
// } from "@material-ui/core";
// import { getData } from "../store/actions";
// import { useDispatch } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
// import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// import AddEmploy from "./AddEmploy";

// const useStyles = makeStyles((theme) => ({
//   TextField: {
//     margin: 20,
//   },
// }));
// const Login = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const user = useSelector((state) => state.user);

//   const style = useStyles();
//   useEffect(() => {
//     dispatch(getData());
//   }, []);

//   return (
//     <Grid>
//       <Container>
//         <AddEmploy />
//       </Container>
//     </Grid>
//   );
// };

// export default Login;
