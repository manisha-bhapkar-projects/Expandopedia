import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testFavouritecountries';
import UserList from '../../UserList';
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({superAdminUserReducer: {
    userList: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
    userDetails: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
}})


const setup = () => {
    return mount(<Provider store={store}><UserList /></Provider>);
}
describe("userList-page Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
   
    test('render userList-page without error',()=>{
        const userList = findByTestAttr(wrapper,'userList-page')
        expect(userList.length).toBe(1)
    })
    test('render  custome-table without error',()=>{
        const  custometable = findByTestAttr(wrapper,'custome-table')
        expect( custometable.length).toBe(1)
    })

   
})