import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-dom/extend-expect';
import { shallow, configure , mount} from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

configure({adapter: new Adapter()});

 describe('<App />', () => {
   const { container } = shallow(<App />);
  it('it should render properly ', () => {
   expect(container).toMatchSnapshot();
  })

//   it('valid path should not redirect to 404', () => {
//     const wrapper = shallow(
//       <Router initialEntries={[ '/' ]}>
//         <App/>
//       </Router>
//     )
//     expect(wrapper.find(App)).toHaveLength(0);
//   })
 });
