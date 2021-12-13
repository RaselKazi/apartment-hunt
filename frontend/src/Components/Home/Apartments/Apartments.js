import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faMapMarker } from "@fortawesome/free-solid-svg-icons";

const Apartments = ({ apartment }) => {
  const history = useHistory();
  const handleClickView = (id) => {
    history.push(`/apartment-details/${id}`);
  };

  return (
    <div className="col-lg-4 col-md-4 col-sm-6 mt-4">
      <div className="card mx-auto">
        {apartment.image ? (
          <img
            className="card-img-top"
            src={`data:image/png;base64,${apartment.image.img}`}
          />
        ) : (
          <img className="card-img-top" src={apartment.img} alt="" />
        )}

        <div className="card-body">
          <h5 className="card-title">{apartment.apartment_name}</h5>
          <p className="card-text text-muted mb-1">
            <FontAwesomeIcon className="mr-1" icon={faMapMarker} />
            {apartment.address}
          </p>
          <div className="mt-2 d-flex justify-content-between">
            <span className="card-link text-muted">
              <FontAwesomeIcon className="mr-1" icon={faBed} />
              {apartment.no_bedrooms} Bedrooms
            </span>
            <span className="card-link text-muted">
              <FontAwesomeIcon className="mr-1" icon={faBath} />
              {apartment.no_bathroom} Bathrooms
            </span>
          </div>
          <div className="mt-3 d-flex justify-content-between">
            <h3 className="card-link text-price">${apartment.price}</h3>
            <button
              onClick={() => handleClickView(apartment._id)}
              className="card-link btn btn-success"
            >
              View Details{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartments;
