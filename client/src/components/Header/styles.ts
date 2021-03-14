import { Theme, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    background: theme.palette.primary.dark,
    zIndex: 999,
  },
  logo: {
    height: "50px",
    marginRight: theme.spacing(5),
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(5),
  },
  link: {
    textDecoration: "none",
  },
}));
