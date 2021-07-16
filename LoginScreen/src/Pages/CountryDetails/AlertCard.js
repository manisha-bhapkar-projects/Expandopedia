import React from "react";
import newspaperIcon from "../../assets/images/newspaper-sm-icon.svg";
import bellIcon from "../../assets/images/bell-sm-icon.svg";
import ContentLoader from "react-content-loader";
import { useHistory } from "react-router-dom";
import constants from "../../utils/constants";
const AlertCard = (props) => {
  const history = useHistory();
  const is_notification_mark = props.notification_color;
  const show_notification_mark = () => {
    if (is_notification_mark) {
      return <div className="round blue_bg" />;
    }
  };
  const severityTypes = {
    CRITICAL: {
      name: "Critical",
      color: "border-maroon",
      bullet: "maroon_bg"
    },
    MAJOR: {
      name: "Major",
      color: "border-yellow",
      bullet: "yellow_bg"
    },
    MINOR: {
      name: "Minor",
      color: "border_green",
      bullet: "green_bg"
    },
    OTHER: {
      name: "other",
      color: "border_blue",
      bullet: "blue_bg"
    }
  }
  const stripHtml_fun = (a) => {
    let stripedHtml = a.replace(/<[^>]+>/g, "");
    return stripedHtml;
  };
  const getSeverity = (type) => {
    let severity
    for (let key in severityTypes) {
      if (severityTypes[key].name === type) severity = severityTypes[key]
    }
    if (severity) return severity
    else return severityTypes.OTHER
  }
  const changeDateFormate = (a) => {
    if (a) {
      var Arr = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var date_val = a.slice(5, 7);
      if (date_val.slice(0, 1) == "0") {
        date_val = date_val.slice(1, 2);
      }
      let m_data = a.slice(8, 10);
      let m_year = a.slice(0, 4);
      let month = Arr[date_val];
      return month + " " + m_data + " " + m_year;
    }
  };
  const scrollSpecifcs = (e) => {
    const violation = document.getElementById(e);
    let topicId = document.getElementById(e).getAttribute("data-key");
    topicId = document.getElementById(topicId);
    console.log(topicId);
    violation.classList.add("selected");
    violation.scrollIntoView(true);
    topicId.scrollIntoView(true);
  }
  let test_data = "";
  if (props.card_data != null) {
    if (props.card_id == "alerts") {
      const ListData = props.card_data.map((e, index) =>
        index < 4 ? (
          <div className="details-wrap mt-4">

            <span >{e.changeCategory}
              <div className={`round ${getSeverity(e.severityType).bullet}`} />
              <div className="date-ctrl">{changeDateFormate(e.publishedDate)}</div>
            </span>
            <span className="maintitle mt-1 mb-1 pr-0" onClick={() => scrollSpecifcs(e.contentId)}>{e.alertTitle}</span>
          </div>
        ) : ""
      );
      if (ListData.length)
        test_data = ListData;
      else
        test_data = "No new alerts to show";
    } else {
      let insightData = []
      props?.card_data?.data?.forEach((e, index) => {
        if (index < 3) {
          insightData.push(e)
        }
      })
      const ListData = insightData?.map(e =>
      (
        <div className="details-wrap mt-4 pointer " onClick={() => {
          history.push({
            pathname: `${constants.ROUTE.KNOWLEDGE_BASE.ARTICLE_PAGE}`,
            state: {
              supertopicName:
                e?.supertopicName,
            },
          })
        }}>
          <span>{e.templateType}
            {show_notification_mark()} {changeDateFormate(e.publishedDate)}
            {/* <div className="date-ctrl"></div> */}
          </span>
          <span className="maintitle mt-1 mb-1 pr-0 trim_three_lines decoration"
            dangerouslySetInnerHTML={{ __html: `${stripHtml_fun(e.supertopicName.substring(0, 130))}${e.supertopicName.length > 130 ? "..." : ""}` }}
          />
        </div>
      ));
      if (ListData.length)
        test_data = ListData;
      else
        test_data = "No new publications to show";
    }
  }
  const Loader = (props) => (
    <ContentLoader
      speed={2}
      width="100%"
      height={88}
      viewBox="0 0 100% 38"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="88" />
    </ContentLoader>
  );
  return (
    <div className="col-lg-4 gutter-card">
      <div className="header-container">
        <h3>
          {props?.title || "Alerts"}
          <img src={props?.title === "Alerts" ? bellIcon : newspaperIcon} alt="" />
        </h3>
        <span onClick={props.card_id !== "alerts" ? () => {
          history.push({
            pathname: `${constants.ROUTE.KNOWLEDGE_BASE.INSIGHTS_ANALYSIS}`,
            state: {
              tags: props.countryName.country_Name
            },
          })
        } : ""}>Show More</span>
      </div>
      {props.alertsDataLoading ? (
        <div
          className={
            props.noClass ? "details-wrap home-loader" : "details-wrap"
          }
        >
          <Loader />
        </div>
      ) :
        <div className="country-card">
          {/* <div className="card-header-wrap">
          <i className={props.icon} name={props.icon_name} />
          {props.title}
          <a href>Show more</a>
        </div> */}
          {test_data}
        </div>
      }
    </div>
  );
};

export default AlertCard;
