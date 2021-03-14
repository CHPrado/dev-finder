import { Theme, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  languageBox: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  language: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1),
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      textAlign: "right",
    },
  },
  percent: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1),
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
    },
  },
}));
