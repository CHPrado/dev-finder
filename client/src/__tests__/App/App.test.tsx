import React from "react";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import App from "../../App";

describe("rendering component", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
});

describe("snapshots", () => {
  it("App snapshots", () => {
    const tree = shallow(<App />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
