import React from "react";

const Account = () => {
  return (
    <div className="account-container">
      <div className="template">
        <div className="template__row">
          <label>Name</label>
          <h3>Junghoon Han</h3>
        </div>

        <div className="template__row">
          <label>Email</label>
          <h3>jhoon.han@outlook.com</h3>
        </div>

        <div className="template__row">
          <label>Phone Number</label>
          <h3>3124515946</h3>
        </div>

        <div className="template__row">
          <label>Saved Address</label>
          <div className="band">
            <div>4427 Carly's way, Greensboro, 27410</div>
          </div>
          <div className="band">
            <div>2835 Fallin ct, High Point, 27262</div>
          </div>
          <div className="band">
            <div>635 Cotanche st, APT 821, Greenville, 27858</div>
          </div>
        </div>

        <div className="template__row">
          <label>Sign Out</label>
        </div>
      </div>
    </div>
  );
};

export default Account;
