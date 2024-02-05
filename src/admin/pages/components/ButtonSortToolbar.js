import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "tss-react/mui";

const defaultToolbarStyles = {
  iconButton: {},
};

const ButtonSortToolbar = ({ reverseData }) => {
  return (
    <Tooltip title="Sort STT">
      <IconButton onClick={reverseData}>
        <i className="fas fa-sort"></i>
      </IconButton>
    </Tooltip>
  );
};

export default withStyles(ButtonSortToolbar, defaultToolbarStyles, {
  name: "CustomToolbar",
});
