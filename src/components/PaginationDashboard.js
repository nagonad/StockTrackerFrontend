// PaginationDashboard.js

import React from "react";
import { Button } from "@mui/material";
import {
  NavigateBefore as PreviousIcon,
  NavigateNext as NextIcon,
} from "@material-ui/icons";

const PaginationDashboard = ({
  page,
  setPage,
  totalPages,
  closeDropdowns,
  themeMode,
}) => {
  const handleNext = () => {
    closeDropdowns();
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    closeDropdowns();
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <Button
        startIcon={<PreviousIcon />}
        onClick={handlePrevious}
        disabled={page === 0}
        style={{
          backgroundColor: themeMode === "dark" ? "black" : "",
          color: themeMode === "dark" ? "white" : "",
        }}
      >
        Previous
      </Button>
      <Button
        endIcon={<NextIcon />}
        onClick={handleNext}
        disabled={page === totalPages - 1}
        style={{
          backgroundColor: themeMode === "dark" ? "black" : "",
          color: themeMode === "dark" ? "white" : "",
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationDashboard;
