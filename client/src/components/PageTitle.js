import React, { forwardRef } from "react";
//{ title, hasGoBack, onClickHandle }
const PageTitle = (props, ref) => {
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
        <div onClick={props.onClickHandle} className="account__btn--go-back">
          X
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default forwardRef(PageTitle);
