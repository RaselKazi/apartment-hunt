import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AdminContext, AdminContextTemp } from "../../../App";
import PreLoader from "../../PreLoader/PreLoader";
// ==============================================================================

const AdminBookingList = () => {
  // This is table showed in the Admin Dashboard with List of booking
  // Set List of booking register:
  const [bookingList, setBookingList] = useState([]);
  const [selectBook, setSelectBook] = useState({});

  // loader
  const [loading, setLoading] = useState(true);

  // Get all the Volunteer Register
  useEffect(() => {
    fetch("/adminServices")
      .then((res) => res.json())
      .then((data) => {
        setBookingList(data);
        setLoading(false);
      });
  }, [bookingList]);

  // Update when admin change status and update the dashboard
  const updateStatus = (status) => {
    const data = { _id: selectBook._id, status };
    console.log(selectBook, "status", status);

    fetch(`/updateServiceStatus/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((result) => {
        if (result) {
          console.log(result);
        }
      });
  };

  // Allow access to Admin Only
  // Admin context from App.js
  const [isAdmin] = useContext(AdminContext);
  const [isAdminTemp] = useContext(AdminContextTemp);
  let history = useHistory();

  // If admin then allow
  useEffect(() => {
    if (isAdmin || isAdminTemp) {
      history.push("/admin-booking-lists");
    } else {
      history.push("/");
    }
  }, [history, isAdmin, isAdminTemp]);

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
                Name
              </th>
              <th className="text-secondary" scope="col">
                Email ID
              </th>
              <th className="text-secondary" scope="col">
                {/* booking */}
                Phone No
              </th>
              <th className="text-secondary" scope="col">
                {/* Project Details */}
                Massage
              </th>
              <th className="text-secondary text-center" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((booking) => (
              <tr key={booking._id}>
                <td>{serialNo++}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.message}</td>

                <td className="text-center">
                  <select
                    onClick={() => setSelectBook(booking)}
                    onChange={(e) => updateStatus(e.target.value)}
                    className={
                      booking.status === "Pending"
                        ? "btn btn-danger"
                        : booking.status === "Done"
                        ? "btn btn-success"
                        : booking.status === "On going"
                        ? "btn btn-warning"
                        : "btn btn-dark"
                    }
                  >
                    <option
                      selected={booking.status === "Pending"}
                      className="bg-white text-secondary"
                    >
                      Pending
                    </option>
                    <option
                      selected={booking.status === "On going"}
                      className="bg-white text-secondary"
                    >
                      On going
                    </option>
                    <option
                      selected={booking.status === "Done"}
                      className="bg-white text-secondary"
                    >
                      Done
                    </option>
                  </select>
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

export default AdminBookingList;
