import { Color } from "@material-ui/lab/Alert";

interface SnackbarProps {
  open?: boolean;
  message?: string;
  type?: Color;
  onClose?: () => void;
}

export default SnackbarProps;
