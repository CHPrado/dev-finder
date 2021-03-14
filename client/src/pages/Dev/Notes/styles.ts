import { Theme, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  notes: {
    margin: theme.spacing(5, 0),
  },
  buttonsBox: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: " center",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  button: {
    marginRight: theme.spacing(2),
    width: "150px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      marginTop: theme.spacing(2),
      width: "100%",
    },
  },
}));
