import React from "react";
import "jest-dom/extend-expect";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import sinon from "sinon";

import ConnectedApp, { createTeam } from "./createTeam";

configure({ adapter: new Adapter() });
const spy = sinon.spy();

function setup() {
  const props = {
    handleTeamName: jest.fn()
  };


  const enzymeWrapper = shallow(<createTeam {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("<CreateTeam />", () => {
  const { enzymeWrapper, props } = setup();

  it("it should render properly ", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

//   it("saveTeam should be called atleast once", () => {
//     const onButtonClick = spy;

//     const inputD = shallow(<createTeam onButtonClick={onButtonClick} />);

//     inputD.find('input').simulate('click');
//     //expect(props.handleTeamName).toBeCalled();

//     expect(enzymeWrapper).toMatchSnapshot();
//   });
});
