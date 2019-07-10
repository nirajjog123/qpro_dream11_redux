import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-dom/extend-expect';
import { shallow, configure , mount} from 'enzyme';
import { App } from './App';
import { Route } from "react-router-dom";
import CreateTeam from "./createTeam/createTeam";
import ViewTeam from "./viewTeam/viewTeam";
import detailTeam from "./detailTeam/detailTeam";
import listTeam from "./listTeam/listTeam";


configure({adapter: new Adapter()});

function setup() {
  const props = {
 //   handleDelete: jest.fn()
  };

  const enzymeWrapper = shallow(<App {...props} />);

  return {
   // props,
    enzymeWrapper
  };
}

 describe('<App />', () => {
   const { enzymeWrapper } = setup();
  it('it should render properly ', () => {
   expect(enzymeWrapper).toMatchSnapshot();
  });

it('renders correct routes', () => {
  const pathMap = enzymeWrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});

  expect(pathMap['/detailteam']).toBe(detailTeam);
  expect(pathMap['/createteam']).toBe(CreateTeam);
  expect(pathMap['/viewteam']).toBe(ViewTeam);
  expect(pathMap['/']).toBe(listTeam);
});
 });
