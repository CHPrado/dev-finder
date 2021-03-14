import { Theme, makeStyles } from "@material-ui/core/styles";

const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  loadingBox: {
    height: "100%",
    ...flexCenter,
  },
  container: {
    ...flexCenter,
    position: "absolute",
    top: "100px",
    width: "100%",
  },
  card: {
    ...flexCenter,
    flexDirection: "column",
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    maxWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  titleBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
  },
  name: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    whiteSpace: "nowrap",
  },
  avatarBox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  avatar: {
    borderRadius: "50%",
    height: "150px",
    marginRight: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      height: "200px",
      marginBottom: theme.spacing(4),
    },
  },
  infoBox: {
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  info: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    display: "flex",
    alignItems: "center",
  },
  detailsBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    "& :hover": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
}));
