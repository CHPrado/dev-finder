import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { CachedOutlined } from "@material-ui/icons";
import { LocationIcon } from "@primer/octicons-react";

import { Header, Snackbar } from "../../components";
import { SnackbarProps, DevRouteProps } from "../../interfaces";
import { githubApi } from "../../services";
import { Details } from "./Details";
import { Languages } from "./Languages";
import { Notes } from "./Notes";
import useStyles from "./styles";

const Dev: FC<DevRouteProps> = (props) => {
  const classes = useStyles();
  const [dev, setDev] = useState(props.location.state.dev);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps>({});

  const handleRefresh = () => {
    setIsLoading(true);
    githubApi
      .getDev(dev.username)
      .then((resp) => {
        setDev(resp);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message:
            "There was an error trying to refresh the data. Please, try again.",
          type: "error",
          onClose: () => setSnackbar({ open: false }),
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box className={classes.root}>
      <Header />

      {isLoading ? (
        <Box className={classes.loadingBox}>
          <CircularProgress size="100px" />
        </Box>
      ) : (
        <Box className={classes.container}>
          <Card variant="outlined" className={classes.card}>
            <Box className={classes.titleBox}>
              <Link
                className={classes.link}
                to={(location) => ({
                  ...location,
                  pathname: `http://www.github.com/${dev.username}`,
                })}
                target="_blank"
              >
                <Typography className={classes.name}>
                  {`${dev.username}'s profile`}
                </Typography>
              </Link>

              <Box display="flex">
                <Tooltip title="Refresh">
                  <IconButton onClick={handleRefresh}>
                    <CachedOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box className={classes.avatarBox}>
              <img
                src={dev.avatar_url}
                alt="avatar"
                className={classes.avatar}
              />

              <Box className={classes.infoBox}>
                <Typography className={classes.info}>{dev.name}</Typography>
                {dev.location && (
                  <Typography className={classes.info}>
                    <LocationIcon size={18} className={classes.icon} />
                    {dev.location}
                  </Typography>
                )}
                <Typography color="textSecondary" align="justify">
                  {dev.bio}
                </Typography>
              </Box>
            </Box>

            <Box className={classes.detailsBox}>
              <Details dev={dev} />
              <Languages languages={dev.languages} />
            </Box>

            <Notes
              dev={dev}
              setIsLoading={setIsLoading}
              setSnackbar={setSnackbar}
              setDev={setDev}
            />
          </Card>
        </Box>
      )}

      <Snackbar {...snackbar} />
    </Box>
  );
};

export default Dev;
