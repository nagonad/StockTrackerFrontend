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

import { BsExclamationCircle } from "react-icons/bs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BiEdit, BiCheckCircle } from "react-icons/bi";
import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import PaginationDashboard from "./PaginationDashboard";
import CreateProduct from "./CreateProduct";
import EditProductDialog from "./EditProductDialog";
import EditVariantDialog from "./EditVariantDialog";
import _ from "lodash";

export default function EditProducts({ themeMode }) {
  const [resetCollapse, setResetCollapse] = useState(false);
  const [stockInfo, setStockInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [categories, setCategories] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTwoOpen, setDialogTwoOpen] = React.useState(false);

  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleMessage = (msg) => {
    setError("");
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, "3000");
  };
  const handleError = (msg) => {
    setMessage("");
    setError(msg);
    setTimeout(() => {
      setError("");
    }, "3000");
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

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
        setCategories(_.uniq(_.map(response.data, "category")));
      }
    } catch (error) {
      console.error("Failed to fetch stockInfo", error);
    }
  };

  const deleteProduct = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://stocktrackerbackend.onrender.com/stockinfo/${id}`
      );
      fetchStockInfo();
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteVariant = async (id, variantId) => {
    try {
      console.log(variantId);
      const response = await axios.delete(
        `https://stocktrackerbackend.onrender.com/stockinfo/variant/${id}/${variantId}`
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
      <EditProductDialog
        handleError={handleError}
        handleMessage={handleMessage}
        setSelectedProduct={setSelectedProduct}
        categories={categories}
        selectedProduct={selectedProduct}
        open={dialogOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      ></EditProductDialog>
      <EditVariantDialog
        handleMessage={handleMessage}
        themeMode={themeMode}
        dialogTwoOpen={dialogTwoOpen}
        setDialogTwoOpen={setDialogTwoOpen}
        selectedProduct={selectedProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      ></EditVariantDialog>
      <Tabs className={`tabsHeader ${themeMode}`}>
        <TabList className={`tablist ${themeMode}`}>
          <Tab
            style={{
              height: "100%",
              Bottom: "none",
            }}
          >
            Edit Products
          </Tab>
          <Tab style={{ height: "100%" }}>Create new Product</Tab>
        </TabList>
        <TabPanel>
          <div
            className="createproductnotificationbox editProductMainMessageContainer"
            style={
              message
                ? { backgroundColor: "#EAF2EA" }
                : error
                ? { backgroundColor: "#FFEDD5" }
                : { backgroundColor: "inherit" }
            }
          >
            <Box
              sx={{
                fontSize: "24px",
                display: message ? "flex" : "none",
              }}
            >
              <BiCheckCircle
                style={{ color: "#2E7D32", marginRight: "0.5rem" }}
              ></BiCheckCircle>
              <Typography>{message}</Typography>
            </Box>
            <Box
              sx={{
                fontSize: "24px",
                display: error ? "flex" : "none",
              }}
            >
              <BsExclamationCircle
                style={{ color: "#D32F2F", marginRight: "0.5rem" }}
              ></BsExclamationCircle>
              <Typography>{error}</Typography>
            </Box>
          </div>
          <Box marginX={2} className={themeMode}>
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
              component={Paper}
              className={`TableContainer ${themeMode}`}
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
                      sx={{ fontWeight: "600" }}
                      align="center"
                      className={`TableCell ${themeMode}`}
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
                    <TableCell
                      className={`TableCell ${themeMode}`}
                      align="right"
                      sx={{ fontWeight: "600" }}
                    >
                      Edit
                    </TableCell>
                    <TableCell
                      className={`TableCell ${themeMode}`}
                      align="right"
                      sx={{ fontWeight: "600" }}
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStockInfo
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item) => (
                      <Row
                        setSelectedVariant={setSelectedVariant}
                        setDialogTwoOpen={setDialogTwoOpen}
                        setSelectedProduct={setSelectedProduct}
                        handleClickOpen={handleClickOpen}
                        deleteVariant={deleteVariant}
                        deleteProduct={deleteProduct}
                        key={item._id}
                        item={item}
                        resetCollapse={resetCollapse}
                        themeMode={themeMode}
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
              themeMode={themeMode}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <CreateProduct themeMode={themeMode} />
        </TabPanel>
      </Tabs>
    </>
  );
}

function Row({
  item,
  resetCollapse,
  deleteProduct,
  deleteVariant,
  themeMode,
  handleClickOpen,
  setSelectedProduct,
  setDialogTwoOpen,
  setSelectedVariant,
}) {
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
          backgroundColor: open ? "#black" : "inherit",
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
        <TableCell className="tableCell" align="right">
          <IconButton
            onClick={() => {
              setSelectedProduct(item);
              handleClickOpen();
            }}
          >
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
            backgroundColor: themeMode === "dark" ? "black" : "#F3F4F6",
          }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="variants">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Color
                    </TableCell>
                    <TableCell
                      style={{
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Size
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Edit
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.variants &&
                    item.variants.map((variant) => (
                      <TableRow key={variant._id}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
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
                          align="right"
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          {variant.quantity}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          {variant.price}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              setSelectedProduct(item);
                              setSelectedVariant(variant);
                              setDialogTwoOpen(true);
                            }}
                          >
                            <RiEdit2Line></RiEdit2Line>
                          </IconButton>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
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
