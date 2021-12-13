import React, { createContext, useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import NoMatch from "./Components/NoMatch/NoMatch";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { loggedInInfo } from "./Components/Login/loginManager";
import DashboardLayout from "./Pages/DashboardLayout/DashboardLayout";
import AddService from "./Components/Dashboard/AddHouse/AddHouse";
import AddAdmin from "./Components/Dashboard/AddAdmin/AddAdmin";
import ApartmentDetails from "./Components/ApartmentDetails/ApartmentDetails";
import NavBar from "./Components/Home/NavBar/NavBar";
import ClientRentList from "./Components/Dashboard/ClientRentList/ClientRentList";
import AdminBookingList from "./Components/Dashboard/AdminBookingList/AdminBookingList";
// ========================================================================================

// Context
export const UserContext = createContext();
export const AdminContext = createContext();
export const AdminContextTemp = createContext();

function App() {
  // Hook for Logged in user
  const [loggedInUser, SetLoggedInUser] = useState({});

  // Get logged in user info from Session
  const loggedInUserSession = loggedInInfo();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUserSession.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, [loggedInUserSession.email]);

  // Get user info from when user click on sign in
  const [isAdminTemp, setIsAdminTemp] = useState(false);

  useEffect(() => {
    fetch("/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdminTemp(data));
  }, [loggedInUser.email]);

  return (
    <AdminContextTemp.Provider value={[isAdminTemp, setIsAdminTemp]}>
      <AdminContext.Provider value={[isAdmin, setIsAdmin]}>
        <UserContext.Provider value={[loggedInUser, SetLoggedInUser]}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/login">
                <NavBar />
                <Login />
              </Route>
              <Route path="/apartment-details/:_id">
                <NavBar />
                <ApartmentDetails />
              </Route>

              <PrivateRoute exact path="/my-rent">
                <DashboardLayout title="My Rent">
                  <ClientRentList />
                </DashboardLayout>
              </PrivateRoute>

              <PrivateRoute exact path="/admin-booking-lists">
                <DashboardLayout title="Booking List">
                  <AdminBookingList />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path="/addHouse">
                <DashboardLayout title="Add House">
                  <AddService />
                </DashboardLayout>
              </PrivateRoute>
              <PrivateRoute exact path="/makeAdmin">
                <DashboardLayout title="Add Admin">
                  <AddAdmin />
                </DashboardLayout>
              </PrivateRoute>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </AdminContext.Provider>
    </AdminContextTemp.Provider>
  );
}

export default App;
