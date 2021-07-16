import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { findByTestAttr, checkProps } from '../../../../test/testUtils';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SearchResultPage from '../index'
import SearchPageHeader from '../SearchPageHeader'
import { act } from 'react-dom/test-utils';
import React from 'react';

jest.mock('axios');

afterEach(cleanup);

const mockStore = configureStore();
let store = mockStore({
    searchResultReducer: {
        searchTextValue: "Test",
        stateId: false,
        countryId: 1,
        regionId: false,
        stateName: '',
        countryName: 'Test country',
        regionName: '',
    }
});

const defaultprops = {
    searchTextValue: "Test",
    getSearchResult: () => { },
    updateSearchText: () => { },
    reducer: {
        countryId: 1,
        countryName: 'Test country',
    }
}

describe("Search Page Component", () => {

    it('render Search page without error', async () => {
        const { rerender, getByTestId, asFragment } = render(<Provider store={store}><SearchResultPage {...defaultprops} /></Provider>);
        const listNode = await waitFor(() => getByTestId('search-result-page'));
        expect(listNode.children).toHaveLength(2);
        rerender(<Provider store={store}><SearchResultPage {...defaultprops} /></Provider>);
        // expect(asFragment()).toMatchSnapshot();
    })

    test('simulate paginate without error', async () => {
        const promise = Promise.resolve();
        const { getByTestId, asFragment } = render(<Provider store={store}><SearchResultPage {...defaultprops} /></Provider>)
        const paginateBtn = getByTestId('paginate');
        userEvent.click(paginateBtn);
        await act(() => promise);
    });

});

describe("Search Header Component", () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    it('render Search page header without error', async () => {
        const { getByTestId, asFragment } = render(<Provider store={store}><SearchPageHeader {...defaultprops} /></Provider>);
        const listNode = await waitFor(() => getByTestId('search-results-wrap'));
        expect(listNode.children).toHaveLength(2);
        // expect(asFragment()).toMatchSnapshot();
    });

    test('simulate Header Navigation Click without error', async () => {
        const promise = Promise.resolve();
        const { getByTestId, asFragment } = render(<Provider store={store}><SearchPageHeader {...defaultprops } history={historyMock} /></Provider>)
        const paginateBtn = getByTestId('navBar');
        userEvent.click(paginateBtn);
        expect(historyMock.push.mock.calls[0][0]).toEqual('/details/1');
        await act(() => promise);
    });

    test('simulate Header Navigation Click without error', async () => {
        const promise = Promise.resolve();
        const { getByTestId, asFragment } = render(<Provider store={store}><SearchPageHeader {...defaultprops } /></Provider>)
        const paginateBtn = getByTestId('quick-search-input');
        userEvent.type(paginateBtn, "testing UI");
        userEvent.click(paginateBtn);
        await act(() => promise);
    });
});