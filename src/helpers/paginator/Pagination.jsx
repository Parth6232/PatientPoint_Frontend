import React from "react";
import "./Pagination.css";
import Text from "@components/common/Text";
import { Box } from "@mui/material";

const Pagination = ({ setPage, currentPage, totalRecords, recordsPerPage, disabled = false }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "10px",
      }}
    >
      {/* First & Previous Page Buttons */}
      <Box>
        <button style={{ border: 'none',background:"#FFFFFF"}} onClick={() => setPage(1)} disabled={disabled || currentPage === 1}>
          <img src="/assest/leftArrow.png" alt="First" style={{ width: "34px" }} />
        </button>

        <button  style={{ border: 'none',background:"#FFFFFF"}}  onClick={() => setPage(currentPage - 1)} disabled={disabled || currentPage === 1}>
          <img src="/assest/singleLeftArrow.png" alt="Previous" style={{ width: "34px" }} />
        </button>
      </Box>

      {/* Page Number Display */}
      <Text
        sx={{
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22.86px",
          color: "#000000",
        }}
      >
        Page: {currentPage} / {totalPages}
      </Text>

      {/* Next & Last Page Buttons */}
      <Box>
        <button  style={{ border: 'none',background:"#FFFFFF"}}  onClick={() => setPage(currentPage + 1)} disabled={disabled || currentPage === totalPages}>
          <img src="/assest/singleRightArrow.png" alt="Next" style={{ width: "34px" }} />
        </button>

        <button  style={{ border: 'none', background:"#FFFFFF"}}  onClick={() => setPage(totalPages)} disabled={disabled || currentPage === totalPages}>
          <img src="/assest/rightArrow.png" alt="Last" style={{ width: "34px" }} />
        </button>
      </Box>
    </Box>
  );
};

export default Pagination;
