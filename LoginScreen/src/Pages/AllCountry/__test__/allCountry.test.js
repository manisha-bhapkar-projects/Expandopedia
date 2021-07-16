import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AllCountryPage from '../AllCountry'
import { act } from 'react-dom/test-utils';
import React from 'react';

jest.mock('axios');

afterEach(cleanup);

const mockStore = configureStore();
let store = mockStore({
    favoriteCountriesReducer: {
        regionList: [{
            region_Name:'All countries',
            id:1
        }]
    },
    country: {
        allCountriesList: [],
        allCountriesLoading: true,
    },
    dispatch: jest.fn()
});
let store1 = mockStore({
    favoriteCountriesReducer: {
        regionList: [{
            region_Name:'All countries',
            id:1
        }]
    },
    country: {
        allCountriesList: [{
            "countryId": 70,
            "countryName": "India",
            "IsFavourite": true,
            "Topics":
                [
                    {
                        "supertopicName": "Advantages",
                        "SupertopicContent": "<p>Good Social Security Measures and employee benefits</p>< p > Low Corpo...",
                        "CoutryId": 70,
                        "regionId": 2
                    },
                    {
                        "supertopicName": "Risk Factors",
                        "SupertopicContent": "<p>In case of injury or illness, employers must pay up to 24 month sal...",
                        "CoutryId": 70,
                        "regionId": 2
                    }
                ]
        },
        {
            "countryId": 1,
            "countryName": "Afghanistan",
            "IsFavourite": true,
            "Topics":
                [
                    {
                        "supertopicName": "Advantages",
                        "SupertopicContent": "<p>Good Social Security Measures and employee benefits</p><p> Low Corpo...",
                        "CoutryId": 1,
                        "regionId": 1
                    },
                    {
                        "supertopicName": "Risk Factors",
                        "SupertopicContent": "<p>In case of injury or illness, employers must pay up to 24 month sal...",
                        "CoutryId": 1,
                        "regionId": 1
                    }
                ]
        }],
        allCountriesLoading: false,
    },
    dispatch: jest.fn()
});

const defaultprops = {
    className: "",
    insight: true,
    testCase: true,
    callgetRegionListAPI: () => {},
    getAllCountriesList: () => {}
};

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

describe("AllCountryPage Page Component", () => {

    it('render Home page without error', async () => {
        const { rerender, getByTestId, asFragment } = render(<Provider store={store}><AllCountryPage {...defaultprops} /></Provider>);
        const listNode = await waitFor(() => getByTestId('AllCountryPage-result-page'));
        rerender(<Provider store={store1}><AllCountryPage {...defaultprops} /></Provider>);
        // expect(asFragment()).toMatchSnapshot();
    });

});
