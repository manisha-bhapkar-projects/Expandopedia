import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* Component */
import Loader from "../../Components/Loader";
import KnowledgeBaseHeader from "../KnowledgeBase/KnowledgeBaseHeader";
import constants from "../../utils/constants";

/* Action */
import { getArticles } from "../../Store/reducers/country";
import { getCartDetails } from "../../Store/reducers/HRTemplate";

const InYourCart = (props) => {
	document.title = "Your Cart";
	const history = useHistory();
	const dispatch = useDispatch();
  	const cartDetails = useSelector(state => state?.HRTemplate?.cartDetails)
	const userId = useSelector((state) => state?.user?.userProfile?.userId);
  	// const userId = "00000000-0000-0000-0000-000000000000";
	  
    
	useEffect(() =>{
		dispatch(getCartDetails({userId}));
	}, [])


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
				/>
				<div className="knowledge-content-container doc-cart-container">
					<div class="doc-cart-wrap">
						<h4>In Your Cart</h4>
						<div className="doc-orders">
							<div className="doc-order">
								<div className="doc-order-details">
									<h4 className="doc-item-name">
										Hiring Employment Contract
									</h4>
									<h5>Dominican Republic</h5>
									<span>English</span>
								</div>
								<div className="doc-order-price">$700</div>
								<button className="doc-order-cancel"></button>
							</div>
						</div>
						<div className="doc-payment-proceed">
							<div className="doc-promo">
								<div>I have a promo code:</div>
								<div className="doc-promo-field">
									<input type="text" />
									<button className="btn btn-primary">
										APPLY
									</button>
								</div>
							</div>
							<button className="doc-payment-btn btn btn-primary">
								Continue to Payment
							</button>
						</div>
					</div>

					<div className="doc-shop-suggestion">
						<h4>We think you might like these:</h4>

						<div className="doc-card-grid">
							<div className="doc-card-item">
								<div className="doc-child-item">
									<h3>Afghanistan</h3>
									<span>
										<ion-icon
											class="folder-icon icon-yellow"
											name="folder-sharp"
										></ion-icon>
										Dismissal Template
									</span>
									<div className="seperator"></div>
									<div className="doc-pricing">
										<span>English</span>
										<span>$900</span>
									</div>
								</div>
								<div className="doc-btn-container">
									<button className="light-btn">
										Preview
									</button>
									<button className="dark-btn">
										Add to Cart
									</button>
								</div>
							</div>
							<div className="doc-card-item">
								<div className="doc-child-item">
									<h3>Afghanistan</h3>
									<span>
										<ion-icon
											class="folder-icon icon-green"
											name="folder-sharp"
										></ion-icon>
										Dismissal Template
									</span>
									<div className="seperator"></div>
									<div className="doc-pricing">
										<span>English</span>
										<span>$900</span>
									</div>
								</div>
								<div className="doc-btn-container">
									<button className="light-btn">
										Preview
									</button>
									<button className="dark-btn">
										Add to Cart
									</button>
								</div>
							</div>
							<div className="doc-card-item">
								<div className="doc-child-item">
									<h3>Afghanistan</h3>
									<span>
										<ion-icon
											class="folder-icon icon-yellow"
											name="folder-sharp"
										></ion-icon>
										Dismissal Template
									</span>
									<div className="seperator"></div>
									<div className="doc-pricing">
										<span>English</span>
										<span>$900</span>
									</div>
								</div>
								<div className="doc-btn-container">
									<button className="light-btn">
										Preview
									</button>
									<button className="dark-btn">
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default InYourCart;
