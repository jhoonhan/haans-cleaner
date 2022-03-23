import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StatusBar from "./StatusBar";
import OrderItem from "./order/OrderItem";
import landingBackground from "../image/landingBackground.svg";
import sunBackground from "../image/sunBackground.svg";
import { motion } from "framer-motion";

const Home = ({ user }) => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const background = useRef(null);
  const cloud1 = useRef(null);
  const cloud2 = useRef(null);
  const cloud3 = useRef(null);
  const cloud4 = useRef(null);
  const sun = useRef(null);

  const handleScroll = () => {
    const rect = window.scrollY;
    cloud1.current.style.transform = `translateX(${-rect / 10}px)`;
    cloud2.current.style.transform = `translateX(${-rect / 7}px)`;
    cloud3.current.style.transform = `translateX(${rect / 7}px)`;
    cloud4.current.style.transform = `translateX(${rect / 12}px)`;
    // sun.current.style.transform = `scale(${rect / 3 + 100}%, ${
    //   rect / 3 + 100
    // }%)`;
    sun.current.style.transform = `translate(-${rect / 5}px, ${rect / 2}px)`;
  };

  const renderBackground = () => {
    return (
      <>
        <div ref={background} className="background--1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", duration: 0.1, delay: 0.1 }}
          >
            <svg
              ref={sun}
              viewBox="0 0 100 100"
              className="bg__sun bg__element "
            >
              <use href={`${sunBackground}#sun--6`}></use>
              <use href={`${sunBackground}#sun--5`}></use>
              <use href={`${sunBackground}#sun--4`}></use>
              <use href={`${sunBackground}#sun--3`}></use>
              <use href={`${sunBackground}#sun--2`}></use>
              <use href={`${sunBackground}#sun--1`}></use>
            </svg>
          </motion.div>

          <svg viewBox="0 0 800 400" className="bg__element">
            <use href={`${landingBackground}#mountain--2`}></use>
            <use href={`${landingBackground}#mountain--1`}></use>
          </svg>

          <motion.div
            initial={{ translateX: 100 }}
            animate={{ translateX: 0 }}
            transition={{ type: "spring", duration: 0.1, delay: 0.4 }}
          >
            <svg ref={cloud4} viewBox="0 0 800 400" className="bg__element ">
              <use href={`${landingBackground}#cloud--4`}></use>
            </svg>
            <svg ref={cloud3} viewBox="0 0 800 400" className="bg__element">
              <use href={`${landingBackground}#cloud--3`}></use>
            </svg>
          </motion.div>

          <motion.div
            initial={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            transition={{ type: "spring", duration: 0.1, delay: 0.2 }}
          >
            <svg ref={cloud2} viewBox="0 0 800 400" className="bg__element">
              <use href={`${landingBackground}#cloud--2`}></use>
            </svg>
            <svg ref={cloud1} viewBox="0 0 800 400" className="bg__element">
              <use href={`${landingBackground}#cloud--1`}></use>
            </svg>
          </motion.div>
        </div>
        <div className="bg__background"></div>

        {/* <div ref={background} className="background--2">
          <svg viewBox="0 0 800 400" className="bg__element background--2">
            <use href={`${landingBackground}#lake`}></use>
            <use href={`${landingBackground}#tree--2`}></use>
            <use href={`${landingBackground}#tree--1`}></use>
          </svg>
        </div> */}
      </>
    );
  };

  const renderList = () => {
    return user.currentUser.orders.slice(-5).map((order, i) => {
      return <OrderItem order={order} page="home" key={i} />;
    });
  };
  const render = () => {
    return (
      <>
        <div className="landing__background">{renderBackground()}</div>

        <div className="landing__container">
          <div className="landing__welcome">
            <h2>Good morning</h2>
            <h1>{user.currentUser.firstName}</h1>
          </div>
          <div className="landing__status">
            <h4 style={{ textTransform: "uppercase" }}>
              your most recent order:
            </h4>
            <StatusBar order={user.currentUser.orders.slice(-1)[0]} />
          </div>
          <div className="landing__container__buttons">
            <Link className="button--l" to={`/pickup`}>
              Request new order
            </Link>
          </div>
          <div className="landing__orders">
            <label>your recent orders</label>
            <div className="order__list">{renderList()}</div>
            <div className="landing__container__buttons">
              <Link className="button--l" to={`/order`}>
                Your orders
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  return render();
};

const mapStateToProps = ({ auth, user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(Home);
//
