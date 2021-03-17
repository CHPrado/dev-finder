import React from "react";

import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { devData } from "../../../../__mocks__/data";
import { Languages } from "../../../../pages/Dev/Languages";

describe("rendering component", () => {
  it("renders Notes component without crashing", () => {
    const wrapper = shallow(<Languages languages={devData.languages} />);

    expect(wrapper.contains(devData.languages[0].name)).toEqual(true);
    expect(wrapper.contains(`${devData.languages[0].percent}`)).toEqual(true);
    expect(wrapper.contains(devData.languages[1].name)).toEqual(true);
    expect(wrapper.contains(`${devData.languages[1].percent}`)).toEqual(true);
  });
});

describe("passing props", () => {
  it("laguages props data equals to dev languages data", () => {
    const wrapper = mount(<Languages languages={devData.languages} />);

    expect(wrapper.props().languages).toEqual(devData.languages);
  });
});

describe("snapshots", () => {
  it("Languages snapshots", () => {
    const tree = shallow(<Languages languages={devData.languages} />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
