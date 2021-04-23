import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import { getListEmploys } from "../store/actions/employsAction";
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
import moment from "moment";

const Times = () => {
  const dispatch = useDispatch();
  const employs = useSelector((state) => state.employs);
  const amountTimes = useSelector((state) => state.amountTimes);
  const times = useSelector((state) => state.times);
  const [employSelected, setEmploySelected] = useState(null);
  const dataStyle = [["Element", "Times", { role: "style" }], ...amountTimes];

  useEffect(() => {
    dispatch(getTimes());
    dispatch(getListEmploys());
  }, []);

  return (
    <Container>
      {true > 0 && (
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          options={{
            colors: ["blue", "red", "green", "yellow", "gray"],
            legend: { position: "none" },
          }}
          data={dataStyle}
        />
      )}

      <Grid>
        <Grid>
          <Select
            style={{ width: "15vw" }}
            onChange={(event) => {
              setEmploySelected(event.target.value);
            }}
            value={employSelected}
          >
            {employs.map((employ) => (
              <MenuItem key={employ.id} value={employ.id}>
                {employ.name}
              </MenuItem>
            ))}
          </Select>

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell align="right">Event</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {times[employSelected]?.times?.map((time, index) => {
                  const isEntry = index % 2 === 0 ? true : false;
                  return (
                    <TableRow
                      style={{
                        backgroundColor: isEntry ? "#28A745" : "#FFC107",
                      }}
                      key={time}
                    >
                      <TableCell component="th" scope="row">
                        {moment(time).format("MMMM Do YYYY, h:mm:ss a")}
                      </TableCell>
                      <TableCell align="right">
                        {isEntry ? "Enter" : "Exit"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Times;
