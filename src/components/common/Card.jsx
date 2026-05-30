import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Cards = ({
  cardData,
  onCardClick,
  sx,
  width = "calc(33.33% - 10px)",
  height = "auto",
}) => {
  const cardTitle = cardData.label || "";

  const getRightContent = () => {
    if (cardData.value !== undefined) return cardData.value;
    if (cardData.percentage !== undefined) return `${cardData.percentage} %`;
    if (cardData.starsCount !== undefined)
      return `${cardData.starsCount} stars`;
    return "";
  };

  const rightContent = getRightContent();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        width: width,
        backgroundColor: "#FFFFFF",
        height: height,
        ...sx,
      }}
      onClick={onCardClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E8F5E9",
          borderRadius: "8px",
          width: "40px",
          height: "40px",
          marginRight: "16px",
        }}
      >
        {cardData.leftIcon && (
          <img
            src={cardData.leftIcon}
            alt="left icon"
            style={{ maxWidth: "100%", height: "24px", width: "auto" }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontWeight={500} fontSize="0.875rem" color="textSecondary">
          {cardTitle}
        </Typography>
        <Typography fontWeight={600} fontSize="1.25rem">
          {rightContent}
        </Typography>
      </Box>
    </Box>
  );
};

Cards.propTypes = {
  cardData: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    percentage: PropTypes.number,
    starsCount: PropTypes.number,
    leftIcon: PropTypes.string,
  }).isRequired,
  onCardClick: PropTypes.func,
  sx: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default React.memo(Cards);
