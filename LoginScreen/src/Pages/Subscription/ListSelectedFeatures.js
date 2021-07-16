import React from 'react';

const ListSelectedFeatures = (props) => {
    let features_html = "";
    if (props.feat_data != null && props.feat_data != undefined) {
        features_html = props.feat_data.map((e, i) => {
            let sub_temp = "";
            if (e.attributes.length > 0) {
                e.attributes.forEach((d, i) => {
                    sub_temp+= `Includes ${d.value} ${d.name}`;
                });
            }
            return (
                <div className="checkbox-wrapper selected_feature_list">
                    {e.name} {sub_temp}
                </div>
            )


        });
    }
    return (
        <React.Fragment>
            {features_html}

        </React.Fragment>
    )
}

export default ListSelectedFeatures;
