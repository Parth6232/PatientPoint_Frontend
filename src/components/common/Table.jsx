import PropTypes from "prop-types";

import { Box, useTheme } from "@mui/material";
import Loader from "./Loader";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const {
    isLoading,
    dataComponent,
    sx,
    search,
    handleTableSearch,
    handleClearSearch,
    searchPlaceHolder,
    onDownload,
    onFilter,
    showHeader,
    header,
    subHeader,
    errorCount,
    subHeaderList,
    showDownloadBtn,
    showFilterBtn,
    subHeaderListOnChange,
    isFilteredApplied,
    editIcon,
    handleEditDialog,
    stockApprovalData,
    activeColumns,
    userRole,
    showFilterButton,
    renderCustomLeftElement,
    showSearchField,
    showExportCsv = false,
    onExportCsv,
    enableBackgroundColor = true,
    showSortBtn,
    isSortingApplied,
    handleSortFilter,
    showSortFilter,
    handleOpenSortFilter,
  } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "160px",
        borderBottomRadius: "none",
        [theme.breakpoints.up("md")]: {
          width: "100%",
        },
        [theme.breakpoints.down("sm")]: {
          maxWidth: "500px",
          width: "100%",
        },
        ...sx,
      }}
    >
      {isLoading ? (
        <Loader loading position="absolute" />
      ) : (
        <>
          {showHeader && (
            <TableHeader
              search={search}
              handleTableSearch={handleTableSearch}
              handleClearSearch={handleClearSearch}
              searchPlaceHolder={searchPlaceHolder}
              onDownload={onDownload}
              onFilter={onFilter}
              header={header}
              subHeader={subHeader}
              errorCount={errorCount}
              subHeaderList={subHeaderList}
              showDownloadBtn={showDownloadBtn}
              showFilterBtn={showFilterBtn}
              subHeaderListOnChange={subHeaderListOnChange}
              isFilteredApplied={isFilteredApplied}
              editIcon={editIcon}
              handleEditDialog={handleEditDialog}
              stockApprovalData={stockApprovalData}
              activeColumns={activeColumns}
              userRole={userRole}
              showFilterButton={showFilterButton}
              renderCustomLeftElement={renderCustomLeftElement}
              showSearchField={showSearchField}
              showExportCsv={showExportCsv}
              onExportCsv={onExportCsv}
              enableBackgroundColor={enableBackgroundColor}
              showSortBtn={showSortBtn}
              isSortingApplied={isSortingApplied}
              handleSortFilter={handleSortFilter}
              showSortFilter={showSortFilter}
              handleOpenSortFilter={handleOpenSortFilter}
            />
          )}

          {dataComponent()}
        </>
      )}
    </Box>
  );
};

Table.defaultProps = {
  image: "/assets/images/data_not_found_icon_inverse.svg",
  message: "No Data Available.",
  dataNotFoundSx: {},
};

Table.propTypes = {
  image: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isCalled: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  dataComponent: PropTypes.func.isRequired,
  dataNotFoundSx: PropTypes.shape({}),
  sx: PropTypes.shape({}),
};

export default Table;
