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
  valuesBox: {
    display: "flex",
    marginRight: theme.spacing(2),
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
  text: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1),
    whiteSpace: "nowrap",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  languagesBox: {
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
  notes: {
    margin: theme.spacing(5, 0),
  },
  buttonsBox: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      ...flexCenter,
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
  link: {
    textDecoration: "none",
    "& :hover": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
}));
