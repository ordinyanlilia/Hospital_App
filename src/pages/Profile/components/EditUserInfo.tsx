import {
  Button,
  Col,
  DatePicker,
  Flex,
  Input,
  List,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  DeleteTwoTone,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { type ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import ImgUploader from "./ImgUploader.tsx";
import {
  editPatient,
  type Patient,
  selectPatient,
} from "../../../features/PatientSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useTheme } from "../../../context/theme-context.tsx";
import { useTranslate } from "../../../context/TranslationProvider.tsx";

const { Text } = Typography;
const { Option } = Select;

const EditUserInfo = ({ onSetIsEditing }: { onSetIsEditing: () => void }) => {
  const user: Patient | null = useAppSelector(selectPatient);
  const dispatch = useAppDispatch();
  const { darkMode } = useTheme();
  const { translate } = useTranslate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    bloodType: user?.bloodType || "",
    allergies: user?.allergies || [],
    currentMedications: user?.currentMedications || [],
    imageUrl: user?.imageUrl || "",
  });

  const handleChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value ?? e;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleListChange = (
    field: "allergies" | "currentMedications",
    index: number,
    value: string
  ) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedList }));
  };

  const handleAddListItem = (field: "allergies" | "currentMedications") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleDeleteListItem = (
    field: "allergies" | "currentMedications",
    index: number
  ) => {
    const updatedList = formData[field].filter(
      (_item: string, i: number) => i !== index
    );
    setFormData((prev) => ({ ...prev, [field]: updatedList }));
  };

  const handleSave = async () => {
    if (user && user?.doc_id) {
      dispatch(
        editPatient({
          user_doc_id: user?.doc_id,
          data: formData,
        })
      );
    }
    onSetIsEditing();
  };

  const handleDateChange = (date: dayjs.Dayjs) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dob: date.toISOString() }));
    }
  };

  const handleImageFileChange = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  return (
    <Row
      gutter={[16, 16]}
      className="profile"
      style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
    >
      <Col span={8}>
        <Flex vertical gap={"small"}>
          <ImgUploader
            imageUrl={formData.imageUrl}
            onSetFormData={handleImageFileChange}
          />
          <Text type="secondary" strong className={"blue-text"}>
            {translate("name1")}
          </Text>
          <Input
            placeholder={translate("name1")}
            value={formData.name}
            onChange={handleChange("name")}
          />
          <Text type="secondary" strong className={"blue-text"}>
            {translate("surname")}
          </Text>
          <Input
            placeholder={translate("surname")}
            value={formData.surname}
            onChange={handleChange("surname")}
          />
          <Text type="secondary" strong className={"blue-text"}>
            {translate("phoneNumber")}
          </Text>
          <Input
            prefix={<PhoneOutlined />}
            placeholder={translate("phoneNumber")}
            value={formData.phoneNumber}
            onChange={handleChange("phoneNumber")}
          />
          <Text type="secondary" strong className={"blue-text"}>
            {translate("mail")}
          </Text>
          <Input
            prefix={<MailOutlined />}
            placeholder={translate("mail")}
            value={formData.email}
            onChange={handleChange("email")}
          />
          <Space align={"center"}>
            <Button onClick={handleSave}>{translate("save")}</Button>
            <Button
              onClick={() => onSetIsEditing()}
              danger
              style={{ marginLeft: 8 }}
            >
              {translate("cancel")}
            </Button>
          </Space>
        </Flex>
      </Col>

      <Col span={8}>
        <div className="profile-details">
          <Text type="secondary" strong className={"blue-text"}>
            {translate("gender")}
          </Text>
          <Select
            value={formData.gender}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, gender: value }))
            }
            style={{ width: "100%" }}
          >
            <Option value="male">{translate("male")}</Option>
            <Option value="female">{translate("female")}</Option>
            <Option value="other">{translate("other")}</Option>
          </Select>

          <Text type="secondary" strong className={"blue-text"}>
            {translate("dateOfBirth")}
          </Text>
          <DatePicker
            value={dayjs(formData.dob, "YYYY/MM/DD")}
            format={"YYYY/MM/DD"}
            onChange={handleDateChange}
            style={{ width: "100%" }}
          />

          <Text type="secondary" strong className={"blue-text"}>
            {translate("bloodType")}
          </Text>
          <Input
            placeholder={translate("bloodType")}
            value={formData.bloodType}
            onChange={handleChange("bloodType")}
          />

          <Text type="secondary" strong className={"blue-text"}>
            {translate("allergies")}
          </Text>
          <List
            className={"edit-list"}
            dataSource={formData.allergies}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                style={{
                  border: "none",
                  padding: "8px",
                }}
              >
                <Input
                  size={"middle"}
                  value={item}
                  onChange={(e) =>
                    handleListChange("allergies", index, e.target.value)
                  }
                />
                <DeleteTwoTone
                  onClick={() => handleDeleteListItem("allergies", index)}
                  style={{ cursor: "pointer", marginLeft: 8 }}
                />
              </List.Item>
            )}
          />
          <Button onClick={() => handleAddListItem("allergies")}>
            {translate("addAllergy")}
          </Button>
        </div>
      </Col>

      <Col span={8}>
        <div className="profile-history">
          <Text type="secondary" strong className={"blue-text"}>
            {translate("currentMed")}
          </Text>
          <List
            dataSource={formData.currentMedications}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                style={{
                  border: "none",
                  padding: "8px",
                }}
              >
                <Input
                  value={item}
                  onChange={(e) =>
                    handleListChange(
                      "currentMedications",
                      index,
                      e.target.value
                    )
                  }
                />
                <DeleteOutlined
                  style={{ cursor: "pointer", marginLeft: 8 }}
                  onClick={() =>
                    handleDeleteListItem("currentMedications", index)
                  }
                />
              </List.Item>
            )}
          />
          <Button onClick={() => handleAddListItem("currentMedications")}>
            {translate("addMedication")}
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default EditUserInfo;
