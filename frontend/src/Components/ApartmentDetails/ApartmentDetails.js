import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import cover from "../../assets/images/cover.png";
import { loggedInInfo } from "../Login/loginManager";
import PreLoader from "../PreLoader/PreLoader";

const ApartmentDetails = () => {
  const { _id } = useParams();
  // loader
  const [loading, setLoading] = useState(true);
  // Set state
  const [selectedApt, setSelectedApt] = useState([]);
  const loggedUser = loggedInInfo();

  // Get the single Service user clicked from API:
  useEffect(() => {
    fetch(`/apartments/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedApt(data);
        setLoading(false);
      });
  }, [_id]);

  const { register, handleSubmit, errors } = useForm();

  // handle redirected to user task
  let history = useHistory();
  function handleUserRequest() {
    history.push("/my-rent");
  }

  // When user registered send the data to server and redirect user to UserDashboard
  const onSubmit = (data) => {
    const newHouse = { ...data };
    newHouse.price = selectedApt.price;
    newHouse.apartment_name = selectedApt.apartment_name;
    newHouse.status = "Pending";
    // newHouse.image = selectedApt.image;

    fetch("/addRegistration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHouse),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleUserRequest();
        }
      });
  };

  return (
    <>
      <section
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(${cover})`,
          height: "35vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <h1 style={{ fontSize: "4vw" }}>Apartment</h1>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <PreLoader loading={loading} />
          <div className="col-md-7 mt-4">
            {selectedApt.image ? (
              <img
                className="w-100"
                src={`data:image/png;base64,${selectedApt.image.img}`}
              />
            ) : (
              <img className="w-100" src={selectedApt.img} alt="" />
            )}

            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <h3>{selectedApt.apartment_name}</h3>
                <h3 className="text-price">${selectedApt.price}</h3>
              </div>
              <p>
                3000 sq-ft., {selectedApt.no_bedrooms} bedrooms,{" "}
                {selectedApt.no_bathroom} bathroom, Semi-furnished, Luxurious,
                South facing Apartment for Rent in {selectedApt.address}
              </p>
            </div>
            <div className="mt-4">
              <h4>Price Details- </h4>
              <p>
                {" "}
                Rent per month: {selectedApt.rent_month}
                <br />
                Service Charge: {selectedApt.service_charge} <br />
                Security deposit: {selectedApt.security_deposit}
                <br />
                Flat release policy: {selectedApt.flat_release_policy}
              </p>
              <h4 className="mt-3">Property Details- </h4>
              <p>{selectedApt.property_details}</p>
            </div>
          </div>

          <div className="col-md-5 mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="shadow bg-white rounded text-left p-3"
            >
              <div className="form-group">
                <input
                  className="form-control"
                  defaultValue={loggedUser.name}
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  ref={register({ required: true })}
                />
                {errors.name && <span className="error">Name is required</span>}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  name="phone"
                  type="phone"
                  placeholder="Phone"
                  ref={register({ required: true })}
                />
                {errors.phone && (
                  <span className="error">Phone is required</span>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={loggedUser.email}
                  placeholder="Email"
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Message"
                  rows="3"
                  ref={register({ required: true })}
                ></textarea>

                {errors.message && (
                  <span className="error">Message is required</span>
                )}
              </div>

              <div className="form-group">
                <button
                  style={{ width: "100%" }}
                  className="btn btn-success"
                  type="submit"
                >
                  Request Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApartmentDetails;
