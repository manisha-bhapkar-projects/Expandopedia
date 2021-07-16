import React from 'react';

const ListFeatures = (props) => {
    console.log(props);
    let features_html = "";
    if (props.feat_data != null || props.feat_data != undefined) {
        features_html = props.feat_data.map((e, i) => {
            let sub_temp = "";
            if (e.attributes.length > 0) {
                sub_temp = e.attributes.map((d, i) => {
                    return (<div className="sub-checkbox-container">
                        {/* <span> */}
                        <label htmlFor={d.id} className="tab-checkbox">

                            <input  type="checkbox" value={d.id} id={d.id} data-value={e.id}  onChange={(e) => props.sub_event(e)}  name={`radio-group${e.id}`} />
                            {/* <label htmlFor={d.id} /> */}
                            <span className="checkmark" />

                        {/* </span> */}
                        </label>
                        <span>
                            <input type="number" data-value={d.id} onChange={(e)=>props.onInputChange(e)} className="form-control" />
                        </span>
                        <span>
                            {d.name}
                        </span>
                    </div>)
                });
                return (
                    <div className="checkbox-wrapper">
                        <label className="tab-checkbox">{e.name}
                            <input type="checkbox" onChange={(e) => props.data_event(e)} value={e.id} />
                            <span className="checkmark" />
                        </label>
                        {sub_temp}
                    </div>
                )
            } else {
                return (
                    <div className="checkbox-wrapper">
                        <label className="tab-checkbox">{e.name}
                            <input type="checkbox" onChange={(e) => props.data_event(e)} value={e.id} />
                            <span className="checkmark" />
                        </label>
                        {sub_temp}
                    </div>  
                )
            }

        });
    }
    return (
        <React.Fragment>
            {features_html}

        </React.Fragment>
    )
}

export default ListFeatures;
