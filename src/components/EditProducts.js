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

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import PaginationDashboard from "./PaginationDashboard";
import CreateProduct from "./CreateProduct";

export default function EditProducts({ themeMode }) {
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

  const filteredStockInfo = stockInfo.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStockInfo.length / rowsPerPage);

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

  const deleteProduct = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/stockinfo/${id}`
      );
      fetchStockInfo();
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteVariant = async (id, variantId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/stockinfo/variant/${id}/${variantId}`
      );
      fetchStockInfo();
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchStockInfo();
  }, []);

  return (
    <>
      <Tabs className={`tabsHeader ${themeMode}`}>
        <TabList className={`tablist ${themeMode}`}>
          <Tab
            style={{
              marginLeft: "1rem",
              height: "100%",
            }}
          >
            Edit Products
          </Tab>
          <Tab style={{ height: "100%" }}>Create new Product</Tab>
        </TabList>
        <TabPanel>
          <Box marginX={2}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
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
                sx={{
                  marginBottom: "1rem",
                  maxWidth: "400px",
                  width: "100%",
                }}
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
                    <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "600" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="right">
                      Quantity
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="right">
                      Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="right">
                      Total Price
                    </TableCell>
                    <TableCell align="right">#</TableCell>
                    <TableCell align="right">#</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStockInfo
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item) => (
                      <Row
                        deleteVariant={deleteVariant}
                        deleteProduct={deleteProduct}
                        key={item._id}
                        item={item}
                        resetCollapse={resetCollapse}
                      ></Row>
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
        </TabPanel>
        <TabPanel>
          <CreateProduct />
        </TabPanel>
      </Tabs>
    </>
  );
}

function Row({ item, resetCollapse, deleteProduct, deleteVariant }) {
  const { row } = item;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(false);
  }, [resetCollapse]);

  return (
    <React.Fragment>
      <TableRow
        key={item._id}
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
        <TableCell className="tableCell" align="right">
          <IconButton>
            <BiEdit style={{ color: "#5686E1", fontSize: "30px" }}></BiEdit>
          </IconButton>
        </TableCell>
        <TableCell className="tableCell" align="right">
          <IconButton>
            <RiDeleteBin6Fill
              onClick={() => deleteProduct(item._id)}
              style={{ color: "#EB3223", fontSize: "30px" }}
            ></RiDeleteBin6Fill>
          </IconButton>
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
              <Table size="small" aria-label="variants">
                <TableHead>
                  <TableRow>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">#</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.variants &&
                    item.variants.map((variant) => (
                      <TableRow key={variant._id}>
                        <TableCell component="th" scope="row">
                          {variant.color}
                        </TableCell>
                        <TableCell>{variant.size}</TableCell>
                        <TableCell align="right">{variant.quantity}</TableCell>
                        <TableCell align="right">{variant.price}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => deleteVariant(item._id, variant._id)}
                          >
                            <RxCross1></RxCross1>
                          </IconButton>
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
