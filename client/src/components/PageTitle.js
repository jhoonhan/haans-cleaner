import React, { forwardRef } from "react";

import icons from "../image/ui-icons.svg";

const PageTitle = (props, ref) => {
  const icon = () => {
    if (window.location.pathname.slice(1) === "pickup") return "pickup";
    if (window.location.pathname.includes("order")) return "order";
    if (window.location.pathname.includes("account")) return "account";
    if (window.location.pathname.slice(1) === "driver/order/search")
      return "search";
    if (window.location.pathname.slice(1) === "driver/order/accepted")
      return "order";
  };

  const render = () => {
    return (
      <header
        ref={ref}
        className="page-title"
        style={
          props.title === "accepted" || props.title === "search"
            ? { marginBottom: "2rem" }
            : {}
        }
      >
        <svg viewBox="0 0 25 25" className="ui-icon">
          <use href={`${icons}#${icon()}`}></use>
        </svg>
        <div>
          <h3>{props.title}</h3>
        </div>
        <div
          className="center-border"
          style={props.hasGoBack ? { paddingRight: "2rem" } : {}}
        >
          <div></div>
          <div></div>
        </div>
        {props.hasGoBack ? (
          <svg
            onClick={props.onClickHandle}
            viewBox="0 0 25 25"
            className="ui-icon btn--go-back"
          >
            <use href={`${icons}#back`}></use>
          </svg>
        ) : (
          ""
        )}
      </header>
    );
  };
  return render();
};

export default forwardRef(PageTitle);
