import React, { useEffect, useState, useRef } from "react";
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
  Dialog,
  DialogTitle,
  Divider,
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

export default function EditVariantDialog({
  themeMode,
  dialogTwoOpen,
  setDialogTwoOpen,
  selectedProduct,
  setSelectedVariant,
  selectedVariant,
  handleMessage,
}) {
  const classes = useStyles();

  const section1Ref = useRef(null);

  const [technicalSpecifications, setTechnicalSpecifications] = useState("");
  const [features, setFeatures] = useState("");

  const [error, setError] = useState("");

  const handleError = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleChange = (e) => {
    setSelectedVariant((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeTS = () => {
    if (technicalSpecifications) {
      setSelectedVariant((prev) => {
        let arr = prev.technicalSpecifications;
        arr.push(technicalSpecifications);
        return { ...prev, technicalSpecifications: arr };
      });
      setTechnicalSpecifications("");
    }
  };

  const handleChangeF = () => {
    if (features) {
      setSelectedVariant((prev) => {
        let arr = prev.features;
        arr.push(features);
        return { ...prev, features: arr };
      });
      setFeatures("");
    }
  };

  const deleteFromTS = (name, el) => {
    setSelectedVariant((prev) => {
      let arr = prev[name];
      _.remove(arr, (ell) => ell === el);
      return { ...prev, [name]: arr };
    });
  };

  const updateVariantFetch = async () => {
    if (section1Ref && section1Ref.current) {
      section1Ref.current.scrollIntoView({ behavior: "smooth" });
    }
    const newSelectedVariant = { ...selectedVariant };
    delete newSelectedVariant._id;
    const everyElemetFilled = _.every(_.values(selectedVariant), (value) => {
      if (typeof value === "number") {
        return true;
      }
      return !_.isEmpty(value);
    });

    if (!everyElemetFilled) {
      handleError("Please fill all fields");
    } else {
      try {
        const response = await axios.put(
          `https://stocktrackerbackend.onrender.com/stockinfo/variant/${selectedProduct._id}/${selectedVariant._id}`,
          newSelectedVariant
        );

        if (response.status === 200) {
          handleMessage("Variant Updated Successfully.");
          setDialogTwoOpen(false);
        }
      } catch (error) {
        handleError(error.message);
        console.error(error);
      }
    }
  };

  // useEffect(() => {
  //   console.log(selectedVariant);
  // }, [selectedVariant]);

  return (
    !_.isEmpty(selectedVariant) && (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogTwoOpen}
        onClose={() => setDialogTwoOpen(false)}
      >
        <Box sx={{ maxHeight: "80vh", overflowY: "auto" }}>
          <DialogTitle ref={section1Ref} id="deneme">
            Edit Variant - {selectedProduct.name}
          </DialogTitle>
          <div
            className="updatevariantnotificationbox"
            style={
              error
                ? { backgroundColor: "#FFEDD5" }
                : { backgroundColor: "inherit" }
            }
          >
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

          <Divider></Divider>
          <div
            style={{
              display: "flex",
              padding: "0 2rem",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingBottom: "4rem",
              }}
            >
              <Box className={`createProductBox ${themeMode}`}>
                <TextField
                  className={`TextField ${themeMode}`}
                  sx={{ width: "50%", paddingRight: "1rem" }}
                  variant="outlined"
                  label="Color"
                  name="color"
                  value={selectedVariant.color}
                  onChange={handleChange}
                />
              </Box>
              <Box className={`createProductBox ${themeMode}`}>
                <TextField
                  className={`TextField ${themeMode}`}
                  sx={{ width: "50%", paddingRight: "1rem" }}
                  variant="outlined"
                  label="Size"
                  name="size"
                  value={selectedVariant.size}
                  onChange={handleChange}
                />
              </Box>
              <Box className={`createProductBox ${themeMode}`}>
                <TextField
                  className={`TextField ${themeMode}`}
                  sx={{ width: "50%", paddingRight: "1rem" }}
                  variant="outlined"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={selectedVariant.quantity}
                  onChange={handleChange}
                />
              </Box>
              <Box className={`createProductBox ${themeMode}`}>
                <TextField
                  className={`TextField ${themeMode}`}
                  sx={{ width: "50%", paddingRight: "1rem" }}
                  variant="outlined"
                  label="Price"
                  name="price"
                  type="number"
                  value={selectedVariant.price}
                  onChange={handleChange}
                />
              </Box>
              <Box className={`createProductBox ${themeMode}`}>
                <TextField
                  className={`TextField ${themeMode}`}
                  sx={{ width: "50%", paddingRight: "1rem" }}
                  variant="outlined"
                  label="Description"
                  name="description"
                  value={selectedVariant.description}
                  onChange={handleChange}
                />
              </Box>
              <Box className={`createProductBox ${themeMode}`}>
                <div style={{ display: "flex" }}>
                  <TextField
                    className={`TextField ${themeMode}`}
                    sx={{ flex: "1", paddingRight: "1rem" }}
                    variant="standard"
                    label="Technical Specifications"
                    name="technicalSpecifications"
                    value={technicalSpecifications}
                    onChange={(e) => setTechnicalSpecifications(e.target.value)}
                  />
                  <Button onClick={handleChangeTS} variant="contained">
                    Add
                  </Button>
                </div>
                {selectedVariant.technicalSpecifications.map((el, index) => (
                  <Box
                    key={el}
                    className={classes.hoverStyle}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontStyle: "italic" }}>
                      {index + 1} - {el}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        deleteFromTS("technicalSpecifications", el);
                      }}
                    >
                      <TiDeleteOutline></TiDeleteOutline>
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Box className={`createProductBox ${themeMode}`}>
                <div style={{ display: "flex" }}>
                  <TextField
                    className={`TextField ${themeMode}`}
                    sx={{ flex: "1", paddingRight: "1rem" }}
                    variant="standard"
                    label="Features"
                    name="features"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                  <Button onClick={handleChangeF} variant="contained">
                    Add
                  </Button>
                </div>
                {selectedVariant.features.map((el, index) => (
                  <Box
                    key={el}
                    className={classes.hoverStyle}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontStyle: "italic" }}>
                      {index + 1} - {el}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        deleteFromTS("features", el);
                      }}
                    >
                      <TiDeleteOutline></TiDeleteOutline>
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </div>
          </div>
        </Box>
        <Button onClick={updateVariantFetch}>Update Variant</Button>
      </Dialog>
    )
  );
}
