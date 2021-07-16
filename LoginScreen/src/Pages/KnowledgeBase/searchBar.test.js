import React from 'react';
import { mount, shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../test/testUtils';
import configureStore from 'redux-mock-store';
import SearchBar from './searchBar'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const mockStore = configureStore([thunk]);
let store = mockStore({

})
const defaultProps={
   
}
const setup = (historyMock,props) => {
    const setupProps = { ...defaultProps,...props };
    return mount(<Provider store={store}><Router history={historyMock}> <SearchBar {...setupProps} /></Router></Provider>);
}

describe("SearchBar Component",()=>{
    let wrapper;
    let props={breadcrumb:[{id:1,data:"test",pageLink:"llll",title:"tester"}]}
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn(), createHref: jest.fn() };
        beforeEach(() => {
            wrapper = setup(historyMock,props);
        });
    test("render without error",()=>{
        const searchBar=findByTestAttr(wrapper,'serachBar')
        expect(searchBar.length).toBe(1)
     
    })
    test("render holder without error",()=>{
        const holder=findByTestAttr(wrapper,'holder')
        expect(holder.length).toBe(1)
        expect(wrapper.find('input').simulate('change').length).toBe(1)


     
    })
    test("theme is dark",()=>{
        let wrapper1;
        let props={
            theme:'dark'
        }
        wrapper1 = setup(historyMock,props);
        const shopping=findByTestAttr(wrapper1,'shopping');
        expect(shopping.length).toBe(1)

    })

})