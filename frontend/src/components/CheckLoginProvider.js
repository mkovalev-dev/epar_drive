import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin, setCheckLoginParams } from "../pages/slice/sliceUsers";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export default function CheckLoginProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkLogin())
      .then(unwrapResult)
      .then((res) => {
        dispatch(setCheckLoginParams(true));
      })
      .catch((err) => {
        dispatch(setCheckLoginParams(false));
        navigate("/");
      });
  }, [children]);

  return children;
}
