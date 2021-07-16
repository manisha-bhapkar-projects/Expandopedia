import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import KnowledgeHome from '../knowledgeHome'
import { act } from 'react-dom/test-utils';
import React from 'react';

jest.mock('axios');

afterEach(cleanup);

const mockStore = configureStore();
let store = mockStore({
    knowledgeBase: {
        articleDetails: {},
        quickLinks: [],
        featureArticleList: [{
            "templateName": "Knowledge Base - Insights and Analysis - Articles",
            "templateType": "Article",
            "supertopicId": "60ccad1d1361154bb87ca472",
            "supertopicContentId": "60ccb1309fd7e10bb13020e2",
            "supertopicName": "How to start a business in Spain",
            "supertopicContent": "<p><em>With incredible weather, affordable lifestyle, friendly locals, and quite an international community, life in Spain can a nice place to live. However, finding work may get a bit tricky.</em></p><p><em>Though in recent years the unemployment rate has been going down, it’s still relatively high at 21%. Also, wages tend not to be as high as in other countries across Europe.</em></p><p><em>Of course, you could always avoid the problem altogether and set up your own business. After all, nothing beats the satisfaction of building your own company and doing your own thing.</em></p><p><em>This guide will help you figure out how to go about it.</em></p>",
            "publishedDate": "2021-06-28T06:55:38.524Z",
            "createdBy": "60b65241057c3d6aeb281512",
            "regionId": 1,
            "regionName": null,
            "countryId": null,
            "countryName": null,
            "tags": [
                {
                    "tagid": "60a51366979d8408d17620f3",
                    "name": "Global"
                },
                {
                    "tagid": "60a50a51dde3ce6ed72fb35f",
                    "name": "Popular Content"
                }
            ],
            "topics": [
                {
                    "topicId": "60ccae5d6b21302b38329812",
                    "topicContentId": "60ccb1309fd7e10bb13020e4",
                    "topicName": "How to start a business in Spain Cover Image",
                    "topicContent": "8bda325c-6f08-4dcd-80ab-69a2331126c7",
                    "publishedDate": "2021-06-28T06:55:38.589Z",
                    "createdBy": "60b65241057c3d6aeb281512",
                    "tags": [
                        {
                            "tagid": "60d2c91f61d3bf7f32728e22",
                            "name": "Cover-Image"
                        }
                    ],
                    "subTopics": []
                }]
        }],
        tagList: ["Global", "Popular Content"],
        faqList: [],
        insightsList: [],
    },
    dispatch: jest.fn()
});

const defaultprops = {
    className: "",
    insight: true,
    testCase: true,
    searchTextValue: "Test",
    getFeaturedArticles: () => { },
    getSearchResult: () => { },
    updateSearchText: () => { },
    reducer: {
        countryId: 1,
        countryName: 'Test country',
    }
};

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

describe("knowledgeHome Page Component", () => {

    it('render Home page without error', async () => {
        const { rerender, getByTestId, asFragment } = render(<Provider store={store}><KnowledgeHome {...defaultprops} /></Provider>);
        const listNode = await waitFor(() => getByTestId('knowledgeHome-result-page'));
        expect(listNode.children).toHaveLength(3);
        rerender(<Provider store={store}><KnowledgeHome {...defaultprops} /></Provider>);
        // expect(asFragment()).toMatchSnapshot();
    })

    test('simulate tags click without error', async () => {
        const promise = Promise.resolve();
        const { getByTestId, asFragment } = render(<Provider store={store}><KnowledgeHome history={historyMock} {...defaultprops} /></Provider>)
        const tagBtn = getByTestId('toggle-tags');
        userEvent.click(tagBtn);
        await act(() => promise);
    });

});
