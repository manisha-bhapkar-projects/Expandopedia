import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import next from "../../assets/images/nextIcon.svg";
import prev from "../../assets/images/prevIcon.svg";

function CustomePagination({
  totalLength,
  onPageChangedCalled,
  limit,
  pageNumber,
  disabledJumpTo,
  handleDropdownChange,
}) {
  const [pageNo, setPageNo] = useState(1);
  const countTotalPage = totalLength / limit;
  useEffect(() => {
    if (pageNumber === 1) {
      setPageNo(1);
    }
  }, [totalLength, pageNumber]);
  const TotalPages = Math.ceil(countTotalPage);
  const NextPage = () => {
    if (TotalPages !== pageNo) {
      window.scrollTo(0, 0);
      const page = pageNo + 1;

      setPageNo(page);
      onPageChangedCalled(page);
    }
  };
  const toLastPage = () => {
    if (TotalPages !== pageNo) {
      window.scrollTo(0, 0);
      const page = TotalPages;

      setPageNo(page);
      onPageChangedCalled(page);
    }
  };

  
  const toFirstPage = () => {
    if (pageNo !== 1) {
      window.scrollTo(0, 0);
      const page = 1;

      setPageNo(page);
      onPageChangedCalled(page);
    }
  };

  const handleChangeJumpTo = (e) => {
    window.scrollTo(0, 0);
    if (e.target.value) {
      setPageNo(parseInt(e.target.value));
      onPageChangedCalled(e.target.value);
    } else {
      setPageNo(1);
      onPageChangedCalled(1);
    }
  };
  const PreviousPage = () => {
    if (pageNo !== 1) {
      window.scrollTo(0, 0);
      const page = pageNo - 1;
      setPageNo(page);
      onPageChangedCalled(page);
    }
  };

  const getPageNumbers = (totalPages) => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const selectPageNumber = (_pageNo) => {
    window.scrollTo(0, 0);
    setPageNo(_pageNo);
    onPageChangedCalled(_pageNo);
  };

  return (
    <>
      <div className="pagination-wrap">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="count-select">
              <span>Show</span>
              <select
                className="form-control"
                value={limit}
                onChange={handleDropdownChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <span>per page</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-8 d-flex justify-content-end">
            <div className="main-pagination">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item  ${pageNo === 1 ? "" : ""}`}
                    style={{cursor: "pointer"}}
                  >
                    <span
                      className="page-link border-right-pagination"
                      aria-label="Previous"
                      onKeyDown={toFirstPage}
                      onClick={toFirstPage}
                    >
                      <span aria-hidden="true">
                        <img src={prev} />
                      </span>
                    </span>
                  </li>
                  <li className="page-item"
                    style={{cursor: "pointer"}}
                  >
                    <span
                      className="page-link click-inactive"
                      onKeyDown={PreviousPage}
                      onClick={PreviousPage}
                      aria-label="Previous"
                    >
                      Prev
                    </span>
                  </li>
                  <li className="page-item">
                    <span className="page-link active">{pageNo}</span>
                  </li>
                  <li
                    className={`page-item ${
                      getPageNumbers(TotalPages).length === pageNo
                        ? "click-inactive"
                        : ""
                    }`}
                    onKeyDown={NextPage}
                    onClick={NextPage}
                    style={{cursor: "pointer"}}
                  >
                    <span
                      className="page-link click-active"
                      aria-label="Previous"
                    >
                      Next
                    </span>
                  </li>
                  <li
                    className={`page-item ${
                      getPageNumbers(TotalPages).length === pageNo
                        ? "click-inactive"
                        : ""
                    }`}
                    style={{cursor: "pointer"}}
                  >
                    <span
                      className="page-link click-active click-inactive-border"
                      aria-label="Next"
                      onKeyDown={toLastPage}
                      onClick={toLastPage}
                    >
                      <span aria-hidden="true">
                        <img src={next} />
                      </span>
                    </span >
                  </li>
                  {!disabledJumpTo && <li className="jump-page">
                    <span>Jump to</span>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      onChange={handleChangeJumpTo}
                      pattern="[0-9]"
                    />
                  </li>}
                  <li className="jump-page" style={{paddingRight: 20}}>
                    <span>of &nbsp; {totalLength}</span>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CustomePagination.propTypes = {
  totalLength: PropTypes.number.isRequired,
  onPageChangedCalled: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(CustomePagination);
