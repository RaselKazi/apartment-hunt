import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { AdminContext, AdminContextTemp } from "../../../App";

// ========================================================

const AddService = () => {
  const [houseInfo, setHouseInfo] = useState({});
  const [file, setFile] = useState(null);
  const handleBlur = (e) => {
    const newHouse = { ...houseInfo };
    newHouse[e.target.name] = e.target.value;
    setHouseInfo(newHouse);
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    const info = { ...data };
    // console.log(serviceInfo);
    formData.append("file", file);
    formData.append("apartment_name", houseInfo.apartment_name);
    formData.append("address", houseInfo.address);
    formData.append("no_bedrooms", houseInfo.no_bedrooms);
    formData.append("no_bathroom", houseInfo.no_bathroom);
    formData.append("rent_month", info.rent_month);
    formData.append("service_charge", info.service_charge);
    formData.append("security_deposit", info.security_deposit);
    formData.append("flat_release_policy", info.flat_release_policy);
    formData.append("property_details", info.property_details);
    formData.append("price", houseInfo.price);

    fetch("/addHouse", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleHouseUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Allow access to Admin Only
  // Admin context from App.js
  const [isAdmin, setIsAdmin] = useContext(AdminContext);
  const [isAdminTemp, setIsAdminTemp] = useContext(AdminContextTemp);
  let history = useHistory();

  // If admin then allow
  useEffect(() => {
    if (isAdmin || isAdminTemp) {
      history.push("/addHouse");
    } else {
      history.push("/");
    }
  }, [history, isAdmin, isAdminTemp]);

  // handle redirected to home
  function handleHouseUpdate() {
    history.push("/");
  }

  // React hook form for validation and error message
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="bg-white rounded my-4 p-4 mx-4">
      <form onSubmit={handleSubmit(onSubmit)} className="event-form">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label for="apartment_name">Apartment title</label>
              <input
                className="form-control"
                onBlur={handleBlur}
                name="apartment_name"
                type="text"
                placeholder="Enter apartment_name"
                ref={register({ required: true })}
              />
              {errors.apartment_name && (
                <span className="error">Title is required</span>
              )}
            </div>
            <div className="form-group">
              <label for="address">Location</label>
              <input
                className="form-control"
                onBlur={handleBlur}
                name="address"
                type="text"
                placeholder="address"
                ref={register({ required: true })}
              />

              {errors.address && (
                <span className="error">Location is required</span>
              )}
            </div>
            <div className="form-group">
              <label for="no_bedrooms">No of bedrooms</label>
              <input
                className="form-control"
                onBlur={handleBlur}
                name="no_bedrooms"
                type="text"
                placeholder="No of bedrooms"
                ref={register({ required: true })}
              />
              {errors.no_bedrooms && (
                <span className="error">Number of bedrooms is required</span>
              )}
            </div>
            <div className="form-group">
              <label for="no_bathroom">No of bathroom</label>
              <input
                className="form-control"
                onBlur={handleBlur}
                name="no_bathroom"
                type="text"
                placeholder="No of bathroom"
                ref={register({ required: true })}
              />
              {errors.no_bathroom && (
                <span className="error">Number of bathroom is required</span>
              )}
            </div>

            <div className="form-group">
              <label for="rent_month">Rent per month</label>
              <input
                className="form-control"
                name="rent_month"
                type="text"
                defaultValue="$550 (negotiable)"
                placeholder="Rent per month"
                ref={register({ required: true })}
              />
              {errors.rent_month && (
                <span className="error">Rent per month is required</span>
              )}
            </div>
            <div className="form-group">
              <label for="service_charge">Service charge</label>
              <input
                className="form-control"
                name="service_charge"
                type="text"
                defaultValue="$100 per month, subject to change"
                placeholder="Service charge"
                ref={register({ required: true })}
              />
              {errors.service_charge && (
                <span className="error">Service charge is required</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label for="security_deposit">Security deposit</label>
              <input
                className="form-control"
                onBlur={handleBlur}
                name="security_deposit"
                defaultValue="3 month’s rent"
                type="text"
                placeholder="Security deposit"
                ref={register({ required: true })}
              />
              {errors.security_deposit && (
                <span className="error">Security deposit is required</span>
              )}
            </div>
            <div className="form-group">
              <label for="flat_release_policy">Flat release policy</label>
              <input
                className="form-control"
                name="flat_release_policy"
                type="text"
                defaultValue="3 months earlier notice required"
                placeholder="Flat release policy"
                ref={register({ required: true })}
              />
              {errors.flat_release_policy && (
                <span className="error">Flat release policy is required</span>
              )}
            </div>

            <div className="form-group">
              <label for="property_details">Property details</label>
              <textarea
                className="form-control"
                name="property_details"
                placeholder="Property details"
                defaultValue="Address & Area : Rangs Malancha, House-68, Road-6A (Dead End Road), Dhanmondi Residential Area. Flat Size : 3000 Sq Feet. Floor :  A5 (5th Floor) (6 storied Building ) (South Facing Unit), Room Category : 3 Large Bed Rooms with 3 Verandas, Spacious Drawing, Dining & Family Living Room, Highly Decorated Kitchen with Store Room and Servant room with attached Toilet. Facilities : 1 Modern Lift, All Modern Amenities & Semi Furnished. Additional Facilities : a. Electricity with full generator load, b. Central Gas Geyser, c. 2 Car Parking with 1 Driver’s Accommodation, d. Community Conference Hall, e. Roof Top Beautified Garden and Grassy Ground, f. Cloth Hanging facility with CC camera"
                rows="5"
                ref={register({ required: true })}
              ></textarea>

              {errors.property_details && (
                <span className="error">Property details is required</span>
              )}
            </div>
            <div className="form-group">
              <label for="price">Price</label>
              <input
                className="form-control"
                onBlur={handleBlur}
                name="price"
                type="text"
                placeholder="$Price"
                ref={register({ required: true })}
              />
              {errors.price && <span className="error">Price is required</span>}
            </div>

            <label htmlFor="imageUpload">Image</label>
            <div className="form-group">
              <label
                htmlFor="imageUpload"
                className="file-upload btn btn-outline-success btn-block w-50"
              >
                <FontAwesomeIcon
                  icon={faUpload}
                  className="mr-2"
                ></FontAwesomeIcon>
                Upload Image
                <input
                  onChange={handleFileChange}
                  id="imageUpload"
                  name="imageUpload"
                  type="file"
                  ref={register({ required: true })}
                />
                {errors.imageUpload && (
                  <span className="error">Image is required</span>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-right">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* <button className="btn btn-warning" onClick={onSubmit}>Add Bulk</button> */}
    </div>
  );
};

export default AddService;
