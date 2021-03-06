import React from "react";
import "jest-dom/extend-expect";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import sinon from "sinon";
import ConnectedApp, { DetailTeam } from "./detailTeam";

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    handleDelete: jest.fn()
  };

  const enzymeWrapper = shallow(<DetailTeam {...props} />);

  return {
   // props,
    enzymeWrapper
  };
}

describe("<DetailTeam/>", () => {
  const { enzymeWrapper, props } = setup();

  it("it should render properly ", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
