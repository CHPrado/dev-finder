import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import githubLogo from "../../assets/githubLogo2.png";
import { Header, Snackbar } from "../../components";
import { SnackbarProps } from "../../interfaces";
import { githubApi } from "../../services";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleKeyPress = (key: KeyboardEvent<HTMLDivElement>) => {
    if (key.code === "Enter") handleSearch();
  };

  const handleSearch = () => {
    setIsLoading(true);

    githubApi
      .getDev(username)
      .then((resp) => {
        history.push({ pathname: "/dev", state: { dev: resp } });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "We couldn't find a dev with this username.",
          type: "error",
          onClose: () => setSnackbar({ open: false }),
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box className={classes.root}>
      <Header />

      <Box className={classes.content}>
        {isLoading ? (
          <CircularProgress size="100px" />
        ) : (
          <>
            <img src={githubLogo} alt="avatar" className={classes.logo} />

            <TextField
              value={username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              label="Username"
              variant="outlined"
              placeholder="coolest-dev"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">github.com/</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleSearch}>
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      </Box>

      <Snackbar {...snackbar} />
    </Box>
  );
};

export default Home;
