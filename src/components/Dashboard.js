import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import PaginationDashboard from "./PaginationDashboard";

export default function Dashboard({ themeMode }) {
  const [resetCollapse, setResetCollapse] = useState(false);
  const [stockInfo, setStockInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const closeDropdowns = () => {
    setResetCollapse((prev) => !prev);
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const response = await axios.get(
          "https://stocktrackerbackend.onrender.com/stockinfo"
        );
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
    <Box
      m={3}
      className={themeMode}
      // sx={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box
          className={`dashboardTopContainer ${themeMode}`}
          sx={{ backgroundColor: "#A908AC", color: "white" }}
        >
          <ShoppingCartIcon
            fontSize="large"
            sx={{ marginRight: "1rem" }}
          ></ShoppingCartIcon>
          <Typography variant="h5">
            Total Products: {stockInfo.length}
          </Typography>
        </Box>
        <Box
          className={`dashboardTopContainer ${themeMode}`}
          sx={{ backgroundColor: "#24A005", color: "white" }}
        >
          <EuroSymbolIcon
            fontSize="large"
            sx={{ marginRight: "1rem" }}
          ></EuroSymbolIcon>
          <Typography variant="h5">Total Value: {totalValue}</Typography>
        </Box>
        <Box
          className={`dashboardTopContainer ${themeMode}`}
          sx={{ backgroundColor: "#D10000", color: "white" }}
        >
          <RemoveShoppingCartIcon
            fontSize="large"
            sx={{ marginRight: "1rem" }}
          ></RemoveShoppingCartIcon>
          <Typography variant="h5">Out of Stock: {outOfStockCount}</Typography>
        </Box>
        <Box
          className={`dashboardTopContainer ${themeMode}`}
          sx={{ backgroundColor: "#2982EA", color: "white" }}
        >
          <ListAltIcon
            fontSize="large"
            sx={{ marginRight: "1rem" }}
          ></ListAltIcon>
          <Typography variant="h5">Categories: {categories}</Typography>
        </Box>
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
                  color: themeMode === "dark" ? "white" : "black",
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
          sx={{
            marginBottom: "1rem",
            maxWidth: "400px",
            width: "100%",
            border: themeMode === "dark" ? "1px solid white" : "",
            borderRadius: "5px",
          }}
        />
      </div>

      <TableContainer
        className={`TableContainer ${themeMode}`}
        component={Paper}
      >
        <Table
          sx={{
            borderCollapse: "separate",
          }}
        >
          <TableHead
            className={`TableHead ${themeMode}`}
            sx={{ backgroundColor: "#F3F4F6" }}
          >
            <TableRow className={`TableRow ${themeMode}`}>
              <TableCell></TableCell>
              <TableCell
                className={`TableCell ${themeMode}`}
                sx={{ fontWeight: "600" }}
                align="center"
              >
                Image
              </TableCell>
              <TableCell
                className={`TableCell ${themeMode}`}
                sx={{ fontWeight: "600" }}
              >
                Name
              </TableCell>
              <TableCell
                className={`TableCell ${themeMode}`}
                sx={{ fontWeight: "600" }}
              >
                Category
              </TableCell>
              <TableCell
                className={`TableCell ${themeMode}`}
                sx={{ fontWeight: "600" }}
                align="right"
              >
                Quantity
              </TableCell>
              <TableCell
                className={`TableCell ${themeMode}`}
                sx={{ fontWeight: "600" }}
                align="right"
              >
                Price
              </TableCell>
              <TableCell
                className={`TableCell ${themeMode}`}
                sx={{ fontWeight: "600" }}
                align="right"
              >
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStockInfo
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item) => (
                <Row
                  item={item}
                  resetCollapse={resetCollapse}
                  themeMode={themeMode}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationDashboard
        closeDropdowns={closeDropdowns}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </Box>
  );
}

function Row({ item, resetCollapse, themeMode }) {
  const { row } = item;
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [resetCollapse]);

  return (
    <React.Fragment>
      <TableRow
        key={item.id}
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: item.quantity === 0 ? "#FF9494" : "inherit",
          // backgroundColor: open ? "#black" : "inherit",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon
                sx={{ color: themeMode === "dark" ? "white" : "" }}
              />
            ) : (
              <KeyboardArrowDownIcon
                sx={{ color: themeMode === "dark" ? "white" : "" }}
              />
            )}
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
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              overflow: "hidden",
            }}
          />
        </TableCell>
        <TableCell className="tableCell">{item.name}</TableCell>

        <TableCell className="tableCell">{item.category}</TableCell>
        <TableCell className="tableCell" align="right">
          {item.quantity}
        </TableCell>
        <TableCell className="tableCell" align="right">
          {item.price}
        </TableCell>
        <TableCell className="tableCell" align="right">
          {item.totalPrice}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            // backgroundColor: "#F3F4F6",
            backgroundColor: themeMode === "dark" ? "black" : "#F3F4F6",
          }}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="variants">
                {/* ... */}
                <TableBody>
                  {item.variants &&
                    item.variants.map((variant) => (
                      <TableRow
                        key={variant.color + variant.size}
                        onClick={() =>
                          navigate(
                            `/product/${item._id}/${variant.color}/${variant.size}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                          component="th"
                          scope="row"
                        >
                          {variant.color}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          {variant.size}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                          align="right"
                        >
                          {variant.quantity}
                        </TableCell>
                        <TableCell
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                          align="right"
                        >
                          {variant.price}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
