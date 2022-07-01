import { Button, Form, Input } from "antd";
import Tilt from "react-parallax-tilt";

export default function ResetPassword() {
  const onReset = (values) => {
    console.log(values);
  };
  return (
    <Form style={{ width: "100%" }} onFinish={onReset}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Пожалуйста, введите e-mail!" }]}
      >
        <Input placeholder="E-mail..." className="password-form" />
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
              Восстановить пароль
            </Button>
          </Tilt>
        </Button>
      </Form.Item>
    </Form>
  );
}
