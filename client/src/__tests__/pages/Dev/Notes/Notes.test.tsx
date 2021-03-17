import React from "react";

import { Button, IconButton, TextField } from "@material-ui/core";
import { act } from "@testing-library/react";
import axios from "axios";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { devData } from "../../../../__mocks__/data";
import { Notes } from "../../../../pages/Dev/Notes";

jest.mock("axios");
const setDev = jest.fn();
const setIsLoading = jest.fn();
const setSnackbar = jest.fn();

const wrapper = mount(
  <Notes
    dev={devData}
    setDev={setDev}
    setIsLoading={setIsLoading}
    setSnackbar={setSnackbar}
  />
);

describe("rendering component", () => {
  it("renders Notes component without crashing", () => {
    const wrapper = shallow(
      <Notes
        dev={devData}
        setDev={setDev}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />
    );
    const notes = wrapper.find(TextField).at(0).props().value;

    expect(notes).toEqual("Notes about me");
  });
});

describe("passing props", () => {
  it("dev props data equals to dev data", () => {
    expect(wrapper.props().dev).toEqual(devData);
    expect(wrapper.props().setDev).toEqual(setDev);
    expect(wrapper.props().setIsLoading).toEqual(setIsLoading);
    expect(wrapper.props().setSnackbar).toEqual(setSnackbar);
  });
});

describe("simulating events", () => {
  describe("simulating edit button click", () => {
    let notes = wrapper.find(TextField).at(0);

    it("checks notes TextField prop before click", () => {
      expect(notes.props().disabled).toEqual(true);
    });

    describe("simulating edit button click", () => {
      const editButton = wrapper.find(IconButton).at(0);
      editButton.simulate("click");
      wrapper.update();

      it("checks notes TextField prop after click", () => {
        notes = wrapper.find(TextField).at(0);
        expect(notes.props().disabled).toEqual(false);
      });
    });

    describe("simulating cancel button click", () => {
      const cancelButton = wrapper.find(Button).at(1);
      expect(cancelButton.render().text()).toEqual("CANCEL");

      it("simulates cancel button click", () => {
        cancelButton.simulate("click");
        wrapper.update();
        notes = wrapper.find(TextField).at(0);

        expect(notes.props().disabled).toEqual(true);
        expect(setDev).toBeCalledTimes(0);
        expect(setIsLoading).toBeCalledTimes(0);
        expect(setSnackbar).toBeCalledTimes(0);
      });
    });

    describe("simulating save button click", () => {
      const saveButton = wrapper.find(Button).at(0);
      expect(saveButton.render().text()).toEqual("SAVE");

      it("simulates save button click", async () => {
        const getSpy = jest.spyOn(axios, "post");

        await act(async () => {
          saveButton.simulate("click");
        });

        wrapper.update();
        notes = wrapper.find(TextField).at(0);

        expect(notes.props().disabled).toEqual(true);
        expect(setDev).toBeCalled();
        expect(setIsLoading).toBeCalled();
        expect(setSnackbar).toBeCalled();
        expect(getSpy).toBeCalled();
      });
    });
  });
});

describe("snapshots", () => {
  it("Notes snapshots", () => {
    const tree = shallow(
      <Notes
        dev={devData}
        setDev={setDev}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
