import { InputAdornment } from "@mui/material";
import Stack from "components/common/Stack";
import Text from "components/common/Text";
import TextField from "components/common/TextField";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Button from "components/common/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "./IconButton";
import {
  ArrowsDownUp,
  FadersHorizontal,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { createStyles, makeStyles } from "@mui/styles";

const TableHeader = ({
  search,
  handleTableSearch,
  handleClearSearch,
  searchPlaceHolder,
  onDownload,
  onFilter,
  errorCount,
  subHeader,
  showFilterBtn,
  showDownloadBtn,
  isFilteredApplied,
  renderCustomLeftElement,
  showSearchField = false,
  showExportCsv = false,
  onExportCsv,
  enableBackgroundColor,
  showSortBtn,
  isSortingApplied,
  handleSortFilter,
  showSortFilter,
  handleOpenSortFilter,
}) => {

  const classes = useStyles();

  return (
    <Stack
      sx={{
        paddingBottom: 1,
        paddingTop: 1,
        backgroundColor: enableBackgroundColor ? "#FFF" : "transparent",
        border: enableBackgroundColor ? `0.0625rem solid #EBEDEF` : "0rem",
        borderRadius: "0.5rem 0.5rem 0rem 0rem ",
        borderBottom: 0,
      }}
    >
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {renderCustomLeftElement ? (
            renderCustomLeftElement()
          ) : (
            <Stack direction="row" alignItems="center">
              {subHeader && <Text color="#000D08">{subHeader}</Text>}
            </Stack>
          )}

          <Stack flexDirection="row" alignItems="center" gap="0.625rem">
            {showSearchField && (
              <TextField
                fullWidth="false"
                type="text"
                value={search}
                onChange={(e) => {
                  handleTableSearch(e.target.value);
                }}
                placeholder={searchPlaceHolder}
                size="small"
                sx={{
                  // width: 500,
                  backgroundColor: "#ffffff",
                  borderRadius: "0.5rem",
                  "& .MuiInputBase-input": {
                    paddingTop: "0.3125rem", // reduce top padding
                    paddingBottom: "0.3125rem", // reduce bottom padding
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.5rem",
                    paddingLeft: "0.625rem",
                    padding: "0.25rem 0rem 0.125rem 0.3125rem",
                    alignItems: "flex-start",
                  },
                  "& input::placeholder": {
                    fontSize: "0.875rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment sx={{ p: 1 }}>
                      <MagnifyingGlass size={18} />
                    </InputAdornment>
                  ),
                  endAdornment: search ? (
                    <InputAdornment
                      onClick={handleClearSearch}
                      style={{ cursor: "pointer" }}
                    >
                      <CloseIcon />
                    </InputAdornment>
                  ) : null,
                }}
              />
            )}

            {showExportCsv && (
              <Button
                variant="outlined"
                sx={{
                  padding: "0.25rem 0.625rem",
                  border: "0.0625rem solid #E3F2FA",
                  borderRadius: "0.375rem",
                  color: "#004A91",
                  fontWeight: 500,
                }}
                onClick={onExportCsv}
                endIcon={<FileDownloadOutlinedIcon />}
              >
                <Text fontSize={"0.75rem"} fontWeight={500}>
                  Export CSV
                </Text>
              </Button>
            )}

            {showDownloadBtn ? (
              <>
                <IconButton onClick={onDownload}>
                  <img
                    src="/images/actions/downloadButtonIcon.svg"
                    alt="downloadIcon"
                  />
                </IconButton>
              </>
            ) : null}

            {showSortBtn ? (
              <>
                <div style={{ position: "relative" }}>
                  {" "}
                  {/* Added relative positioning */}
                  {isSortingApplied ? (
                    <span className={classes.filterAppliedCss}></span>
                  ) : null}
                  <IconButton
                    onClick={handleOpenSortFilter}
                    className={classes.filterbuttonStyle}
                    sx={{ backgroundColor: "red" }}
                  >
                    <ArrowsDownUp size={20} />
                  </IconButton>
                  {showSortFilter ? (
                    <>
                      <Stack className={classes.sortingWrapper}>
                        <Text
                          className={classes.sortingContent}
                          onClick={() => handleSortFilter("az")}
                        >
                          A-Z
                        </Text>
                        <Text
                          className={classes.sortingContent}
                          onClick={() => handleSortFilter("za")}
                        >
                          Z-A
                        </Text>
                        <Text
                          className={classes.sortingContent}
                          onClick={() => handleSortFilter("latest")}
                        >
                          Latest to old
                        </Text>
                        <Text
                          className={classes.sortingContent}
                          onClick={() => handleSortFilter("old")}
                        >
                          Old to latest
                        </Text>
                      </Stack>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}

            {showFilterBtn ? (
              <>
                {isFilteredApplied ? (
                  <span className={classes.filterAppliedCss}></span>
                ) : null}
                <IconButton
                  onClick={onFilter}
                  className={classes.filterbuttonStyle}
                >
                  <FadersHorizontal size={20} />
                </IconButton>
              </>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      {errorCount ? (
        <Stack flexDirection="row" alignItems="center">
          <WarningAmberRoundedIcon style={{ color: "#F04438", fontSize: 20 }} />
          <Text color="#F04438" variant="small">
            Error
          </Text>
        </Stack>
      ) : null}
    </Stack>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    sortingContent: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F9F9F9",
        fontSize: "14.5px",
      },
      color: "#2B2B2B",
      padding: "0.4rem 0.8rem",
    },
    sortingWrapper: {
      backgroundColor: "#FFFFFF",
      position: "absolute",
      right: "1px",
      zIndex: "1",
      top: "50px",
      boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
      width: "180px",
      borderRadius: "0.5rem",
    },
    filterAppliedCss: {
      backgroundColor: "red",
      width: "0.625rem",
      height: "0.625rem",
      borderRadius: "50%",
      position: "absolute",
      right: "1.375rem",
      zIndex: "1",
      top: "1.5625rem",
    },
    filterbuttonStyle: {
      border: "0.0625rem solid #EDEDED !important",
      borderRadius: "0.5rem !important",
      backgroundColor: "#FFFFFF !important",
    },
  })
);

export default TableHeader;
