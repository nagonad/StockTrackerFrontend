import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Divider,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

export default function EditProductDialog({
  open,
  handleClose,
  selectedProduct,
  categories,
}) {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth="true"
        open={open}
        onClose={handleClose}
        sx={{ height: "600px" }}
      >
        <DialogTitle>Edit Product - {selectedProduct.name}</DialogTitle>
        <Divider></Divider>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <TextField
            value={selectedProduct.name}
            sx={{ marginBottom: "1rem" }}
            label="Name"
          ></TextField>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Age"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem sx={{ display: "block" }} value={10}>
              Ten
            </MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update Product</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
