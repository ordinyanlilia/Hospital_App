import {
  Avatar,
  Button,
  Col,
  List,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { MouseEventHandler } from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import {
  selectPatient,
  selectPatientError,
  selectPatientStatus,
} from "../../../features/PatientSlice.ts";
import { useTheme } from "../../../context/theme-context.tsx";
import { useTranslate } from "../../../context/TranslationProvider.tsx";
const { Text } = Typography;

const UserInfo = ({
  onSetIsEditing,
}: {
  onSetIsEditing: MouseEventHandler<HTMLElement>;
}) => {
  const user = useAppSelector(selectPatient);
  const { darkMode } = useTheme();
  const { translate } = useTranslate();
  const registeredDate = dayjs(user?.registeredAt).format("MMM D, YYYY");
  const dobDate = dayjs(user?.dob).format("DD/MM/YYYY");
  const [messageApi, contextHolder] = message.useMessage();

  const status = useAppSelector(selectPatientStatus);
  const error = useAppSelector(selectPatientError);
  if (status === "loading") {
    return <Spin fullscreen>{translate("loading")}</Spin>;
  } else if (status === "error") {
    messageApi.open({
      type: "error",
      content: `${error}`,
    });
  }

  return (
    <Row
      gutter={[16, 16]}
      className={"profile"}
      style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
    >
      {contextHolder}
      <Col span={8}>
        <div className="profile-main-info">
          {!!user?.imageUrl && (
            <img src={user?.imageUrl} alt="profile picture" />
          )}
          {!user?.imageUrl && (
            <Avatar
              size={104}
              style={{ backgroundColor: "rgba(96,150,186,0.75)" }}
              icon={
                <UserOutlined style={{ fontSize: "30px", color: "#fffefe" }} />
              }
            />
          )}
          <h3>
            {user?.name} {user?.surname}
          </h3>
          <p>
            <PhoneOutlined />
            {user?.phoneNumber}
          </p>
          <p>
            <MailOutlined />
            {user?.email}
          </p>
          <Space direction="vertical">
            <Text type="secondary" strong>
              {translate("registeredAt")}{registeredDate}
            </Text>
            <Button onClick={onSetIsEditing}>{translate("editProfile")}</Button>
          </Space>
        </div>
      </Col>
      <Col span={8}>
        <div className="profile-details">
          <Text type="secondary" strong>
            {translate("gender")}
          </Text>
          <p>{user?.gender}</p>
          <Text type="secondary" strong>
            {translate("dateOfBirth")}
          </Text>
          <p>{dobDate}</p>
          <Text type="secondary" strong>
            {translate("bloodType")}
          </Text>
          <p>{user?.bloodType}</p>
          <Text type="secondary" strong>
            {translate("allergies")}
          </Text>
          <List
            size="small"
            itemLayout={"horizontal"}
            dataSource={user?.allergies}
            renderItem={(item: string) => <List.Item>{item}</List.Item>}
          />
        </div>
      </Col>
      <Col span={6}>
        <div className="profile-history">
          <Text type="secondary" strong>
            {translate("medHistory")}
          </Text>
          <List
            size="small"
            dataSource={user?.medicalHistory}
            renderItem={(item: string) => <List.Item>{item}</List.Item>}
          />
          <Text type="secondary" strong>
            {translate("currentMed")}
          </Text>
          <List
            size="small"
            dataSource={user?.currentMedications}
            renderItem={(item: string) => <List.Item>{item}</List.Item>}
          />
        </div>
      </Col>
    </Row>
  );
};

export default UserInfo;
