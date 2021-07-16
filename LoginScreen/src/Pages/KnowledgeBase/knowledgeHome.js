import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import { useDispatch, useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

// Images
import faq from "../../assets/images/patch-question.svg";
import insights from "../../assets/images/insights-analytics.svg";
import blockquote from "../../assets/images/blockquote-left.svg";
import bell from "../../assets/images/bell.svg";

// Component
import KnowledgeBaseHeader from './KnowledgeBaseHeader';
import Loader from "../../Components/Loader";
import SupportButton from "../../Components/SupportButton";


import {
    getFeaturedArticles
} from "../../Store/reducers/knowledgeBase";
import ComingSoon from "../../Components/ComingSoon";


const KnowledgeHome = (props) => {
    document.title = "Knowledge Base";
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultParams = {
        SolutionName: ["Knowledge Base - Insights and Analysis - Articles"],
        GeographicTags: [],
        GenericTags: [],
        Tags: ["Featured Articles"],
    }
    var tags = ["Annual Leave",
        "Bonuses",
        "Employment Contracts",
        "Employment Termination",
        "Maternity Leave",
        "Sick Leave",
        "Severance",
        "Visas",
        "Social Security Contributions",
        "Working Hours"]
    const [articleList, setArticleList] = useState([])
    const [loading, setLoading] = useState(false)
    const [tagsList, setTagsList] = useState([])
    const [articleParam, setArticleParam] = useState(defaultParams);

    const { featureArticleLoading, tagList, featureArticleList, featureArticleFailed } = useSelector(state => state.knowledgeBase);

    useEffect(() => {
        setLoading(true)
        loadArticle();
    }, []);

    const loadArticle = () => {
        if (!props.testCase) dispatch(getFeaturedArticles(articleParam));
        setLoading(false)
    }

    useEffect(() => {
        const arrayOptimized = [];
        let arraySorted = [];
        let tagsArrayList = [];
        if (featureArticleList.length > 0) {
            for (let index = 0; index < featureArticleList.length; index++) {
                let item = { ...featureArticleList[index] };
                if (item.topics && item.topics != null) {
                    let AuthorName = item.topics.find((data) => {
                        return data.tags.some((tag) => tag.name === "Author - Name")
                    });
                    if (AuthorName) {
                        item["authorName"] = AuthorName.topicName;
                    } else {
                        item["authorName"] = null;
                    }

                    item.tags.map((tag) => {
                        if (!tagsArrayList.includes(tag.name)) {
                            if (tag.name !== "Featured Articles") {
                                tagsArrayList.push(tag.name);
                            }
                        }
                    })
                }
                if (index % 2 === 0 && index !== 0) {
                    arrayOptimized.push([...arraySorted]);
                    arraySorted = [];
                }
                arraySorted.push(item)
            }
            arrayOptimized.push([...arraySorted]);
            arraySorted = [];
            setArticleList(arrayOptimized)
            if (tagsList.length != tagsArrayList.length && tagsList.length < tagsArrayList.length) {
                setTagsList(tagsArrayList);
            }
        }
    }, [featureArticleLoading, featureArticleList, featureArticleFailed]);

    const OnChangeTags = (value) => {
        if (value) {
            let params = [...articleParam.GenericTags];
            if (value) {
                if (params.includes(value)) {
                    params = params.filter((item) => item !== value);
                } else {
                    params.push(value);
                }
            }
            setArticleParam({ ...articleParam, GenericTags: params });
        }
    };

    useEffect(() => {
        setLoading(true)
        loadArticle();
    }, [articleParam.GenericTags])

    return (
        <div className="knowledge-header-container loader-enable" data-testid="knowledgeHome-result-page">
            {
                loading && (
                    <div className="custom-loader">
                        <Loader />
                    </div>
                )
            }
            <KnowledgeBaseHeader
                {...props}
                breadcrumb={[]}
                title="Search anything on our platform"
                className="insights-analytics-page-container"
            />
            <div className="knowledge-content-container">
                <div className="row">
                    <div className="col-md-3 cursor-pointer" onClick={() => { history.push(constants.ROUTE.KNOWLEDGE_BASE.FAQ) }}>
                        <div className="card-category">
                            <img src={faq} alt="" />
                            <span>FAQ</span>
                        </div>
                    </div>
                    <div className="col-md-3 pointer" onClick={() => { history.push('/insights-and-analysis') }}>
                        <div className="card-category">
                            <img src={insights} alt="" />
                            <span >Insights & Analysis</span>
                        </div>
                    </div>
                    <div className="col-md-3 display_comingsoon">
                        <div className="card-category">
                            <img src={blockquote} alt="" />
                            <span>Global HR Forum</span>
                        </div>
                        <ComingSoon direction="top"></ComingSoon>
                    </div>
                    <div className="col-md-3 display_comingsoon">
                        <div className="card-category">
                            <img src={bell} alt="" />
                            <span>Alerts</span>
                        </div>
                        <ComingSoon direction="top"></ComingSoon>
                    </div>
                </div>

                <div className="row gutter-feature">
                    <div className="col-md-8">
                        <div className="feature-container">
                            <h4>Featured Articles</h4>
                            {
                                articleList.map((item, i) => {
                                    return (
                                        <div key={Math.random().toString(36).substr(2, 5)} className={"row m-0"}>
                                            {
                                                item.map((child, index) => (
                                                    <div key={item.supertopicId + index} className="col-md-6 gutter" >
                                                        <div className="feature-article">
                                                            <h3 className="pointer decoration" onClick={() => {
                                                                history.push({
                                                                    pathname: `${constants.ROUTE.KNOWLEDGE_BASE.ARTICLE_PAGE}`,
                                                                    state: {
                                                                        supertopicName:
                                                                            child?.supertopicName,
                                                                        comingFromKB: true
                                                                    },
                                                                })
                                                            }}>{child.supertopicName}</h3>
                                                            <h4>{moment(child.publishedDate).format("MM/DD/YY")}{child.authorName != null ? ', By ' + child.authorName : ""}</h4>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="quicklinks">
                            <h3>Quick Links</h3>
                            <span>Contact Support</span>
                            <span>Update your advisory package</span>
                            <span>Feature request</span>
                        </div>
                        <div className="tag-section">
                            <h3 data-testid="toggle-tags" onClick={() => OnChangeTags(props.testCase ? "Global" : undefined)} >Tags</h3>
                            {
                                tags.map((data) =>
                                    <span
                                    // className={articleParam.GenericTags.includes(data) ? "activeTag" : ""}
                                    //onClick={() => OnChangeTags(data)}
                                    // key={data}
                                    >
                                        {data}
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SupportButton />

        </div>
    );
};


export default React.memo(KnowledgeHome);
