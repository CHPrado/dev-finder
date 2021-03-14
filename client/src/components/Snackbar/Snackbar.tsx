import React, { FC } from "react";

import { Snackbar as MaterialSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { SnackbarProps } from "../../interfaces";

const Snackbar: FC<SnackbarProps> = ({
  open,
  message,
  type = "success",
  onClose,
}) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    onClose && onClose();
  };

  if (!open) return <></>;

  return (
    <MaterialSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={type}
        onClose={handleClose}
      >
        {message}
      </MuiAlert>
    </MaterialSnackbar>
  );
};

export default Snackbar;
