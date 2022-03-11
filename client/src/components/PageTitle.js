import React, { forwardRef } from "react";
import { connect } from "react-redux";

import icons from "../image/ui-icons.svg";

const PageTitle = (props, ref) => {
  const icon = () => {
    if (window.location.pathname.slice(1) === "pickup") return "pickup";
    if (window.location.pathname.slice(1) === "order") return "order";
    if (window.location.pathname.slice(1) === "account") return "account";
    if (window.location.pathname.slice(1) === "search") return "search";
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
        <svg viewBox="0 0 100 100" className="ui-icon">
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
            viewBox="0 0 100 100"
            className="ui-icon btn--go-back"
          >
            <use href={`${icons}#x`}></use>
          </svg>
        ) : (
          ""
        )}
      </header>
    );
  };
  return render();
};

export default connect()(forwardRef(PageTitle));
