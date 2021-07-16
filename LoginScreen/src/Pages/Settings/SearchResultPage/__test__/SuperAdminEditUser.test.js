import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testFavouritecountries';
import SuperAdminEditUser from '../../SuperAdminEditUser'
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({superAdminUserReducer: {
  
}})


const setup = () => {
    return mount(<Provider store={store}><SuperAdminEditUser /></Provider>);
}
describe("SuperAdminEditUser Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render SuperAdminEditUser without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'SuperAdminEditUser')
        expect(indexDiv.length).toBe(1)
    })
})