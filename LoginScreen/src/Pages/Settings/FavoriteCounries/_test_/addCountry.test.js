import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testFavouritecountries';
import AddCountry from '../AddCountry'
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({favoriteCountriesReducer: {
  
}})


const setup = () => {
    return mount(<Provider store={store}><AddCountry /></Provider>);
}
describe("add-country Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render add-country without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'add-country')
        expect(indexDiv.length).toBe(1)
    })
})