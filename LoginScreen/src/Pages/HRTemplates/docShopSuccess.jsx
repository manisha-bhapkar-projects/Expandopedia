import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import sortArrow from "../../assets/images/sort-arrows.svg";
import authorDP from "../../assets/images/author.png";
import searchIcon from "../../assets/images/search.svg";
import { Checkbox } from "primereact/checkbox";
import { getArticles } from "../../Store/reducers/country";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../utils/constants";
import KnowledgeBaseHeader from "../KnowledgeBase/KnowledgeBaseHeader";
import profile_img from "../../assets/images/dp.jpeg";
import dollarIcon from "../../assets/images/payment-dollar.svg";
import masterCardIcon from "../../assets/images/master-card.svg";
import plusIcon from "../../assets/images/plus-circle-fill.svg";

import Loader from "../../Components/Loader";
import moment from "moment";
const InYourCart = (props) => {
	document.title = "Insights";
	const history = useHistory();
	const dispatch = useDispatch();
	const breadcrumb = [
		{
			name: "Home",
			pageLink: "home",
		},
		{
			name: "Knowledge Base",
			pageLink: "knowledge-base",
		},
		{
			name: "Insights and Analysis",
			pageLink: "",
		},
	];
	const allArticles = useSelector((state) => state.country.allArticles);
	const [allContent, setAllContent] = useState(true);
	const [allCountry, setAllCountry] = useState(true);
	const [countryDisable, setCountryDisable] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const scroll = useRef(null);
	var tags = [
		"Annual Leave",
		"Bonuses",
		"Employment Contracts",
		"Employment Termination",
		"Maternity Leave",
		"Sick Leave",
		"Severance",
		"Visas",
		"Social Security Contributions",
		"Working Hours",
	];
	const [cities, setCities] = useState({
		solutionName: [
			"Knowledge Base - Insights and Analysis - Articles",
			"Knowledge Base - Insights and Analysis - Whitepapers",
			"Knowledge Base - Insights and Analysis - Blogs",
		],
		GeographicTags: [],
		tags: props.location?.state?.tags ? [props.location.state.tags] : [],
		TrimContent: true,
	});

	const initialRequest = {
		solutionName: ["Knowledge Base - Insights and Analysis - Articles"],
		GeographicTags: [],
		TrimContent: true,
		tags: props.location?.state?.tags ? [props.location.state.tags] : [],
	};
	const onRegionChange = (e) => {
		let selectedCities = [...cities.GeographicTags];
		setSearchValue("");
		if (e.checked) {
			setAllCountry(false);
			selectedCities.push(e.value);
		} else {
			selectedCities.splice(selectedCities.indexOf(e.value), 1);
		}
		setCities({
			...cities,
			GeographicTags: selectedCities.length ? selectedCities : [-1],
			tags: [],
		});
	};
	const onContentChange = (e) => {
		let selectedContents = [...cities.solutionName];
		if (e.checked) {
			selectedContents.push(e.value);
		} else {
			selectedContents.splice(selectedContents.indexOf(e.value), 1);
		}
		setCities({ ...cities, solutionName: selectedContents, tags: [] });
	};
	const onTextChange = (e) => {
		setAllCountry(false);
		setSearchValue(e.target.value);
		setCities({
			...cities,
			GeographicTags: [],
			tags: e.target.value.length ? [e.target.value] : [],
		});
		if (e.target.value.length === 0) {
			setCountryDisable(false);
			setAllCountry(true);
		}
	};

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
		setSearchValue("");
		if (e.checked) {
			setAllCountry(true);
			selectedContents = [];
		} else {
			setAllCountry(false);
		}
		setCities({ ...cities, GeographicTags: selectedContents, tags: [] });
	};

	const getPopularArticle = () => {
		setCities({ ...cities, tags: ["Popular Content"] });
	};
	const getRecentArticle = () => {
		let divScroll = scroll.current;
		divScroll.scrollTop = 0;
	};
	const onTagClick = (e) => {
		setCities({ ...cities, tags: [e.target.value] });
	};
	const getAuthorImage = (data) => {
		let topics = data?.topics;
		let picId;
		topics?.find((item) => {
			item?.tags?.find((e) => {
				if (e.name === "Author - Name") {
					item?.subTopics?.find((item) => {
						item?.tags?.find((e) => {
							if (e.name === "Author - Pic") {
								picId = item?.subTopicContent;
							}
						});
					});
				}
			});
		});

		return picId;
	};
	useEffect(async () => {
		dispatch(getArticles(initialRequest));
	}, []);
	useEffect(async () => {
		dispatch(getArticles(cities));
	}, [cities]);
	return (
		<div>
			{loading && (
				<div className="custom-loader">
					<Loader />
				</div>
			)}
			<div data-test="insight">
				<div className="support-btn">
					<div className="btn-bottom-wrap"></div>
					<div className="chatbox"></div>
				</div>

				<KnowledgeBaseHeader
					{...props}
					title="Doc Shop"
					doc_shop={true}
					className="knowledge-header-container doc-shop-header"
					insight={true}
				/>
				<div className="knowledge-content-container doc-cart-container">
					<div class="doc-cart-wrap payment-success">
						<h4>Review and Payment</h4>
						<span>
							The template has been sent to{" "}
							<a href="mailto:name@email.com">name@email.com</a>
						</span>
						<div className="doc-orders">
							<div className="doc-order">
								<div className="doc-order-details">
									<h4 className="doc-item-name">
										Hiring Employment Contract
									</h4>
									<h5>Dominican Republic</h5>
									<span>English</span>
								</div>

								<button className="download-template-btn">
									Download Template
								</button>
							</div>
						</div>

						<div className="payment-footer">
							<h5>
								You now have <strong>2 HR Templates</strong>{" "}
								available for download.
							</h5>
							<span>
								Invoice is saved in Purchases within Settings.
							</span>
							<div className="link-group">
								<a href="">Download Invoice</a>
								<a href="">Share Invoice</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default InYourCart;
