
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup } from '@testing-library/react';
import {
    BrowserRouter as Router
  } from "react-router-dom";
import React from 'react';
import Createrole from '../Createrole'
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

jest.mock('axios', () => {
    return {
      get: jest.fn(),
      create:jest.fn()
    };
  });
afterEach(cleanup);

const middlewares = [thunk]

const mockStore = configureStore(middlewares);

const initState = {
    dispatch: jest.fn()
};
let store = mockStore(initState);

const defaultProps = {
        updateLastLoginAction : () => {},
        getFeatDataAction:  () => {},
        getUserGroupsAction:  () => {},
        postUserRoleAction: () => {},
}
describe("Roles Page Component", () => {

    it('Create Roles to be defined', async () => {
        let wrapper = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        expect(wrapper).toBeDefined();
    })
    it('Initial rendering with props', async () => {
        let { asFragment } = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        expect(asFragment()).toMatchSnapshot();
    })

    test('Create Button should be in the DOM', () => { 
        let { getByText} = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        const node = getByText('Create');
        expect(node.tagName).toBe('BUTTON');
    })

    test('Cancel Button should be in the DOM', () => { 
        let { getByText} = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        const node = getByText('Cancel');
        expect(node.tagName).toBe('BUTTON');
    })

    test('Form should have Role Name', () => { 
        let { getByLabelText} = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        const rolename = getByLabelText('Role Name', 'input__usernam');
        expect(rolename).toBeTruthy();

    })

    test('Form should have Assign Groups', () => { 
        let { getByLabelText} = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        const group = getByLabelText('Assign to User Group*','input__usergroup');
        expect(group).toBeTruthy();

    })

    test('Form should have Role Description', () => { 
        let { getByText} = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        const description = getByText('Role Description*');
        expect(description).toBeTruthy();

    })``

    test('Role name input displaying exact value', () => { 
        let {  getByLabelText} = render(<Router><Provider store={store}><Createrole {...defaultProps} /></Provider></Router>);
        const roleName = getByLabelText('Role Name', 'input__usernam'); 
        userEvent.type(roleName,"ADMIN")   
        expect(roleName.value).toBe('ADMIN');
    })
   
});
