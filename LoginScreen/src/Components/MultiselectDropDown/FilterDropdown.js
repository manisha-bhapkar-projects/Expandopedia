import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import FilterIcon from "../../assets/images/filter.svg";
import "./FilterDropdown.css";
import close from "../../assets/images/close.svg";

const FilterDropDwon = ({ data, handleClickSelect, selectedRole }) => {
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState(false);

  const handleClick = () => {
    setFlag(!flag);
  };
  return (
    <>
      <button className="btn btn-filter border-0" onClick={handleClick}>
        {flag ?    <img src={close} />:    <img src={FilterIcon} />}
      </button>
      {flag ? 
        <div className="bg-white filter-dropdown">
        <h4>Filters</h4>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Roles
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0" className="max-height-collapse custom-scroll"
              // style={{ 
              //   maxHeight: 200,
              //   overflowY: "scroll"
              // }}
            >
              <Card.Body>
                <ul>
                  {data && data.length
                    ? data.map((roles) => {
                        return (
                          <li>
                            <input type="checkbox" value={roles.id}
                            onClick={(e) => handleClickSelect(roles, e)}
                            selected={selectedRole}
                            checked={selectedRole[roles.id]}/> {roles.roleName}
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey="1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Subscription
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ul>
                  <li>
                    <input type="checkbox" /> Subscription1
                  </li>
                  <li>
                    <input type="checkbox" /> Subscription2
                  </li>
                  <li>
                    <input type="checkbox" /> Subscription3
                  </li>
                  <li>
                    <input type="checkbox" /> Subscription4
                  </li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <ul className="suboption">
          <li>
            <input type="checkbox" /> Hide Deactivated Users
          </li>
          <li>
            <input type="checkbox" /> Show Client Users Only
          </li>
        </ul>
      </div> : ""}
    
    </>
  );
};

export default FilterDropDwon;
