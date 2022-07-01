import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeMenuItem, setActiveMenuItem } from "../pages/slice/sliceBase";
import { useNavigate } from "react-router-dom";

export default function MenuItem({ id, icon, name, linkTo }) {
  const stateActiveManuItem = useSelector(activeMenuItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className={
        stateActiveManuItem.id === id
          ? "menu-item-element-active"
          : "menu-item-element"
      }
      onClick={() => {
        dispatch(setActiveMenuItem({ id: id }));
        navigate(linkTo);
      }}
    >
      <p>
        {icon}
        {name}
      </p>
    </div>
  );
}
