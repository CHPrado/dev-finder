import React, { ChangeEvent, FC, useState } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps, Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { CachedOutlined, EditOutlined } from "@material-ui/icons";
import {
  RepoIcon,
  StarIcon,
  LocationIcon,
  PeopleIcon,
  GitForkIcon,
  EyeIcon,
} from "@primer/octicons-react";

import { Header, Snackbar } from "../../components";
import { DevProps, SnackbarProps } from "../../interfaces";
import { devsApi, githubApi } from "../../services";
import useStyles from "./styles";

interface StateProps {
  dev: DevProps;
}

const Dev: FC<RouteComponentProps<{}, StaticContext, StateProps>> = (props) => {
  const classes = useStyles();
  const [dev, setDev] = useState(props.location.state.dev);
  const [notes, setNotes] = useState(dev.notes);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps>();
  const [edit, setEdit] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    githubApi
      .getDev(dev.login)
      .then((resp) => {
        setDev(resp);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message:
            "There was an error trying to refresh the data. Please, try again.",
          type: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

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
              <Box className={classes.valuesBox}>
                <Box width="100%">
                  <Typography className={classes.value}>
                    {dev.followers}
                  </Typography>
                  <Typography className={classes.value}>
                    {dev.following}
                  </Typography>
                  <Typography className={classes.value}>
                    {dev.public_repos}
                  </Typography>
                  <Typography className={classes.value}>{dev.stars}</Typography>
                  <Typography className={classes.value}>
                    {dev.watchers}
                  </Typography>
                  <Typography className={classes.value}>{dev.forks}</Typography>
                </Box>

                <Box display="flex" flexDirection="column" width="100%">
                  <Link
                    className={classes.link}
                    to={(location) => ({
                      ...location,
                      pathname: `http://www.github.com/${dev.username}?tab=followers`,
                    })}
                    target="_blank"
                  >
                    <Typography className={classes.text}>
                      <PeopleIcon size={16} className={classes.icon} />
                      followers
                    </Typography>
                  </Link>
                  <Link
                    className={classes.link}
                    to={(location) => ({
                      ...location,
                      pathname: `http://www.github.com/${dev.username}?tab=following`,
                    })}
                    target="_blank"
                  >
                    <Typography className={classes.text}>
                      <PeopleIcon size={16} className={classes.icon} />
                      following
                    </Typography>
                  </Link>
                  <Link
                    className={classes.link}
                    to={(location) => ({
                      ...location,
                      pathname: `http://www.github.com/${dev.username}?tab=repositories`,
                    })}
                    target="_blank"
                  >
                    <Typography className={classes.text}>
                      <RepoIcon size={16} className={classes.icon} />
                      public repositories
                    </Typography>
                  </Link>
                  <Link
                    className={classes.link}
                    to={(location) => ({
                      ...location,
                      pathname: `http://www.github.com/${dev.username}?tab=stars`,
                    })}
                    target="_blank"
                  >
                    <Typography className={classes.text}>
                      <StarIcon size={16} className={classes.icon} />
                      stars
                    </Typography>
                  </Link>
                  <Typography className={classes.text}>
                    <EyeIcon size={16} className={classes.icon} />
                    watchers
                  </Typography>
                  <Typography className={classes.text}>
                    <GitForkIcon size={16} className={classes.icon} />
                    forks
                  </Typography>
                </Box>
              </Box>

              <Box mt={{ xs: 4, sm: 0 }}>
                {dev.languages.map((language) => (
                  <Box key={language.name} className={classes.languagesBox}>
                    <Box width="100%">
                      <Typography className={classes.language}>
                        {language.name}
                      </Typography>
                    </Box>
                    <Box width="100%">
                      <Typography className={classes.percent}>
                        {language.percent}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box width="100%">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography className={classes.value}>Notes</Typography>
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
                    Salvar
                  </Button>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      )}

      <Snackbar {...snackbar} />
    </Box>
  );
};

export default Dev;
