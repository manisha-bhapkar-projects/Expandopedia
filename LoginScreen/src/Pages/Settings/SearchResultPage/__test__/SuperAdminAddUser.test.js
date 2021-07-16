import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testFavouritecountries';
import SuperAdminAddUser from '../../SuperAdminAddUser'
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({superAdminUserReducer: {
  
}})


const setup = () => {
    return mount(<Provider store={store}><SuperAdminAddUser /></Provider>);
}
describe("SuperAdminAddUser Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render SuperAdminAddUser without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'superAdminAddUser')
        expect(indexDiv.length).toBe(1)
    })
})