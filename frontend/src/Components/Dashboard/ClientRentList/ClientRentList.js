import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import "./ClientRentList.scss";
import PreLoader from "../../PreLoader/PreLoader";
import { loggedInInfo } from "../../Login/loginManager";
//======================================================================

const ClientRentList = () => {
  // loader
  const [loading, setLoading] = useState(true);

  // Set state for loggedInUser:
  const [clientServices, setClientServices] = useState([]);

  // logged User info from session
  const loggedUser = loggedInInfo();

  // Dynamically filter loggedInUser data from API:
  useEffect(() => {
    fetch("/clientServices?email=" + loggedUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientServices(data);
        setLoading(false);
      });
  }, [loggedUser.email, clientServices]);

  let serialNo = 1;

  return (
    <>
      <div className="table-responsive">
        <table className="table table-borderless table-hover bg-white rounded my-4">
          <thead className="thead-light">
            <tr>
              <th className="text-secondary text-left" scope="col">
                #
              </th>
              <th className="text-secondary" scope="col">
                House Name
              </th>
              <th className="text-secondary" scope="col">
                Price
              </th>
              <th className="text-secondary text-center" scope="col">
                {/* Service */}
                Action
              </th>
              <th className="text-secondary text-center" scope="col">
                {/* Service */}
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {clientServices.map((apt) => (
              <tr key={apt._id}>
                <td>{serialNo++}</td>
                <td>{apt.apartment_name}</td>
                <td>${apt.price}</td>
                <td className="text-center">
                  <button className="btn btn-success">View Details</button>
                </td>
                <td className="text-center">
                  <button
                    className={
                      apt.status === "Pending"
                        ? "client-status-btn btn btn-danger "
                        : apt.status === "Done"
                        ? "client-status-btn btn btn-success"
                        : "client-status-btn btn btn-warning"
                    }
                  >
                    {apt.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PreLoader loading={loading} />
      </div>
    </>
  );
};

export default ClientRentList;
