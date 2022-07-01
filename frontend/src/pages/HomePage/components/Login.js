import { Button, Form, Input, message } from "antd";
import Tilt from "react-parallax-tilt";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../slice/sliceUsers";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCheckLoginParams } from "../../slice/sliceUsers";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = (values) => {
    dispatch(userLogin(values))
      .then(unwrapResult)
      .then((res) => {
        dispatch(setCheckLoginParams(true));
      })
      .catch((err) => {
        dispatch(setCheckLoginParams(false));
        message.error(err.detail);
      });
  };
  return (
    <Form style={{ width: "100%" }} onFinish={onLogin}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Пожалуйста, введите e-mail!" }]}
      >
        <Input placeholder="E-mail..." className="password-form" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password placeholder="Пароль..." className="password-form" />
      </Form.Item>
      <Form.Item>
        <Button
          type="text"
          size="large"
          block
          style={{ padding: 0, border: "none" }}
          htmlType="submit"
        >
          <Tilt
            glareEnable
            glareMaxOpacity={0.15}
            glareColor="#ffffff"
            glarePosition="bottom"
            tiltAxis="y"
            scale={1.1}
            transitionSpeed={2500}
          >
            <Button type="text" className="btnLogin" size="large" ghost block>
              Войти <LoginOutlined className="hiddenPhone" />
            </Button>
          </Tilt>
        </Button>
      </Form.Item>
    </Form>
  );
}
