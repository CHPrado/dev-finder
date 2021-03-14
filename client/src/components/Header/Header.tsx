import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";
import { GitBranchIcon } from "@primer/octicons-react";

import githubLogo from "../../assets/githubLogo.png";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Link to="/" className={classes.link}>
        <Typography variant="h4" className={classes.title}>
          <img src={githubLogo} alt="avatar" className={classes.logo} />
          lookingforDev
          <GitBranchIcon size={40} />
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
