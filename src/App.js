import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import Layout from "../src/layout/Layout";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import TourType from "./pages/services/TourTypes";
import FacilitiesTypes from './pages/services/FacilitiesTypes'
import Package from './pages/services/Package'
import Destination from './pages/services/Destination'
import PackageList from "./pages/services/PackageList";
import SelectServices from "./pages/services/SelectServices";
import CustomizePackage from "./pages/services/CustomizePackage";
import Flight from "./pages/flight/BookFlight";
import Payable from "./pages/Amount Information/PayableAmount";
import Receivable from "./pages/Amount Information/ReceivableAmount";



function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

  
    // If no user or no authentication cookie, redirect to login
    if (!user ) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* services */}
            <Route
              path="tour-type"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TourType />
                  </Layout>
                </ProtectedRoute>
              }
            />
             <Route
              path="facility"
              element={
                <ProtectedRoute>
                  <Layout>
                    <FacilitiesTypes />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="destination"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Destination />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="package"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Package />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="package-list"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PackageList />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="services-offer"
              element={
                <ProtectedRoute>
                   <Layout>
                  <SelectServices />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="customize-package"
              element={
                <ProtectedRoute>
                   <Layout>
                  <CustomizePackage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* flight */}
             <Route
              path="book-flight"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Flight />
                  </Layout>
                </ProtectedRoute>
              }
            />
             {/* amount information */}
             <Route
              path="payable-info"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Payable />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="receivable-info"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Receivable />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
