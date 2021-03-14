import React, { FC } from "react";

import { Box, Typography } from "@material-ui/core";

import { DevProps } from "../../../interfaces";
import useStyles from "./styles";

interface Props {
  languages: DevProps["languages"];
}

const Languages: FC<Props> = ({ languages }) => {
  const classes = useStyles();

  return (
    <Box mt={{ xs: 4, sm: 0 }}>
      {languages.map((language) => (
        <Box key={language.name} className={classes.languageBox}>
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
  );
};

export default Languages;
