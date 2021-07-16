import React, { useEffect, useState } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import "./Timeline.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function BasicTimeline() {
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
    console.log("location.pathname.substring(6)", path);
  }, []);

  const timeline = useSelector(state => state.user.timeline)

  return (
    <Timeline className="custom-Timeline_main" data-test='TimeLine'>
      <TimelineItem
        className={
          timeline && timeline.about_you
            ? "Custom-lineItem timeline-active"
            : "Custom-lineItem"
        }
      >
        <TimelineContent className="Custom-timeline">About You</TimelineContent>
        <TimelineSeparator className="Separator-custom">
          <TimelineDot
            className={`Custom_Dot ${
              location.pathname == "/" && !timeline.about_you
                ? "dotted-style-active"
                : "dotted-style-next"
            }`}
          />
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem
        className={
          timeline && timeline.country_selection
            ? "Custom-lineItem timeline-active"
            : "Custom-lineItem"
        }
      data-test='country'>
        <TimelineContent className="Custom-timeline">
          Country Selection
        </TimelineContent>
        <TimelineSeparator className="Separator-custom">
          <TimelineDot
            className={`Custom_Dot  ${
              location.pathname == "/country" &&
              !timeline.country_selection
                ? "dotted-style-active"
                : "dotted-style-next"
            }`}
          />
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem
        className={
          timeline && timeline.employee_info
            ? "Custom-lineItem timeline-active"
            : "Custom-lineItem"
        }
      >
        <TimelineContent className="Custom-timeline">
          Employee Info
        </TimelineContent>
        <TimelineSeparator className="Separator-custom">
          <TimelineDot
            className={`Custom_Dot ${
              location.pathname == "/location" && !timeline.employee_info
                ? "dotted-style-active"
                : "dotted-style-next"
            }`}
          />
          <TimelineConnector className="Custom_Connector" />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem
        className={
          timeline && timeline.add_user
            ? "Custom-lineItem timeline-active"
            : "Custom-lineItem"
        }
      >
        <TimelineContent className="Custom-timeline">Add Users</TimelineContent>
        <TimelineSeparator className="Separator-custom">
          <TimelineDot
            className={`Custom_Dot ${
              location.pathname == "/add-user" && !timeline.add_user
                ? "dotted-style-active"
                : "dotted-style-next"
            }`}
          />
        </TimelineSeparator>
      </TimelineItem>
    </Timeline>
  );
}

export default BasicTimeline
