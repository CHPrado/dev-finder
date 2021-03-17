import { Theme, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  value: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1),
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    "& :hover": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
  text: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1),
    whiteSpace: "nowrap",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));
