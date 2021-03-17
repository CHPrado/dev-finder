import { RouteComponentProps } from "react-router";
import { StaticContext } from "react-router";

import { DevProps } from "..";

interface StateProps {
  dev: DevProps;
}

interface DevRouteProps
  extends RouteComponentProps<{}, StaticContext, StateProps> {}

export default DevRouteProps;
