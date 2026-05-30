import React, { memo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "./Stack";
import Button from "./Button";
import { Menu, MenuItem } from "@mui/material";
import { CaretDown } from "@phosphor-icons/react";
import Text from "@components/common/Text";

const Paginations = (props) => {
  const {
    currentPage,
    onPageChange,
    totalPages,
    rowsPerPageCount,
    totalRows,
    currentRows,
    handleRowsPerPageClick,
    handleRowsPerPageChange,
    anchorEl,
    handleClose,
    ...restProps
  } = props;

  const sxStyles = {
    container: {
      backgroundColor: "#FFFFFF",
      padding: "5px 14px",
      alignItems: "center",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
      border: "1px solid #EAECF0",
    },
    text: {
      "&::selection": { backgroundColor: "transparent !important" },
      color: "#667085",
    },
    pagination: {
      "& .MuiPagination-ul": {
        flexWrap: "nowrap",
        "& .Mui-selected": {
          backgroundColor: "black",
          color: "white",
        },
        "& li:first-of-type button": {
          ":after": {
            content: '"Previous"',
            padding: "4px 10px",
            borderRadius: "8px",
            color: "#667085",
            border: "1px solid #D0D5DD",
          },
        },
        "& li:last-of-type button": {
          ":before": {
            content: '"Next"',
            padding: "4px 10px",
            borderRadius: "8px",
            color: "#667085",
            border: "1px solid #D0D5DD",
          },
        },
      },
    },
    button: {
      backgroundColor: "#FFFFFF",
      color: "#454545",
      boxShadow: "none",
      border: "0.0625rem solid #D6D6D6",
      padding: "2px 10px",
      textTransform: "none",
      fontSize: "14px",
      "&:hover": {
        boxShadow: "none",
      },
    },
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "5px 14px",
        alignItems: "center",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        border: "1px solid #EAECF0",
      }}
    >
      <Text
        sx={{
          "&::selection": { backgroundColor: "transparent !important" },
          color: "#667085",
        }}
      >
        {currentPage} - {currentRows.length} of {totalRows.length} rows
      </Text>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        {...restProps}
        sx={{
          "& .MuiPagination-ul": {
            "& .css-8uzxat-MuiSvgIcon-root-MuiPaginationItem-icon": {
              display: "none",
            },
            "& .css-1l5xwdx-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
              {
                backgroundColor: "black",
                color: "white",
              },
            flexWrap: "nowrap",
            "& li:first-of-type": {
              flexBasis: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              "& > button": {
                ":after": {
                  content: '"Previous"',
                  padding: "4px 10px",
                  borderRadius: "8px",
                  color: "#667085",
                  border: "1px solid #D0D5DD",
                },
              },
            },
            "& li:last-of-type": {
              flexBasis: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              "& > button": {
                ":before": {
                  padding: "4px 10px",
                  content: '"Next"',
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  color: "#667085",
                },
              },
            },
          },
        }}
      />

      <Stack>
        <Button
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#454545",
            boxShadow: "none",
            border: "0.0625rem solid #D6D6D6",
            padding: "2px 10px",
            letterSpacing: "0px",
            "&:hover": {
              boxShadow: "none",
            },
            textTransform: "none",
            fontSize: "14px",
          }}
          onClick={handleRowsPerPageClick}
          btnName={`${rowsPerPageCount} per page`}
          rightIcon={<CaretDown size={16} />}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {[5,10, 20].map((rows) => (
            <MenuItem
              key={rows}
              selected={rowsPerPageCount == rows}
              onClick={() => handleRowsPerPageChange(rows)}
            >
              {rows}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};

export default memo(Paginations);
