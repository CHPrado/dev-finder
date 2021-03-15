import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";

import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";

import { DevProps, SnackbarProps } from "../../../interfaces";
import { devsApi } from "../../../services";
import useStyles from "./styles";

interface Props {
  dev: DevProps;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSnackbar: Dispatch<SetStateAction<SnackbarProps>>;
  setDev: Dispatch<SetStateAction<DevProps>>;
}

const Notes: FC<Props> = ({ dev, setIsLoading, setSnackbar, setDev }) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [notes, setNotes] = useState(dev.notes);

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  const handleCancel = () => {
    setNotes(dev.notes || "");
    setEdit(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    devsApi
      .save(dev.username, notes)
      .then((resp) => {
        setDev({ ...dev, notes });
        setSnackbar({
          open: true,
          message: resp?.data?.message || "Notes saved!",
          type: "success",
          onClose: () => setSnackbar({ open: false }),
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "There was an error to save the notes. Please, try again.",
          type: "error",
          onClose: () => setSnackbar({ open: false }),
        });
      })
      .finally(() => {
        setIsLoading(false);
        setEdit(false);
      });
  };

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="textSecondary" variant="h6">
          Notes
        </Typography>
        {!edit && (
          <Tooltip title="Edit note">
            <IconButton onClick={handleClickEdit}>
              <EditOutlined />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <TextField
        placeholder={`Add notes about ${dev.name || dev.login}`}
        value={notes}
        onChange={handleChange}
        className={classes.notes}
        variant="outlined"
        multiline
        disabled={!edit}
        rows={5}
        fullWidth
      />
      {edit && (
        <Box className={classes.buttonsBox}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            SAVE
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Notes;
