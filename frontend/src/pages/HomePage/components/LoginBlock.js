import logo from "../../../resources/img/logo.png";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export default function LoginBlock() {
  const [preLoading, setPreLoading] = useState(true);
  const [loginView, setLoginView] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreLoading(false);
    }, 2000);
  });

  return (
    <div className="first-home-page">
      {preLoading ? (
        <Spinner />
      ) : (
        <div className="first-home-page-items">
          <a href="https://www.ekepar.ru/" target="_blank" rel="noreferrer">
            <img alt="" src={logo} className="first-home-page-logo" />
          </a>
          {loginView ? (
            <>
              <Login />
              <Button
                className="change-password-button"
                type="link"
                style={{ fontWeight: 300 }}
                onClick={() => {
                  setLoginView(false);
                }}
              >
                <span>Восстановить пароль</span>
              </Button>
            </>
          ) : (
            <>
              <ResetPassword />
              <Button
                className="change-password-button"
                type="link"
                style={{ fontWeight: 300 }}
                onClick={() => {
                  setLoginView(true);
                }}
                icon={<CloseCircleOutlined />}
              >
                <span>Вернуться на страницу авторизации</span>
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
