
import React, { useCallback, useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "../../../utils/storage";
import constants from "../../../utils/constants";

// Plugins
import Dropzone from 'react-dropzone'

// Images
import albania from "../../../assets/images/no-flag.jpeg";
import watermarkImg from "../../../assets/images/placeholder-img.svg";
import watermarkFlag from "../../../assets/images/placeholder-flag.svg";

const CountryConfigurationView = (props) => {

  const initialState = {
    country_Code: "",
    country_Name: "",
    created_At: "",
    flag_Upload_Id: "",
    header_Image_Id: "",
    is_Active: true,
    is_Deleted: false
  };

  const {
    country,
    isViewAddNew,
    onEditFromData,
    formState,
    onImageChange,
    onChangeCountry,
    uploadImage,
    updateCountryWithStatus
  } = props;

  const viewState = isViewAddNew.active;
  const [editEmail, setEditEmail] = useState(!viewState)
  const [flagImage, setFlagImage] = useState({})
  const [coverImage, setCoverImage] = useState({})
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (isViewAddNew.active) {
      setEditEmail(false)
    } else {
      setEditEmail(true)
    }

    if (country.id != "" && !viewState) {
      console.log('useEffect', country)
      setFormData(country);
    } else {
      setFormData(initialState);
    }

    if (formState) {
      onChangeViewEdit(formState);
    }

  }, [isViewAddNew.active, country, formState])


  useEffect(() => {
    if ((formState === false && isViewAddNew.active === false) && (flagImage.image || coverImage.image)) {
      setFlagImage({});
      setCoverImage({});
      onImageChange(false)
    }

    if (formData.country_Name !== country.country_Name) {
      onChangeCountry(formData)
    }

  }, [formState, formData]);

  if (!isViewAddNew.active && (!formData.id || formData.id === null || formData.id === "")) {
    return null;
  }

  const onValueChanges = (type, value) => {
    if (type === 'text') {
      setFormData({ ...formData, country_Name: value })
    }
  }

  const onChangeViewEdit = (type) => {
    if (type === false) {
      console.log('onChangeViewEdit', type)
    } else {
      setEditEmail(false);
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  const updateImage = async (file, type) => {
    console.log(file, type)
    if (file && file.length > 0) {
      let base64Image = await toBase64(file[0]);
      if (type === "flag") {
        setFlagImage({ file: file[0], image: base64Image });
      } else {
        setCoverImage({ file: file[0], image: base64Image });
      }
      onImageChange(file[0], type);
    }
  };

  const getFlagImage = () => {
    if (formData.flag_Upload_Id && formData.flag_Upload_Id != "") {
      return constants.API.COUNTRY.GET_FLAG_DOWNLOAD + formData.flag_Upload_Id;
    } else {
      if (isViewAddNew.active) {
        return watermarkFlag; // upload flag image here
      } else {
        return watermarkFlag;
      }
    }
  };

  const getCoverUpload = () => {
    if (formData.header_Image_Id && formData.header_Image_Id != "") {
      return constants.API.COUNTRY.GET_FLAG_DOWNLOAD + formData.header_Image_Id;
    } else {
      if (isViewAddNew.active) {
        return watermarkImg; // upload flag image here
      } else {
        return watermarkImg;
      }
    }
  };
  return (
    <div className="country-add-container">
      <div className={`form-container ${isViewAddNew.active && 'visible'}`}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className={editEmail ? 'disabled' : 'enabled'}>Country Name</label>
          <input
            disabled={editEmail}
            type="email"
            className="form-control"
            onChange={(e) => onValueChanges("text", e.target.value)}
            value={formData.country_Name}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"></input>
          {editEmail && <span onClick={() => onEditFromData(true)}>Edit</span>}
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Flag</label>
          <Dropzone
            onDrop={(acceptedFiles) => updateImage(acceptedFiles, 'flag')}
            minSize={0}
            disabled={editEmail}
            accept={
              ['image/png', 'image/jpg', 'image/jpeg']
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {/* <div class="form-group">
                <label for="exampleInputEmail1">Flag</label>
                <div className="flag-preview">
                  <div className="watermark-flag">
                    <img src={watermarkFlag} alt="" />
                    <a href="">Upload Flag</a>
                  </div>
                </div>
              </div> */}

                  {/* <div class="form-group">
                <label for="exampleInputEmail1">Cover Image</label>
                <div className="cover-image-preview">
                <div className="watermark-flag">
                    <img src={watermarkImg} alt="" />
                    <a href="">Upload Image</a>
                  </div>
                </div>
              </div> */}

                  <div className="flag-preview">
                    <div className={(flagImage.image || formData.flag_Upload_Id && formData.flag_Upload_Id != "") ? "img-con" : 'watermark-flag'}>
                      {
                        flagImage.image ?
                          <img
                            src={flagImage.image}
                            className="image-border"
                            alt="" /> :
                          <img
                            src={getFlagImage()}
                            className={formData.flag_Upload_Id && formData.flag_Upload_Id != "" ? "image-border" : ""}
                            alt="" />
                      }
                      {!editEmail && <span onClick={() => console.log('file')}>{isViewAddNew.active ? (!flagImage.image) ? 'Upload Flag' :"" : "Change"}</span>}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Cover Image</label>
          <Dropzone
            onDrop={(coverFiles) => updateImage(coverFiles, 'cover')}
            minSize={0}
            disabled={editEmail}
            accept={
              ['image/png', 'image/jpg', 'image/jpeg']
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="cover-image-preview">
                    <div className={(coverImage.image || formData.header_Image_Id && formData.header_Image_Id != "" )? "img-con": "watermark-flag"}>
                      {
                        coverImage.image ?
                          <img
                            src={coverImage.image}
                            className="image-border"
                            alt="" /> :
                          <img
                            src={getCoverUpload()}
                            className={formData.header_Image_Id && formData.header_Image_Id != "" ? "image-border" : ""}
                            alt="" />
                      }
                      {!editEmail && <span onClick={() => console.log('file')}>{isViewAddNew.active ? (!coverImage.image) ? 'Upload Image' :"" : "Change"}</span>}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {!isViewAddNew.active &&
          <div className="form-group">
            <span className="btn secondary-btn" onClick={() => updateCountryWithStatus(formData, formData.is_Active)}>{formData.is_Active === true ? 'Deactivate' : 'Activate'} Country</span>
          </div>
        }

      </div>
    </div>
  );
};

export default CountryConfigurationView;
