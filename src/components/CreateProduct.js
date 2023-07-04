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
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { TiDeleteOutline } from "react-icons/ti";
import { BiCheckCircle } from "react-icons/bi";
import { BsExclamationCircle } from "react-icons/bs";

const useStyles = makeStyles({
  hoverStyle: {
    "&:hover": {
      background: "#E7EBF0",
    },
  },
});

export default function CreateProduct({ themeMode }) {
  const classes = useStyles();

  const [isParentItem, setIsParentItem] = useState(true);
  const [selectedParentItem, setSelectedParentItem] = useState("");
  const [name, setName] = useState("");
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
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleMessage = (msg) => {
    setError("");
    setMessage(msg);
  };
  const handleError = (msg) => {
    setMessage("");
    setError(msg);
  };

  const handleUpload = (e) => {
    const fileList = Array.from(e.target.files);
    const updatedFiles = fileList.map((file) => ({
      name: file.name,
      file: file,
    }));
    setImages((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleDelete = (clickedImage) => {
    setImages((prev) => {
      let arr = prev;
      let result = _.filter(arr, (el) => el !== clickedImage);
      return [...result];
    });
  };

  const resetParent = () => {
    setName("");
    setSelectedCategory("");
    setImage("");
  };

  const fetchStockInfo = async () => {
    try {
      const response = await axios.get(
        "https://stocktrackerbackend.onrender.com/stockinfo"
      );
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

  const createProduct = async () => {
    if (isParentItem) {
      if (!image || !name || !selectedCategory) {
        handleError("Please fill all necessary fields");
        return;
      }
    }

    if (isParentItem) {
      const formData = new FormData();
      formData.append("picture", image, image.name);
      formData.append("name", name);
      formData.append("category", selectedCategory);

      try {
        const response = await axios.post(
          "https://stocktrackerbackend.onrender.com/stockinfo/",
          formData
        );
        resetParent();
        handleMessage(response.data.message);
      } catch (error) {
        console.log(error);
        handleError(error.response.data.error);
      }
    } else {
      try {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("picture", image.file, image.name);
        });
        formData.append("parentId", selectedParentItem);
        formData.append("name", name);
        formData.append("category", selectedCategory);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("technicalSpecifications", tsList);
        formData.append("features", fList);
        formData.append("description", description);

        const response = await axios.post(
          "https://stocktrackerbackend.onrender.com/stockinfo/variant",
          formData
        );
        handleMessage(response.data.message);
      } catch (error) {
        handleError(error.response.data.error);
      }
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
      setImages([]);
      setImage("");
    }
  }, [isParentItem]);

  return (
    <div
      style={{
        display: "flex",
        padding: "1rem 2rem",
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
        <div
          className="createproductnotificationbox"
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
        <Typography>Name of the Product</Typography>
        <Box boxShadow={1} className={`createProductBox ${themeMode}`}>
          <TextField
            className={`TextField ${themeMode}`}
            sx={{ width: "50%", paddingRight: "1rem" }}
            InputLabelProps={{ shrink: false }}
            placeholder="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Typography sx={{ marginTop: "2rem" }}>Parent/Sub Item</Typography>
        <Box boxShadow={1} className={`createProductBox ${themeMode}`}>
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
                  <MenuItem key={el._id} value={el._id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Typography sx={{ marginTop: "2rem" }}>Category</Typography>
        <Box boxShadow={1} className={`createProductBox ${themeMode}`}>
          <FormControl sx={{ width: "50%" }}>
            <Select
              variant="standard"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((el) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {!isParentItem && (
          <>
            <Typography sx={{ marginTop: "2rem" }}>Quantity/Price</Typography>
            <Box boxShadow={1} className={`createProductBox ${themeMode}`}>
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
            <Typography sx={{ marginTop: "2rem" }}>Size/Color</Typography>
            <Box className={`createProductBox ${themeMode}`} boxShadow={1}>
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
            <Box
              boxShadow={1}
              sx={{ width: "100%" }}
              className={`createProductBox ${themeMode}`}
            >
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
                    key={el}
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
            <Box
              boxShadow={1}
              sx={{ width: "100%" }}
              className={`createProductBox ${themeMode}`}
            >
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
                    key={el}
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
            <Box boxShadow={1} className={`createProductBox ${themeMode}`}>
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
        <Typography sx={{ marginTop: "2rem" }}>Upload Image</Typography>
        <Box
          boxShadow={1}
          className={`createProductBox ${themeMode}`}
          sx={{ display: "flex" }}
        >
          <div style={{ flex: "1" }}>
            {isParentItem ? (
              image && (
                <Box
                  className={classes.hoverStyle}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontStyle: "italic" }}>
                    {image.name}
                  </Typography>
                  <IconButton onClick={() => setImage("")}>
                    <TiDeleteOutline></TiDeleteOutline>
                  </IconButton>
                </Box>
              )
            ) : (
              <>
                {images.map((image) => (
                  <Box
                    key={image.name}
                    className={classes.hoverStyle}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontStyle: "italic" }}>
                      {image.name}
                    </Typography>
                    <IconButton onClick={() => handleDelete(image)}>
                      <TiDeleteOutline></TiDeleteOutline>
                    </IconButton>
                  </Box>
                ))}
              </>
            )}
          </div>
          {isParentItem ? (
            <>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onClick={(e) => {
                  e.target.value = null;
                }}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </>
          ) : (
            <>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onClick={(e) => {
                  e.target.value = null;
                }}
                onChange={handleUpload}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </>
          )}
        </Box>
        <div className="addproductbuttoncontainer">
          <Button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              createProduct();
            }}
            sx={{ width: "100%" }}
            variant="contained"
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
