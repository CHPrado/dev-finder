import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";
import {
  RepoIcon,
  StarIcon,
  PeopleIcon,
  GitForkIcon,
  EyeIcon,
} from "@primer/octicons-react";

import { DevProps } from "../../../interfaces";
import useStyles from "./styles";

interface Props {
  dev: DevProps;
}

const Details: FC<Props> = ({ dev }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box width="100%">
        <Typography className={classes.value}>{dev.followers}</Typography>
        <Typography className={classes.value}>{dev.following}</Typography>
        <Typography className={classes.value}>{dev.public_repos}</Typography>
        <Typography className={classes.value}>{dev.stars}</Typography>
        <Typography className={classes.value}>{dev.watchers}</Typography>
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
  );
};

export default Details;
