import React from "react";
import "jest-dom/extend-expect";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ConnectedApp, { ListTeam } from "./listTeam";

configure({ adapter: new Adapter() });

function setup() {
  const props = {
  //  handleDelete: jest.fn()
  };

  const enzymeWrapper = shallow(<ListTeam {...props} />);

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
