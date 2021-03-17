import React from "react";
import { BrowserRouter } from "react-router-dom";

import { IconButton, TextField } from "@material-ui/core";
import { act } from "@testing-library/react";
import axios from "axios";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { Snackbar } from "../../../components";
import { Home } from "../../../pages";

jest.mock("axios");

describe("rendering component", () => {
  it("renders Home component without crashing", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const headerTitle = wrapper.find("h4").render().text();
    const input = wrapper.find(TextField).at(0);

    expect(headerTitle).toEqual("lookingforDev");
    expect(input.props().label).toEqual("Username");
    expect(input.props().placeholder).toEqual("coolest-dev");
    expect(input.props().value).toEqual("");
  });
});

describe("simulating events", () => {
  it("simulates input change", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    let input = wrapper.find(TextField).at(0);

    input
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "Changed value" } });
    wrapper.update();
    input = wrapper.find(TextField).at(0);

    expect(input.props().value).toEqual("Changed value");
  });

  describe("simulates button click with invalid input", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const getSpy = jest.spyOn(axios, "get");
    const button = wrapper.find(IconButton).at(0);
    let snackbar = wrapper.find(Snackbar).at(0);

    it("Checks Snackbar prop before click", () => {
      expect(snackbar.props().open).toEqual(undefined);
    });

    it("Checks Snackbar prop after click and api calls", async () => {
      await act(async () => {
        button.simulate("click");
      });

      wrapper.update();
      snackbar = wrapper.find(Snackbar).at(0);

      expect(getSpy).toBeCalled();
      expect(snackbar.props().open).toEqual(true);
      expect(snackbar.props().message).toEqual(
        "We couldn't find a dev with this username."
      );
    });
  });

  // describe("simulates button click with text input", () => {
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <Home />
  //     </BrowserRouter>
  //   );

  //   const getSpy = jest.spyOn(axios, "get");
  //   const button = wrapper.find(IconButton).at(0);
  //   let input = wrapper.find(TextField).at(0);
  //   let snackbar = wrapper.find(Snackbar).at(0);

  //   input
  //     .find("input")
  //     .at(0)
  //     .simulate("change", { target: { value: "CHPrado" } });
  //   wrapper.update();
  //   input = wrapper.find(TextField).at(0);

  //   expect(input.props().value).toEqual("CHPrado");

  //   it("Checks Snackbar prop before click", () => {
  //     expect(snackbar.props().open).toEqual(undefined);
  //   });

  //   it("Checks Snackbar prop after click and api calls", async () => {
  //     await act(async () => {
  //       button.simulate("click");
  //     });

  //     wrapper.update();
  //     snackbar = wrapper.find(Snackbar).at(0);

  //     expect(getSpy).toBeCalled();
  //     expect(snackbar.props().open).toEqual(true);
  //     expect(snackbar.props().message).toEqual(
  //       "We couldn't find a dev with this username."
  //     );
  //   });
  // });
});

describe("snapshots", () => {
  it("Home snapshots", () => {
    const tree = shallow(<Home />);

    expect(toJson(tree)).toMatchSnapshot();
  });
});
