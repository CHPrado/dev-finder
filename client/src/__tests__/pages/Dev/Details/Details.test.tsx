import React from "react";
import { BrowserRouter } from "react-router-dom";

import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { devData } from "../../../../__mocks__/data";
import { Details } from "../../../../pages/Dev/Details";

const wrapper = mount(
  <BrowserRouter>
    <Details dev={devData} />
  </BrowserRouter>
);

describe("rendering component", () => {
  it("renders Details component without crashing", () => {
    expect(wrapper.contains("followers")).toEqual(true);
    expect(wrapper.contains("following")).toEqual(true);
    expect(wrapper.contains("public repositories")).toEqual(true);
    expect(wrapper.contains("stars")).toEqual(true);
    expect(wrapper.contains("watchers")).toEqual(true);
    expect(wrapper.contains("forks")).toEqual(true);
  });
});

describe("passing props", () => {
  it("dev props data equals to dev data", () => {
    const details = wrapper.find(Details).at(0);

    expect(details.props().dev).toEqual(devData);
  });
});

describe("snapshots", () => {
  it("Details snapshots", () => {
    const tree = shallow(<Details dev={devData} />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
