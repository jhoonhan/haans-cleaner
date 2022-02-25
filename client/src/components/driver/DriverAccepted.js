// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import cvtObj2Arr from "../helpers/cvtObj2Arr";

// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import GoogleMap from "../../apis/GoogleMap";

// import DriverOrderItem from "./DriverOrderItem";
// import DriverNavigation from "./DriverNavigation";
// import {
//   driverFetchAccepted,
//   fetchUser,
//   driverFetchOrder,
// } from "../../actions";

// const DriverAccepted = (props) => {
//   const [fetched, setFetched] = useState(false);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   useEffect(() => {
//     if (!props.auth.isSignedIn) return;
//     if (!props.user.fetched) {
//       props.fetchUser(props.auth.userProfile.FW);
//     }
//     if (!props.driver.fetched) {
//       props.driverFetchOrder("2022-02-22");
//       props.driverFetchAccepted(props.auth.userProfile.FW);
//     }
//   }, [props.auth.isSignedIn]);

//   useEffect(() => {
//     if (props.user.fetched && props.driver.fetched) {
//       setFetched(true);
//     }
//   }, [props.user.fetched, props.driver.fetched]);

//   const renderMap = (status) => {
//     switch (status) {
//       case Status.LOADING:
//         return <div>aaang</div>;
//       case Status.FAILURE:
//         return <div>aaang</div>;
//       case Status.SUCCESS:
//         return <div>aaang</div>;
//       default:
//         return <div>aaang</div>;
//     }
//   };

//   const renderAceeptedOrders = () => {
//     // 3 XXX

//     const orderArr = cvtObj2Arr(props.driver.orders);
//     const filteredArr = () => {
//       const res = orderArr.filter((order) => order.status === "accepted");
//       return res;
//     };

//     return filteredArr()
//       .reverse()
//       .map((order, i) => {
//         return (
//           <DriverOrderItem
//             order={order}
//             key={i}
//             page={"accepted"}
//             timestamp={order.timestamp}
//           />
//         );
//       });
//   };

//   const render = () => {
//     if (!fetched) return null;
//     return (
//       <div className="motion-container">
//         <header className="page-title">
//           <h2>Accepted Orders</h2>
//         </header>

//         <button className="button--l">get trip detail</button>
//         <div>
//           <DriverNavigation />
//         </div>

//         <div className="order-container">
//           <div className="driver__order__list">{renderAceeptedOrders()}</div>
//         </div>
//       </div>
//     );
//   };

//   return render();
// };

// const mapStateToProps = ({ auth, user, driver }) => {
//   return { auth, user, driver };
// };

// export default connect(mapStateToProps, {
//   driverFetchAccepted,
//   fetchUser,
//   driverFetchOrder,
// })(DriverAccepted);
