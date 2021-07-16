import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../test/testFavouritecountries';
import MyAccount from '../index'
import thunk from 'redux-thunk'
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
jest.mock('axios');


const mockStore = configureStore([thunk]);
let store=mockStore({myAccountReducer: {
   
}})

const setup = (store) => {
    return mount(<Provider store={store}><MyAccount /></Provider>);
}
describe("my-account Component",()=>{
    let wrapper;
    beforeEach(() => {
        let store=mockStore({myAccountReducer: {
           
        }})
        wrapper = setup(store);
    });
    test('render my-account without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'my-account')
        expect(indexDiv.length).toBe(1)
    })
})

describe("my-account Component",()=>{
    let wrapper;
    beforeEach(() => {
        let store=mockStore({myAccountReducer: {
            userDetails: { email:"bhapkar@gmail.com",
               jobTitle:"developer" , cName:"Thinkpalm", industryName:"Finance", userProfile:{imageUrl:"demo.svg",
               fname: "Manisha", lname:"Bhapkar", prefferedName:"Manu",}},
     
    }})
        wrapper = setup(store);
    });
    test('render my-account without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'my-account')
        expect(indexDiv.length).toBe(1)
    })

})




