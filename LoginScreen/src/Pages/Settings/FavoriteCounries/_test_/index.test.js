import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testFavouritecountries';
import FavoriteCountries from '../index'
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({country: {
    userCountryList: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
    UserCountryData: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
    employeeType: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
    loading: false,
    isEditFlag:false
}})


const setup = () => {
    return mount(<Provider store={store}><FavoriteCountries /></Provider>);
}
describe("country Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render country without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'country-wrapper')
        expect(indexDiv.length).toBe(1)
    })
    test('render add-country without error',()=>{
        const addcountry = findByTestAttr(wrapper,'add-countries')
        expect(addcountry.length).toBe(1)
    })


})