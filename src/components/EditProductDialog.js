import * as React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Divider,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";

export default function EditProductDialog({
  open,
  handleClose,
  selectedProduct,
  categories,
  setSelectedProduct,
  handleMessage,
  handleError,
}) {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleChangeCategory = (e) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleChangeName = (e) => {
    setSelectedProduct((prev) => {
      prev.name = e.target.value;
      return { ...prev };
    });
  };

  const updateProductFetch = async () => {
    try {
      const resp = await axios.put(
        `https://stocktrackerbackend.onrender.com/stockinfo/${selectedProduct._id}`,
        { name: selectedProduct.name, category: selectedCategory }
      );
      console.log(resp);
      handleMessage(resp.data.message);
    } catch (error) {
      handleError(error.response.data.message);
    }
  };

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Product - {selectedProduct.name}</DialogTitle>
        <Divider></Divider>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <Typography>Name</Typography>
          <TextField
            value={selectedProduct.name}
            sx={{ marginBottom: "1rem" }}
            id="name"
            onChange={handleChangeName}
          ></TextField>
          <Typography>Category</Typography>
          <Select
            name="category"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.length > 0 &&
              categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              updateProductFetch();
              handleClose();
            }}
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
