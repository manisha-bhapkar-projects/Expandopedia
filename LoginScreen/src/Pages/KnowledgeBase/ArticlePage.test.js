import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr } from '../../test/testUtils';
import ArticlePage from './ArticlePage'
import thunk from 'redux-thunk'
import React from 'react';

const mockStore = configureStore([thunk]);
let store=mockStore({country: {
  
}})


const setup = () => {
    return mount(<Provider store={store}><ArticlePage /></Provider>);
}
describe("article-page Component",()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    test('render article-page without error',()=>{
        const indexDiv = findByTestAttr(wrapper,'article-page')
        expect(indexDiv.length).toBe(1)
    })
})