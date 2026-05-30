import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

const CustomTabs = ({ tabs, tabContents, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable" 
        scrollButtons={isMobile ? "auto" : "false"} 
        allowScrollButtonsMobile 
        sx={{
          width: "100%",
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTabs-scrollButtons": {
            width: 40,
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {tab.icon && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: tab.color,
                      marginRight: 1,
                    }}
                  />
                )}
                <Box sx={{ marginRight: 1 }}>{tab.label}</Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 20,
                    height: 20,
                    padding: "0 6px",
                    borderRadius: "50%",
                    // backgroundColor: "#f0f0f0",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#000",
                    lineHeight: 1,
                  }}
                >
                  {tab.count}
                </Box>
              </Box>
            }
            sx={{
              textTransform: "none",
              backgroundColor: "#f2f2f2",
              color: "#000",
              fontWeight: 400,
              fontSize: "0.875rem",
              whiteSpace: "nowrap", 
              padding: "10px",
              borderRadius: "5px",
              margin: "0 8px",
              // "&:hover": {
              //   backgroundColor: "#e0e0e0",
              // },
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: selectedTab === index ? "#000" : "transparent",
              },
            }}
          />
        ))}
      </Tabs>

      {/* Render corresponding tab content */}
      <Box mt={2}>{tabContents[selectedTab]}</Box>
    </Box>
  );
};

export default CustomTabs;
