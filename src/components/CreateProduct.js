import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import {
  Typography,
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  InputAdornment,
  Input,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import { AddLink } from "@mui/icons-material";
import { TiDeleteOutline } from "react-icons/ti";

const useStyles = makeStyles({
  hoverStyle: {
    "&:hover": {
      background: "#E7EBF0",
    },
  },
});

export default function CreateProduct() {
  const classes = useStyles();

  const [isParentItem, setIsParentItem] = useState(true);
  const [selectedParentItem, setSelectedParentItem] = useState("");
  const [stockInfo, setStockInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [technicalSpecifications, setTechnicalSpecifications] = useState("");
  const [tsList, setTsList] = useState([]);
  const [features, setFeatures] = useState("");
  const [fList, setFList] = useState([]);
  const [description, setDescription] = useState("");

  const addToList = (value, list) => {
    if (list === "technicalSpecifications") {
      setTsList((prev) => {
        let arr = prev;
        arr.push(value);
        return arr;
      });
      setTechnicalSpecifications("");
    }
    if (list === "features") {
      setFList((prev) => {
        let arr = prev;
        arr.push(value);
        return arr;
      });
      setFeatures("");
    }
  };

  const removeFromList = (value, list) => {
    console.log("clocked");
    if (list === "technicalSpecifications") {
      setTsList((prev) => {
        let arr = prev;
        _.remove(arr, (el) => el === value);
        return [...arr];
      });
    }
    if (list === "features") {
      setFList((prev) => {
        let arr = prev;
        _.remove(arr, (el) => el === value);
        return [...arr];
      });
    }
  };

  const fetchStockInfo = async () => {
    try {
      const response = await axios.get(
        "https://stocktrackerbackend.onrender.com/stockinfo"
      );
      console.log(response);
      if (!Array.isArray(response.data)) {
        console.error("Data from server is not an array:", response.data);
      } else {
        setCategories(_.uniq(_.map(response.data, "category")));
        setStockInfo(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch stockInfo", error);
    }
  };

  useEffect(() => {
    fetchStockInfo();
  }, []);

  useEffect(() => {
    if (isParentItem) {
      setSize("");
      setColor("");
      setTechnicalSpecifications("");
      setTsList([]);
      setFeatures("");
      setFList([]);
      setDescription("");
      setSelectedParentItem("");
    }
  }, [isParentItem]);

  return (
    <div
      style={{
        display: "flex",
        padding: "2rem",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          paddingBottom: "4rem",
        }}
      >
        <Typography>Name of the Product</Typography>
        <Box className="createProductBox">
          <TextField
            sx={{ width: "50%", paddingRight: "1rem" }}
            InputLabelProps={{ shrink: false }}
            placeholder="Name"
            variant="standard"
          />
        </Box>

        <Typography sx={{ marginTop: "2rem" }}>Parent/Sub Item</Typography>
        <Box className="createProductBox">
          <FormControl sx={{ width: "50%", paddingRight: "1rem" }}>
            <Select
              variant="standard"
              value={isParentItem}
              onChange={(e) => setIsParentItem(e.target.value)}
            >
              <MenuItem value={true}>Parent Item</MenuItem>
              <MenuItem value={false}>Sub Item</MenuItem>
            </Select>
          </FormControl>
          {!isParentItem && (
            <FormControl sx={{ width: "50%" }}>
              <Select
                variant="standard"
                displayEmpty
                value={selectedParentItem}
                onChange={(e) => setSelectedParentItem(e.target.value)}
              >
                {stockInfo.map((el) => (
                  <MenuItem value={el._id}>{el.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Typography sx={{ marginTop: "2rem" }}>Category</Typography>
        <Box className="createProductBox">
          <FormControl sx={{ width: "50%" }}>
            <Select
              variant="standard"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography sx={{ marginTop: "2rem" }}>Quantity/Price</Typography>
        <Box className="createProductBox">
          <FormControl sx={{ width: "50%", paddingRight: "1rem" }}>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label="Quantity"
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel>Price</InputLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Box>
        {!isParentItem && (
          <>
            <Typography sx={{ marginTop: "2rem" }}>Size/Color</Typography>
            <Box className="createProductBox">
              <FormControl sx={{ width: "50%", paddingRight: "1rem" }}>
                <TextField
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  label="Size"
                  variant="standard"
                  //   InputProps={{
                  //     endAdornment: <Button variant="contained">Add</Button>,
                  //   }}
                />
              </FormControl>
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  label="Color"
                  variant="standard"
                />
              </FormControl>
            </Box>
            <Typography sx={{ marginTop: "2rem" }}>
              Technical Specifications
            </Typography>
            <Box sx={{ width: "100%" }} className="createProductBox">
              <div style={{ display: "flex" }}>
                <TextField
                  sx={{ flex: "1", marginRight: "1rem" }}
                  value={technicalSpecifications}
                  onChange={(e) => setTechnicalSpecifications(e.target.value)}
                  variant="standard"
                  multiline
                />
                <div>
                  <Button
                    sx={{ paddingRight: "1.5rem", paddingLeft: "1.5rem" }}
                    variant="contained"
                    onClick={() => {
                      addToList(
                        technicalSpecifications,
                        "technicalSpecifications"
                      );
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>
                {tsList.map((el, index) => (
                  <Box
                    className={classes.hoverStyle}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: "1", marginRight: "1rem" }}>
                      <Typography>
                        {index + 1} - {el}
                      </Typography>
                    </div>
                    <div style={{ alignSelf: "baseline" }}>
                      <IconButton
                        onClick={() =>
                          removeFromList(el, "technicalSpecifications")
                        }
                      >
                        <TiDeleteOutline></TiDeleteOutline>
                      </IconButton>
                    </div>
                  </Box>
                ))}
              </div>
            </Box>
            <Typography sx={{ marginTop: "2rem" }}>Features</Typography>
            <Box sx={{ width: "100%" }} className="createProductBox">
              <div style={{ display: "flex" }}>
                <TextField
                  sx={{ flex: "1", marginRight: "1rem" }}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  variant="standard"
                  multiline
                />
                <div>
                  <Button
                    sx={{ paddingRight: "1.5rem", paddingLeft: "1.5rem" }}
                    variant="contained"
                    onClick={() => {
                      addToList(features, "features");
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>
                {fList.map((el, index) => (
                  <Box
                    className={classes.hoverStyle}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: "1", marginRight: "1rem" }}>
                      <Typography>
                        {index + 1} - {el}
                      </Typography>
                    </div>
                    <div style={{ alignSelf: "baseline" }}>
                      <IconButton
                        onClick={() => removeFromList(el, "features")}
                      >
                        <TiDeleteOutline></TiDeleteOutline>
                      </IconButton>
                    </div>
                  </Box>
                ))}
              </div>
            </Box>
            <Typography sx={{ marginTop: "2rem" }}>Description</Typography>
            <Box className="createProductBox">
              <TextField
                sx={{ width: "100%", paddingRight: "1rem" }}
                variant="standard"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
