import React, { useEffect, useRef, useState } from "react";
import {  useHistory } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import { useDispatch, useSelector } from "react-redux";

/* Icons */
import cart_body_icon from "../../assets/images/cart-body-icon.svg"
import searchIcon from "../../assets/images/search.svg";

/* Component */
import CustomePagination from "../../Components/CustomePagination/CustomePagination";
import KnowledgeBaseHeader from '../KnowledgeBase/KnowledgeBaseHeader';

/* Action */
import { getAllDocumentList, getLanguageList, getCategoryList } from "../../Store/reducers/HRTemplate";
import { callgetCountryListAPI } from "../../Store/reducers/favoriteCountries";


const HRTemplateDocShop = (props) => {
	document.title = "Doc Shop";
	const history = useHistory();
	const dispatch = useDispatch()
	const countries = useSelector((state) => state?.favoriteCountriesReducer?.countryList);
	const documentList = useSelector(state => state?.HRTemplate?.documentList);
	const languageList = useSelector((state) => state?.HRTemplate?.languageList);
	const categoryList = useSelector((state) => state?.HRTemplate?.categoryList?.data);
	const pageSize = documentList?.pageSize || 10;
	const totalCount = documentList?.totalCount;

	const [pageNumber, setPageNumber] = useState(1);
	const [searchItem, setSearchItem] = useState("");
	const [countryList, setCountryList] = useState([]);
	const [searchCountry, setSearchCountry] = useState([])
	const [selectedCountry, setSelectedCountry] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [docListrequestObject, setDocListRequestObject] = useState({
		page: pageNumber,
		pageSize: pageSize,
	});

	useEffect(async () => {
		dispatch(getAllDocumentList({page : pageNumber, pageSize: pageSize}));
		dispatch(callgetCountryListAPI());
		dispatch(getLanguageList());
		dispatch(getCategoryList());
	}, []);

	useEffect(async () => {
		setCountryList(countries)
	}, [countries]);

	useEffect(() => {
		if (countries && countries.length) {
			setCountryList(countries);
			setSearchCountry(countries);
		}
	}, [countries]);

	const onPageChangedCalled = (perPage) => {
		setPageNumber(perPage);
		const requestObject = {
			...docListrequestObject,
			page: perPage,
			pageSize: pageSize,
		};
		setDocListRequestObject(requestObject);
		dispatch(getAllDocumentList(requestObject));
	};

	const handleDropdownChange = (e) => {
		const requestObject = {
			...docListrequestObject,
			page: 1,
			pageSize: e.target.value,
		};
		setDocListRequestObject(requestObject);
		dispatch(getAllDocumentList(requestObject));
	};

	const onTextChange = (e) => {
		setSearchItem(e.target.value);
		const updateValue = searchCountry.filter((item) => {
			return (
				item.country_Name
					.toLowerCase()
					.search(e.target.value.trim().toLowerCase()) !== -1
			);
		});
		setCountryList(updateValue);
	}

	const onCountryChange = async (id) => {
		let tempData = [...selectedCountry];
		if (tempData.includes(id)) {
			const index = tempData.indexOf(id);
			tempData.splice(index,1);}
		else {
			tempData.push(id);
		}
		setSelectedCountry(tempData);
		const requestObject = {
			...docListrequestObject,
			page: pageNumber,
			pageSize: pageSize,
			countryIds: tempData
		};
		await dispatch(getAllDocumentList(requestObject));
		setCountryList(countries)
	}

	const onLanguageChange = async (id) => {
		let tempData = [...selectedLanguage];
		if (tempData.includes(id)) {
			const index = tempData.indexOf(id);
			tempData.splice(index,1);}
		else {
			tempData.push(id);
		}
		setSelectedLanguage(tempData);
		const requestObject = {
			...docListrequestObject,
			page: pageNumber,
			pageSize: pageSize,
			languageIds: tempData
		};
		await dispatch(getAllDocumentList(requestObject));
		setCountryList(countries)
	}
	
	const onCategoryChange = async (id) => {
		let tempData = [...selectedCategory];
		if (tempData.includes(id)) {
			const index = tempData.indexOf(id);
			tempData.splice(index,1);}
		else {
			tempData.push(id);
		}
		setSelectedCategory(tempData);
		const requestObject = {
			...docListrequestObject,
			page: pageNumber,
			pageSize: pageSize,
			categorIds: tempData
		};
		await dispatch(getAllDocumentList(requestObject));
		setCountryList(countries)
	}

	return (
		<div>
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
			<div className="doc-cart-banner">
				<div className="cart-count">
				<img src={cart_body_icon} alt="cart-icon" />
				<span>1 Item In Cart</span>
				</div>
				<div className="cart-btn-wrap">
					<button>Review and Checkout</button>
				</div>
			</div>
			<div className="knowledge-content-container article-grid-container doc-grid-container">
				<h4>HR Templates</h4>
				<div className="article-grid-control">
				</div>
				<div className="doc-card-grid custom-scroll">
					{documentList && documentList?.data?.map((item, index) => {
						return(
							<div className="doc-card-item">
							<div className="doc-child-item">
								<h3>{item.document.title}</h3>
								<span>
									<ion-icon class="folder-icon icon-yellow" name="folder-sharp"/>
									{item.document.subtitle}
								</span>
								<div className="seperator"></div>
								<div className="doc-pricing">
									<span>English</span>
									<span>${item.document.price}</span>
								</div>
							</div>
							<div className="doc-btn-container">
								<button className="light-btn">Preview</button>
								<button className="dark-btn">Add to Cart</button>
							</div>
						</div>
						 )
					})}
				
				</div>
				<div className="article-filter">
					<div className="article-filter-group">
					    <h6>Filter</h6>
						<h5>Template Type</h5>
						{categoryList && categoryList.slice(0, 5).map((category, index) =>{
							return(
							<div className="check-group checked" key={index}>
							<Checkbox
								className="checkbox"
								checked={selectedCategory.includes(category.id)}
								onChange={() => onCategoryChange(category.id)}
								data-test="categoryList"
							/>
							<label>{category.categoryName}</label>
							</div>
							)
						})}
					</div>

					<div className="article-filter-group">
						<h5>Language</h5>
						{languageList && languageList.slice(0, 5).map((language, index) => {
							return(
								<div className="check-group checked" key={index}>
								<Checkbox
									className="checkbox"
									checked={selectedLanguage.includes(language.id)}
									onChange={() => onLanguageChange(language.id)}
									data-test="languageList"
								/>
								<label>{language.language_Name}</label>
							</div>
							)
						})}
					</div>
					<div className="article-filter-group">
						<h5>Show Templates</h5>
						{languageList && languageList.slice(0, 2).map((language, index) => {
							return(
								<div className="check-group checked" key={index}>
								<Checkbox
									className="checkbox"
									checked={languageList}
									onChange={onLanguageChange}
									data-test="languageList"
								></Checkbox>
								<label>{language.language_Name}</label>
							</div>
							)
						})}
					</div>

					<div className="article-filter-group">
						<h5>Country</h5>
						<div className="article-search" data-test='search'>
						<button>
							<img src={searchIcon} alt="" />
						</button>
						<input
							type="text"
							placeholder="Search"
							value={searchItem}
							onChange={onTextChange}
							data-test='textChange'
						/>
					</div>
					{countryList && countryList.slice(0, 10).map((country, index) => {
						return(
							<div className="check-group checked" key={index}>
							<Checkbox
								className="checkbox"
								checked={selectedCountry.includes(country.id)}
								onChange={() => onCountryChange(country.id)}
								data-test="countryList"
							></Checkbox>
							<label>{country.country_Name}</label>
					</div>
						)
					})}
				
					</div>
				</div>
				<CustomePagination
					totalLength={totalCount}
					paginationPerPage={pageSize}
					onPageChangedCalled={onPageChangedCalled}
					pageNumber={pageNumber}
					limit={pageSize}
					paginationRowsPerPageOptions={[1, 3, 5, 10, 15, 20, 25, 30]}
					handleDropdownChange={handleDropdownChange}
				/>
			</div>
		</div>
		</div>
	);

}
export default HRTemplateDocShop;
