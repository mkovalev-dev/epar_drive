import { Avatar, Col, message, Row, Space } from "antd";
import nophoto from "../resources/img/nophoto.png";
import { UploadOutlined } from "@ant-design/icons";
import {
  setCheckLoginParams,
  userLoginData,
  userLogout,
} from "../pages/slice/sliceUsers";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileBlockInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateUserData = useSelector(userLoginData);
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className="profile-main-block vr-center-items">
          <Space>
            <div className="avatar">
              <Avatar size={45} src={nophoto} />
            </div>
            <div style={{ marginLeft: "5px" }}>
              <p style={{ margin: 0 }}>
                {stateUserData.last_name} {stateUserData.first_name}{" "}
                {stateUserData.patronymic}
              </p>
              <p
                style={{
                  margin: 0,
                  color: "rgba(166,166,166,0.29)",
                  fontSize: "12px",
                }}
              >
                {stateUserData?.groups[0]?.name}
              </p>
            </div>
            <UploadOutlined
              title="Выход"
              rotate={-90}
              className="logout"
              onClick={() => {
                dispatch(userLogout())
                  .then(unwrapResult)
                  .then(() => {
                    navigate("/");
                    dispatch(setCheckLoginParams(false));
                  })
                  .catch((err) => {
                    message.error("Не удалось выполнить выход из системы!");
                  });
              }}
            />
          </Space>
        </div>
      </Col>
    </Row>
  );
}
