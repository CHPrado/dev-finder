import React from "react";
import { BrowserRouter } from "react-router-dom";

import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { Header } from "../../../components";

describe("rendering component", () => {
  it("renders Header component without crashing", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    ).render();
    const title = wrapper.find("h4").text();

    expect(title).toEqual("lookingforDev");
  });
});

describe("snapshots", () => {
  it("Header snapshots", () => {
    const tree = shallow(<Header />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
