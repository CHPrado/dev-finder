import React from "react";
import { BrowserRouter } from "react-router-dom";

import { IconButton, TextField } from "@material-ui/core";
import { act } from "@testing-library/react";
import axios from "axios";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { devData, devRouteData } from "../../../__mocks__/data";
import { Dev } from "../../../pages";
import { Details } from "../../../pages/Dev/Details";
import { Languages } from "../../../pages/Dev/Languages";

jest.mock("axios");

const devWrapper = mount(
  <BrowserRouter>
    <Dev {...devRouteData} />
  </BrowserRouter>
);

describe("rendering component", () => {
  it("renders Dev component without crashing", () => {
    const headerTitle = devWrapper.find("h4").render().text();
    const content = devWrapper.render().text();

    expect(headerTitle).toEqual("lookingforDev");
    expect(content).toContain(devData.username);
    expect(content).toContain(devData.name);
    expect(content).toContain(devData.location);
    expect(content).toContain(devData.bio);
    expect(content).toContain(devData.notes);
    expect(content).toContain(devData.languages[0].name);
    expect(content).toContain(devData.languages[1].name);
  });

  it("renders Details component without crashing", () => {
    const details = devWrapper.find(Details).at(0);

    expect(details.props().dev).toEqual(devData);
  });

  it("renders Languages component without crashing", () => {
    const languages = devWrapper.find(Languages).at(0);

    expect(languages.props().languages).toEqual(devData.languages);

    expect(languages.contains(devData.languages[0].name)).toEqual(true);
    expect(languages.contains(`${devData.languages[0].percent}`)).toEqual(true);
    expect(languages.contains(devData.languages[1].name)).toEqual(true);
    expect(languages.contains(`${devData.languages[1].percent}`)).toEqual(true);
  });

  it("renders Notes component without crashing", () => {
    const notes = devWrapper.find(TextField).at(0).props().value;

    expect(notes).toEqual("Notes about me");
  });
});

describe("passing props", () => {
  it("dev props data equals to dev data", () => {
    const dev = devWrapper.find(Dev).at(0);

    expect(dev.props().location.state.dev).toEqual(
      devRouteData.location.state.dev
    );
  });
});

describe("simulating events", () => {
  it("simulates refresh button click", async () => {
    const refreshButton = devWrapper.find(IconButton).at(0);
    const getSpy = jest.spyOn(axios, "get");

    await act(async () => {
      refreshButton.simulate("click");
    });

    expect(getSpy).toBeCalled();
  });
});

describe("snapshots", () => {
  it("Dev snapshots", () => {
    const tree = shallow(<Dev {...devRouteData} />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
