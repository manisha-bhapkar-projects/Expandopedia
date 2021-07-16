import React, { useEffect, useRef, useState } from "react";
import {  useHistory } from "react-router-dom";
import sortArrow from "../../assets/images/sort-arrows.svg";
import authorDP from "../../assets/images/author.png";
import searchIcon from "../../assets/images/search.svg";
import { Checkbox } from "primereact/checkbox";
import { getArticles } from "../../Store/reducers/country";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../utils/constants";
import KnowledgeBaseHeader from './KnowledgeBaseHeader';
import profile_img from "../../assets/images/dp.jpeg"

import Loader from "../../Components/Loader";
import moment from "moment";
const InsightsAndAnalysis = (props) => {
	document.title = "Insights";
	const history = useHistory();
	const dispatch = useDispatch()
	const breadcrumb = [{
		name: 'Home',
		pageLink: 'home'
	},{
		name: 'Knowledge Base',
		pageLink: 'knowledge-base'
	}, {
		name: 'Insights and Analysis',
		pageLink: ''
	}];
	const allArticles = useSelector(state => state.country.allArticles);
	const [allContent, setAllContent] = useState(true)
	const [allCountry, setAllCountry] = useState(true)
	const [countryDisable, setCountryDisable] = useState(false)
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("")
	const scroll = useRef(null)
	var tags=["Annual Leave",
	"Bonuses",
	"Employment Contracts",
	"Employment Termination",
	"Maternity Leave",
	"Sick Leave",
	"Severance",
	"Visas",
	"Social Security Contributions",
	"Working Hours"]
	const [cities, setCities] = useState({
		solutionName: [
			"Knowledge Base - Insights and Analysis - Articles",
			"Knowledge Base - Insights and Analysis - Whitepapers",
			"Knowledge Base - Insights and Analysis - Blogs",
		],
		GeographicTags: [],
		tags:props.location?.state?.tags? [props.location.state.tags]:[],
		"TrimContent": true
	});
	
	const initialRequest = {
		solutionName: ["Knowledge Base - Insights and Analysis - Articles"],
		GeographicTags: [],
		"TrimContent": true,
		tags:props.location?.state?.tags? [props.location.state.tags]:[]

	}
	const onRegionChange = (e) => {
		let selectedCities = [...cities.GeographicTags];
		setSearchValue("")
		if (e.checked) {
			setAllCountry(false)
			selectedCities.push(e.value);

		}
		else {
			selectedCities.splice(selectedCities.indexOf(e.value), 1);
		}
		setCities({ ...cities, GeographicTags: selectedCities.length ? selectedCities : [-1], tags: [] });

	}
	const onContentChange = (e) => {
		let selectedContents = [...cities.solutionName];
		if (e.checked) {
			selectedContents.push(e.value);

		}
		else {
			selectedContents.splice(selectedContents.indexOf(e.value), 1);
		}
		setCities({ ...cities, solutionName: selectedContents, tags: [] });

	}
	const onTextChange = (e) => {
		setAllCountry(false)
		setSearchValue(e.target.value)
		setCities({ ...cities, GeographicTags: [], tags: e.target.value.length ? [e.target.value] : [] });
		if (e.target.value.length === 0) {
			setCountryDisable(false)
			setAllCountry(true)
		}
	}


	const onAllContentChange = (e) => {
		let selectedContents = [];
		if (e.checked) {
			setAllContent(true);
			selectedContents = [
				"Knowledge Base - Insights and Analysis - Articles",
				"Knowledge Base - Insights and Analysis - Whitepapers",
				"Knowledge Base - Insights and Analysis - Blogs",
			];
		} else {
			setAllContent(false);
			selectedContents.splice(selectedContents.indexOf(e.value), 1);
		}
		setCities({ ...cities, solutionName: selectedContents, tags: [] });
	};
	const onAllCountryChange = (e) => {
		let selectedContents = [-1];
		setSearchValue("")
		if (e.checked) {
			setAllCountry(true);
			selectedContents = [];
		} else {
			setAllCountry(false);
		}
		setCities({ ...cities, GeographicTags: selectedContents, tags: [] });
	};

	const getPopularArticle = () => {
		setCities({ ...cities, tags: ["Popular Content"] })
	}
	const getRecentArticle = () => {
		let divScroll = scroll.current
		divScroll.scrollTop=0
	}
	const onTagClick = (e) => {
		setCities({ ...cities, tags: [e.target.value] })
	}
	const getAuthorImage = (data) => {
		let topics = data?.topics
		let picId;
		topics?.find((item) => {
			item?.tags?.find((e) => {
				if (e.name === "Author - Name") {
					item?.subTopics?.find((item) => {
						item?.tags?.find((e) => {
							if (e.name === "Author - Pic") {
								picId = item?.subTopicContent
							}
						})
					})
				}
			})

		})
		
		return picId
	}
	useEffect(async () => {
		dispatch(getArticles(initialRequest));
	}, []);
	useEffect(async () => {
		dispatch(getArticles(cities));
	}, [cities]);
	return (
		<div>
		{
			loading && (
				<div className="custom-loader">
					<Loader />
				</div>
			)
		}
		<div data-test="insight">
			<div className="support-btn">
				<div className="btn-bottom-wrap"></div>
				<div className="chatbox"></div>
			</div>
		
			<KnowledgeBaseHeader
				{...props}
				breadcrumb={breadcrumb}
				title="Insights & Analysis"
				className="knowledge-header-container"
				insight={true}
			/>
			<div className="knowledge-content-container article-grid-container">
				<h4>All Content</h4>
				<div className="article-grid-control">
					<button className="article-sort-button">
						<img src={sortArrow} alt="" />
					</button>
					<label>Sort by:</label>
					<button onClick={getRecentArticle} data-test='recentClick'>Recent</button>
					<button onClick={getPopularArticle} data-test="popularClick">Popular</button>
				</div>
				<div className="article-grid custom-scroll" ref={scroll}>
					{allArticles &&
						allArticles.data &&
						allArticles.data.length &&
						allArticles.data.map((e,id) => {
							return (
								<div
									className="article-grid-item"
									key={id}
									data-test="article"
								>
									<h5>{e.supertopicName}</h5>
									<div className="article-author-date">
										<div className="article-author">
											<img
												src={
													getAuthorImage(e)
														? `${constants.IMAGE
															.DOWNLOAD
														}${getAuthorImage(e)}`
														: profile_img
												}
												alt=""
											/>
										</div>
										<span>
											{e.templateType}{" "}
											{moment(e.publishedDate).format(
												"MMM DD, YYYY"
											)}
										</span>
									</div>
									<p>{`${e.supertopicContent}${"..."}`}</p>
									<button
										onClick={() =>
											history.push({
												pathname: `${constants.ROUTE.KNOWLEDGE_BASE.ARTICLE_PAGE}`,
												state: {
													supertopicName:
														e.supertopicName,
												},
											})
										}
										data-test='buttonClick'
									>
										Read More
									</button>
								</div>
							);
						})}

					{/*	<div className="article-grid-item">
						<h5>Josh Bersin’s recruiting and HR Trends for 2021</h5>
						<div className="article-author-date">
							<div className="article-author">
								<img src={authorDP} alt="" />
							</div>
							<span>Article May 13, 2021</span>
						</div>
						<p>
							On May 20, professionals and organizations all over
							the world will celebrate the second annual...
						</p>
						<button>Read More</button>
					</div>

					<div className="article-grid-item">
						<h5>7 Strong Reasons For Integrating Global HR...</h5>
						<div className="article-author-date">
							<div className="article-author">
								<img src={authorDP} alt="" />
							</div>
							<span>Article May 13, 2021</span>
						</div>
						<p>
							On May 20, professionals and organizations all over
							the world will celebrate the second annual...
						</p>
						<button>Read More</button>
					</div>

					<div className="article-grid-item">
						<h5>Global HR Analytics Software Market Analysis</h5>
						<div className="article-author-date">
							<div className="article-author">
								<img src={authorDP} alt="" />
							</div>
							<span>Article May 13, 2021</span>
						</div>
						<p>
							On May 20, professionals and organizations all over
							the world will celebrate the second annual...
						</p>
						<button>Read More</button>
					</div>
					<div className="article-grid-item">
						<h5>Global HR Analytics Software Market Analysis</h5>
						<div className="article-author-date">
							<div className="article-author">
								<img src={authorDP} alt="" />
							</div>
							<span>Article May 13, 2021</span>
						</div>
						<p>
							On May 20, professionals and organizations all over
							the world will celebrate the second annual...
						</p>
						<button>Read More</button>
	</div>*/}
				</div>
				<div className="article-filter">
					<div className="article-search" data-test='search'>
						<button>
							<img src={searchIcon} alt="" />
						</button>
						<input
							type="text"
							placeholder="Filter by country/US State"
							value={searchValue}
							onChange={onTextChange}
							data-test='textChange'
						/>
					</div>

					<div className="article-filter-group">
						<h5>Regions</h5>
						<div className="check-group checked">
							<Checkbox
								className="checkbox"
								onChange={onAllCountryChange}
								checked={allCountry ? true : false}
								disabled={countryDisable ? true : false}
								data-test='allCountryChange'
							></Checkbox>
							<label>All Countries</label>
						</div>

						<div className="check-group">
							<Checkbox inputId='ch1' value="2" className="checkbox" checked={cities.GeographicTags.includes('2')} onChange={onRegionChange} disabled={countryDisable ? true : false} data-test='regionChange'></Checkbox>

							<label>South Asia</label>
						</div>

						<div className="check-group">
							<Checkbox inputId='ch2' value="3" className="checkbox" checked={cities.GeographicTags.includes('3')} onChange={onRegionChange} disabled={countryDisable ? true : false}></Checkbox>

							<label>Europe &amp; Central Asia</label>
						</div>

						<div className="check-group">
							<Checkbox inputId='ch3' value="54" className="checkbox" checked={cities.GeographicTags.includes('54')} onChange={onRegionChange} disabled={countryDisable ? true : false}></Checkbox>

							<label>Americas</label>
						</div>

						<div className="check-group">
							<Checkbox inputId='ch4' value="6" className="checkbox" checked={cities.GeographicTags.includes('6')} onChange={onRegionChange} disabled={countryDisable ? true : false}></Checkbox>

							<label>SubSaharan Africa</label>
						</div>

						<div className="check-group">
							<Checkbox inputId='ch5' value="5" className="checkbox" checked={cities.GeographicTags.includes('5')} onChange={onRegionChange} disabled={countryDisable ? true : false}></Checkbox>

							<label>East Asia &amp; Pacific</label>
						</div>

						<div className="check-group">
							<Checkbox inputId='ch6' value="4" className="checkbox" checked={cities.GeographicTags.includes('4')} onChange={onRegionChange} disabled={countryDisable ? true : false}></Checkbox>

							<label>Middle East &amp; North Africa</label>
						</div>
					</div>

					<div className="article-filter-group">
						<h5>Content Type</h5>
						<div className="check-group checked">
							<Checkbox
								className="checkbox"
								checked={allContent}
								onChange={onAllContentChange}
								data-test="allContentChange"
							></Checkbox>
							<label>All Contents</label>
						</div>

						<div className="check-group">
							<Checkbox
								inputId="ch7"
								value="Knowledge Base - Insights and Analysis - Articles"
								className="checkbox"
								checked={cities.solutionName.includes(
									"Knowledge Base - Insights and Analysis - Articles"
								)}
								onChange={onContentChange}
								disabled={allContent ? true : false}
								data-test='contentChange'
							></Checkbox>
							<label>Articles</label>
						</div>

						<div className="check-group" data-test='check'>
							<Checkbox
								inputId="ch8"
								value="Knowledge Base - Insights and Analysis - Whitepapers"
								className="checkbox"
								checked={cities.solutionName.includes(
									"Knowledge Base - Insights and Analysis - Whitepapers"
								)}
								onChange={onContentChange}
								disabled={allContent ? true : false}
							></Checkbox>
							<label>Whitepapers</label>
						</div>

						<div className="check-group">
							<Checkbox
								inputId="ch9"
								value="Knowledge Base - Insights and Analysis - Blogs"
								className="checkbox"
								checked={cities.solutionName.includes(
									"Knowledge Base - Insights and Analysis - Blogs"
								)}
								onChange={onContentChange}
								disabled={allContent ? true : false}
							></Checkbox>
							<label>Blogs</label>
						</div>
					</div>

					<div className="article-filter-group">
						<h5>Tags</h5>
						<div className="article-tags">
						{
							tags.map((data)=>{
								return(
									<button value='Visa'  data-test='tagClick'>{data}</button>
								)
								
							})
						}
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	);

}
export default InsightsAndAnalysis;
