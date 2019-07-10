import React from "react";
import "jest-dom/extend-expect";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure , mount } from "enzyme";
import sinon from "sinon";

import ConnectedApp, { CreateTeam } from "./createTeam";

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    handleTeamName: jest.fn(),
    saveTeam:jest.fn(),
    alert:jest.fn()
  };


  const enzymeWrapper = shallow(<CreateTeam {...props} />);

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

  it("saveTeam should be called atleast once", () => {
    //const onButtonClick = sinon.spy();
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => {};  // provide an empty implementation for window.alert
    
    expect(enzymeWrapper.find('.saveTeam').simulate('click'));
  });
});
