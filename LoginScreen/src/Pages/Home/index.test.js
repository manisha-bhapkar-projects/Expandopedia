import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr, checkProps } from '../../test/testUtils';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Home from './index'
import thunk from 'redux-thunk'
import {CardLoader} from './Card'
import { Router } from 'react-router';
import { act } from 'react-dom/test-utils';
import React from 'react';
const mockStore = configureStore([thunk]);
let store=mockStore({country: {
    countryList: [],
    expertData: {'Argentina':[{id: '1'}, {id: '2'}]},
    expertLoading: {"Argentina": false},
    blogData: {'Argentina':[{id: '1'}, {id: '2'}]},
    blogLoading: {"Argentina": false},
    alertLoading: {'Argentina':false},
    alertData: {Argentina:[{id: '1',data:'test'}, {id: '2',data:'test'}]},
    loading: false
}})


const setup = () => {
    return mount(<Provider store={store}><Home /></Provider>);
}
describe("index Component",()=>{
    let wrapper;
    let useEffect;
    beforeEach(() => {
        
        wrapper = setup();
       
    });
    test('render index without error',()=>{
        const indexDiv=findByTestAttr(wrapper,'indexDiv')
        expect(indexDiv.length).toBe(1)
    })


})