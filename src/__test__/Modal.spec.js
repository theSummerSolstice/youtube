import React from "react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount } from "enzyme";
import Modal from "../components/Modal";
Enzyme.configure({ adapter: new Adapter() });

describe("테스트 시작", () => {
  let component = null;

  it("renders correctly", () => {
    component = renderer.create(<Modal />);
  });

  it("matches snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
