import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import SearchBar from "./searchBar"

const KnowledgeBaseHeader = (props) => {
    const history = useHistory();

    return (
        <div className={props.className}>
            <div className={props.insight ? "header-banner insights-banner" : props.bannerHeader ? `header-banner ${props.bannerHeader}`: props.doc_shop ? "header-banner doc-banner" : "header-banner"}>
                <div className="banner-image">
                    <SearchBar {...props} theme="dark" noRow />
                </div>
            </div>
        </div>
    );
};

export default React.memo(KnowledgeBaseHeader);
