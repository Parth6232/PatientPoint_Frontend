import React from "react";
import Button from "./Button";
import Stack from "./Stack";
import Text from "./Text";
import SelectDateRange from "./SelectDateRange";
import { Plus } from "@phosphor-icons/react";

const PageHeader = (props) => {
  const {
    title,
    button,
    dropdownBtn,
    handleShowCalendar,
    dateText,
    showCalendar,
    handleDateChange,
    selectedDate,
    handleCloseCalendar,
    handleApplyDate,
  } = props;
  return (
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Text sx={{ fontSize: "18px", fontWeight: 550 }}>{title}</Text>

      <Stack direction="row" gap={2} alignItems="center">
        <SelectDateRange
          handleShowCalendar={handleShowCalendar}
          dateText={dateText}
          showCalendar={showCalendar}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          handleCloseCalendar={handleCloseCalendar}
          handleApplyDate={handleApplyDate}
        />

        {button ? (
          <Button
            sx={{ padding: "2px 10px", fontSize: "14px" }}
            btnName={"Add Customer"}
            leftIcon={<Plus size={15} />}
          />
        ) : null}
        {dropdownBtn ? <Text>button</Text> : null}
      </Stack>
    </Stack>
  );
};

export default PageHeader;
