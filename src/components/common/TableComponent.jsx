import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import { deepmerge } from "@mui/utils";

const TableComponent = (props) => {
  const {
    rows = [],
    columns,
    rowCount,
    apiRef,
    autoHeight,
    columnHeaderHeight,
    columnVisibilityModel,
    checkboxSelection,
    columnGroupingModel,

    disableColumnFilter,
    disableColumnMenu,
    disableColumnSelector,
    disableDensitySelector,
    disableRowSelectionOnClick,
    disableVirtualization,

    getRowId,
    getCellClassName,
    getRowClassName,
    hideFooter,
    loading,

    onRowSelectionModelChange,
    rowSelectionModel,
    pageSizeOptions,
    paginationMode,
    paginationModel,
    onPaginationModelChange,

    rowHeight,
    sortingMode,
    sortModel,
    onSortModelChange,
    sx,
    hideFooterPagination = true,

    showColumnVerticalBorder,
    showCellVerticalBorder,
    isRowSelectable,
    onCellEditCommit,
  } = props;

  const _sx = deepmerge(
    {
      "&.MuiDataGrid-root": {
        fontWeight: "light",
        borderRadius: `8px`,
        overflow: "hidden",
        backgroundColor: "#ffffff",

        " .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },

        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#fcfcfc",
          width: "100%",
          maxWidth: "100%",
          color: "#4E575F",

          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-checkboxInput": {
            color: "grey",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "grey",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.8125rem",
            fontWeight: 500,
          },
        },

        "& .MuiDataGrid-row": {
          backgroundColor: "#FFFFFF",
          "&.even_row": {},
          "&.odd_row": {
            // backgroundColor: '#F1F1F1',
          },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "#EAECF0",
          },
        },

        "& .MuiDataGrid-footerContainer": {
          minHeight: 46,
          height: 46,
          backgroundColor: "#ffffff",
          borderWidth: 0,
          display: "none",
        },
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          height: "2px",
        },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
          backgroundColor: "#024990",
          borderRadius: "20px",
        },
        "& .MuiDataGrid-cell": {
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          textAlign: "center", // Centers text within cell
        },
      },
    },
    sx
  );

  return (
    <DataGrid
      getRowId={getRowId}
      autoHeight={autoHeight}
      rows={rows}
      columns={columns.map((column) => ({ ...column, sortable: false }))}
      apiRef={apiRef}
      rowCount={rowCount}
      columnHeaderHeight={columnHeaderHeight}
      columnVisibilityModel={columnVisibilityModel}
      checkboxSelection={checkboxSelection}
      disableColumnFilter={disableColumnFilter}
      disableColumnMenu={disableColumnMenu}
      disableColumnSelector={disableColumnSelector}
      disableDensitySelector={disableDensitySelector}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      disableVirtualization={disableVirtualization}
      getCellClassName={getCellClassName}
      getRowClassName={getRowClassName}
      hideFooter={hideFooter}
      loading={loading}
      hideFooterPagination={hideFooterPagination}
      onRowSelectionModelChange={onRowSelectionModelChange}
      rowSelectionModel={rowSelectionModel}
      pageSizeOptions={pageSizeOptions}
      paginationMode={paginationMode}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      rowHeight={rowHeight}
      sortingMode={sortingMode}
      sortModel={sortModel}
      onSortModelChange={onSortModelChange}
      sx={_sx}
      slots={{
        loadingOverlay: LinearProgress,
      }}
      localeText={{ noRowsLabel: "No Data Available" }}
      showColumnVerticalBorder={showColumnVerticalBorder}
      showCellVerticalBorder={showCellVerticalBorder}
      isRowSelectable={isRowSelectable}
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={columnGroupingModel}
      onCellEditCommit={onCellEditCommit}
    />
  );
};

TableComponent.defaultProps = {
  rowCount: null,
  columnHeaderHeight: 46,
  columnVisibilityModel: {
    id: false,
  },
  checkboxSelection: false,
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableColumnSelector: true,
  disableDensitySelector: true,
  disableRowSelectionOnClick: true,
  disableVirtualization: true,
  getRowClassName: (params) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? "even_row" : "odd_row",
  hideFooter: false,
  paginationMode: "client",
  paginationModel: { page: 0, perPage: 10 },
  pageSizeOptions: [10, 25, 50, 100],
  rowHeight: 36,
  sortingMode: "client",
  getRowId: (row) => {
    return row.id;
  },
  hideFooterPagination: false,
};

TableComponent.propTypes = {
  autoHeight: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  columnGroupingModel: PropTypes.array,
  rowCount: PropTypes.number,
  columnHeaderHeight: PropTypes.number,
  columnVisibilityModel: PropTypes.shape({}),
  checkboxSelection: PropTypes.bool,
  disableColumnFilter: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,
  disableColumnSelector: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableRowSelectionOnClick: PropTypes.bool,
  disableVirtualization: PropTypes.bool,
  getCellClassName: PropTypes.func,
  getRowClassName: PropTypes.func,
  hideFooter: PropTypes.bool,
  loading: PropTypes.bool,

  onRowSelectionModelChange: PropTypes.func,
  pageSizeOptions: PropTypes.array,
  paginationMode: PropTypes.oneOf(["client", "server"]),
  paginationModel: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
  }),
  onPaginationModelChange: PropTypes.func,
  rowHeight: PropTypes.number,
  sortingMode: PropTypes.oneOf(["client", "server"]),
  sortModel: PropTypes.array,
  onSortModelChange: PropTypes.func,
  sx: PropTypes.shape({}),
  getRowId: PropTypes.func,
  hideFooterPagination: PropTypes.bool,

  showColumnVerticalBorder: PropTypes.bool,
  showCellVerticalBorder: PropTypes.bool,
  onCellEditCommit: PropTypes.func,
};

export default TableComponent;
