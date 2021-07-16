import React, { useEffect, useState ,useRef} from "react";
import { Calendar } from "../../Components/Calendar";
import moment from "moment";
import { getPublicHolidays } from "../../Store/reducers/country";
import { useDispatch, useSelector } from "react-redux";

const SnapShot = (props) => {
	const [currentYear, setCurrentYear] = useState(moment().format("YYYY"));
	const publicHolidays = useSelector((state) => state.country.publicHolidays);
	const dispatch = useDispatch();
	const scrollsnapShot = useRef(null)
	useEffect(() => {
		dispatch(
			getPublicHolidays({ year: currentYear, countryId: props.countryId })
		);
		
	}, []);
	if(props?.snapShot?.snapShot==="snapshot"){
		scrollsnapShot?.current?.scrollIntoView() 
		}
	const stripHtml_fun = (a) => {
		if (a != null || a != undefined) {
			let stripedHtml = a.replace(/<[^>]+>/g, "");
			return stripedHtml;
		}
	};
	
	let test_data = `No ${props.title}  found...!`;
	if (props.snapdata != null) {
		const ListData = props.snapdata.map((e) => (
			<div className="col-md-6">
				<div className="features">
					<i className="ph-clock" />
					<h6>{e.supertopicName}</h6>
					<h4
						className="trimsingle_line"
						dangerouslySetInnerHTML={{
							__html: stripHtml_fun(e.supertopicContent),
						}}
					></h4>
				</div>
			</div>
		));

		test_data = ListData;
	}

	const build_dynamic_data_content = (keyword_data) => {
		if (props.snapdata != null && props.snapdata != undefined) {
			let super_tname = "";
			console.log("snap",props.snapdata)
			super_tname = props.snapdata.find((e) => {
					return e.supertopicName == keyword_data;	
			});
			if(keyword_data==='Taxes'){
				var finalResult = ""
				super_tname&&super_tname?.topics.map((item)=>{
					if(item.topicName==="Social Security & Payroll Taxes"){
						if (item && item?.topicSnapshotContent && item?.topicSnapshotContent.length) {
							
							const actualTopics = item?.topicSnapshotContent?.filter((item) => item !== "&nbsp;");
							for (let index = 0; index < actualTopics?.length; index++) {
								const item = actualTopics[index];
								if (item && item != "") {
									finalResult += item.replace("&nbsp;", "") + ((index + 1) !== actualTopics.length ? "; " : "");
								}
							}
							
						
						}
					}
				})
				return finalResult
			}
			else
            {if (super_tname && super_tname.superTopicSnapshotContent && super_tname.superTopicSnapshotContent.length) {
                let finalResult = "";
                const actualTopics = super_tname.superTopicSnapshotContent.filter((item) => item !== "&nbsp;");
                for (let index = 0; index < actualTopics.length; index++) {
                    const item = actualTopics[index];
                    if (item && item != "") {
                        finalResult += item.replace("&nbsp;", "") + ((index + 1) !== actualTopics.length ? "; " : "");
                    }
                }
				console.log("final",finalResult);
                return finalResult;
			
            }}
			/*if (
				super_tname &&
				super_tname.superTopicSnapshotContent &&
				super_tname.superTopicSnapshotContent.length
			) {
				let finalResult = "";
				for (
					let index = 0;
					index < super_tname.superTopicSnapshotContent.length;
					index++
				) {
                    
					const item = super_tname.superTopicSnapshotContent[index];
					if (item && item != "") {
						finalResult +=
							item.replace("&nbsp;", "") +
							(index + 1 !==
							super_tname.superTopicSnapshotContent.length
								? ";"
								: "");
					}
				}
				return finalResult;
			}*/
		}
	};

	const onActiveStartChange = (date) => {
		let year = moment(date.activeStartDate).format("YYYY");
		if (year !== currentYear) {
			setCurrentYear(year);
		dispatch(getPublicHolidays({ year, countryId: props.countryId }));
		}
	};

	return (
		<React.Fragment>
			<div className="tab-section">
				<div className="" ref={scrollsnapShot}>
					<h3>Snapshot</h3>
				</div>
				<div class="tab-section-content">
					<div class="row">
						<div class="col-md-6 col-lg-4 col-sm-12">
							<div class="col-md-12">
								<div class="features">
									<i class="ph-calendar-x-thin"></i>
									<h6>
										Public Holidays
										{/* <a href="">View Calendar</a> */}
									</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Public Holidays"
												)
											),
										}}
									></h4>
								</div>
							</div>

							<div class="col-md-12">
								<div class="features">
									<i class="ph-airplane-takeoff-thin"></i>
									<h6>Vacation Leave</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Annual Leave"
												)
											),
										}}
									></h4>
								</div>
							</div>
							<div class="col-md-12">
								<div class="features">
									<i class="ph-first-aid-kit-thin"></i>
									<h6>Sick Leave</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Sick & Carer’s Leave"
												)
											),
										}}
									></h4>
								</div>
							</div>
							<div class="col-md-12">
								<div class="features">
									<i class="ph-heartbeat-thin"></i>
									<h6>Maternity Leave</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Maternity, Paternity & Family Leave"
												)
											),
										}}
									></h4>
								</div>
							</div>
						</div>

						<div class="col-md-6 col-lg-4">
							<div class="col-md-12">
								<div class="features">
									<i class="ph-alarm-thin"></i>
									<h6>Working Hours</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Working Hours"
												)
											),
										}}
									></h4>
								</div>
							</div>
							<div class="col-md-12">
								<div class="features">
									<i class="ph-currency-circle-dollar-thin"></i>
									<h6>Bonus Payments</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Wages, Bonuses & Other Remuneration"
												)
											),
										}}
									></h4>
								</div>
							</div>
							<div class="col-md-12">
								<div class="features">
									<i class="ph-percent-thin"></i>
									<h6>Taxes</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Taxes"
												)
											),
										}}
									></h4>
								</div>
							</div>

							<div class="col-md-12">
								<div class="features">
									{/* <i class="ph-user-circle-minus-thin"></i> */}
									<div className="icon-remove"></div>
									<h6>
										Employee Termination &amp; Severance
									</h6>
									<h4
										dangerouslySetInnerHTML={{
											__html: stripHtml_fun(
												build_dynamic_data_content(
													"Termination & Severance"
												)
											),
										}}
									></h4>
								</div>
							</div>
						</div>

						<div class="col-md-6 col-lg-4">
							<div class="calendar-container">
								<div className="calendar-title">
									Public Holidays
								</div>
								<Calendar
									onActiveStartDateChange={
										onActiveStartChange
									}
									events={publicHolidays || []}
									next2Label={null}
									prev2Label={null}
									prevLabel={<i class="ph-caret-left"></i>}
									nextLabel={<i class="ph-caret-right"></i>}
									calendarType="US"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 pt-3">
						<div class="col-12 feature-info">
							<span className="snapshot_sub_heading">
								Advantages
							</span>
							<span
								dangerouslySetInnerHTML={{
									__html: stripHtml_fun(
										build_dynamic_data_content(
											"Advantages"
										)
									),
								}}
							></span>
						</div>
					</div>
					<div className="col-md-6 pt-3">
						<div class="col-12 feature-info">
							<span className="risk_factor_div snapshot_sub_heading color-red">
								Risk Factors
							</span>
							<span
								dangerouslySetInnerHTML={{
									__html: stripHtml_fun(
										build_dynamic_data_content(
											"Risk Factors"
										)
									),
								}}
							></span>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SnapShot;
