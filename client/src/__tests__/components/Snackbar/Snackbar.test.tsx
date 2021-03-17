import React from "react";

import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { Snackbar } from "../../../components";

const message = "Test message";

describe("rendering component", () => {
  it("renders Snackbar component without crashing", () => {
    shallow(<Snackbar />);
  });
});

describe("passing props", () => {
  it("with open equals true, message and type props", () => {
    const wrapper = mount(
      <Snackbar open={true} message={message} type="success" />
    );

    expect(wrapper.props().open).toEqual(true);
    expect(wrapper.props().type).toEqual("success");
    expect(wrapper.props().message).toEqual(message);
    expect(wrapper.contains(message)).toEqual(true);
  });

  it("with open equals false, message and type props", () => {
    const wrapper = mount(
      <Snackbar open={false} message={message} type="success" />
    );

    expect(wrapper.props().open).toEqual(false);
    expect(wrapper.props().type).toEqual("success");
    expect(wrapper.props().message).toEqual(message);
    expect(wrapper.contains(message)).toEqual(false);
  });
});

describe("snapshots", () => {
  it("Snackbar snapshots", () => {
    const tree = shallow(<Snackbar open={true} message={message} />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
