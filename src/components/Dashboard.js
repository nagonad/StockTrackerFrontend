import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Grid,
  Box,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import {
  Euro as EuroIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@material-ui/icons";
import PaginationDashboard from "./PaginationDashboard";

export default function Dashboard() {
  const [stockInfo, setStockInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/stockinfo");
        console.log(response);
        if (!Array.isArray(response.data)) {
          console.error("Data from server is not an array:", response.data);
        } else {
          setStockInfo(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch stockInfo", error);
      }
    };

    fetchStockInfo();
  }, []);

  const totalValue = stockInfo.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const outOfStockCount = stockInfo.filter(
    (item) => item.quantity === 0
  ).length;
  const categories = [...new Set(stockInfo.map((item) => item.category))]
    .length;

  const filteredStockInfo = stockInfo.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStockInfo.length / rowsPerPage);

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ShoppingCartIcon />}
          style={{ marginRight: 10, padding: "20px 30px" }}
          size="large"
        >
          <Typography variant="h6">
            Total Products: {stockInfo.length}
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<EuroIcon />}
          style={{ marginRight: 10, padding: "20px 30px" }}
          size="large"
        >
          <Typography variant="h6">Total Value: {totalValue}</Typography>
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginRight: 10, padding: "20px 30px" }}
          size="large"
        >
          <Typography variant="h6">Out of Stock: {outOfStockCount}</Typography>
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginRight: 10, padding: "20px 30px" }}
          size="large"
        >
          <Typography variant="h6">Categories: {categories}</Typography>
        </Button>
      </Box>
      <Divider sx={{ marginBottom: "1rem" }}></Divider>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <TextField
          label={
            isFocused ? (
              ""
            ) : (
              <div
                style={{
                  display: "flex",
                  color: "#1976D2",
                }}
              >
                <SearchIcon sx={{ marginRight: "0.5rem" }}></SearchIcon>
                <Typography>Search</Typography>
              </div>
            )
          }
          variant="outlined"
          value={searchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ marginBottom: "1rem", maxWidth: "400px", width: "100%" }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{
            borderCollapse: "separate",
          }}
        >
          <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="center">
                Image
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="left">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="center">
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="center">
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="center">
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="center">
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStockInfo
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item) => (
                <Row item={item}></Row>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationDashboard
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </Box>
  );
}

function Row({ item }) {
  const { row } = item;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        key={item.id}
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: open ? "#E5E7EB" : "inherit",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          className="tableCell"
          component="th"
          scope="row"
          align="center"
        >
          <img
            src={item.imageUrl}
            alt="Product"
            style={{ width: "40px", height: "40px" }}
          />
        </TableCell>
        <TableCell className="tableCell">{item.name}</TableCell>

        <TableCell className="tableCell" align="center">
          {item.category}
        </TableCell>
        <TableCell className="tableCell" align="center">
          {item.quantity}
        </TableCell>
        <TableCell className="tableCell" align="center">
          {item.price}
        </TableCell>
        <TableCell className="tableCell" align="center">
          {item.totalPrice}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#F3F4F6",
          }}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      dummy
                    </TableCell>
                    <TableCell>dummy</TableCell>
                    <TableCell align="right">dummy</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">100</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
