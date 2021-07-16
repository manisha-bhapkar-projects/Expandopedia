import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testUtils';
import UnfavoriteCountries from '../index'
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({country: {
    CountryDetails: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
    SnapShotData: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
    ChartData: [{0:{id: "1", name: "Permanent"}}, {1:{id: "2", name: "Temporary"}}, {2:{id: "2", name: "Contract"}}],
  
}})


const setup = () => {
    return mount(<Provider store={store}><UnfavoriteCountries /></Provider>);
}
describe("UnFavoriteCountries Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render UnFavoriteCountries without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'indexDiv')
        expect(indexDiv.length).toBe(1)
    })

})