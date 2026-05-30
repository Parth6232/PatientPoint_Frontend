import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Stack from "./Stack";
import Text from "./Text";
import { createStyles, makeStyles } from "@mui/styles";

const SelectDateRange = (props) => {
  const {
    handleShowCalendar,
    dateText,
    showCalendar,
    handleDateChange,
    joiningDate,
    handleCloseCalendar,
    width = '400px',
    height = '35px',
  } = props;

  const classes = useStyles();

//   const handleDateChangeAndClose = (item) => {
//  handleDateChange(item)// Pass the selection to handleDateChange
//         handleCloseCalendar(); // Close the calendar
//   };

  return (
    <>
      <Stack sx={{ position: "relative", zIndex: 999 }}>
        <Stack
          onClick={() => handleShowCalendar()}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: "1px solid #DFDFDF",
            width: width,
            height: height,
            padding: "5px 10px",
            backgroundColor: "#ffff",
            cursor: "pointer",
            borderRadius: '12px !important',
          }}
        >
          <Text
            ml={1}
            fontSize={"12px"}
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '15px',
              letterSpacing: '0%',
              color: '#8D8D8D'
            }}
          >
            {dateText || "Select Joining Date"}
          </Text>
          <img style={{ width: '20px' }} src="/assest/calendar-03.svg" />
        </Stack>
        {showCalendar ? (
          <Stack
            sx={{
              position: "absolute",
              mt: "46px",
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              overflow: "hidden",
              borderTop: "none",
              width: "max-content",
              right: "5px",
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}  // Handle the date change and close the calendar
              moveRangeOnFirstSelection={false}
              ranges={[{ startDate: joiningDate || new Date(), endDate: joiningDate || new Date(), key: 'selection' }]}  // Use a single date
              minDate={new Date()}  // Disable all past dates
              className={classes.selectDateRangeCss}
              rangeColors={["#00A651"]}
            />
          </Stack>
        ) : null}
      </Stack>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    selectDateRangeCss: {
      "& .rdrDateDisplayWrapper": {
        display: "none",
      },
      "& .rdrMonth": {
        width: "auto",
        paddingBottom: "0px",
      },
      marginBottom: "10px",
      width: "max-content",
    },
  })
);

export default SelectDateRange;
