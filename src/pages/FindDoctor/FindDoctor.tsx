import { Input, Select, Button } from "antd";
import {
  SearchOutlined,
  MedicineBoxOutlined,
  UserOutlined,
} from "@ant-design/icons";

const FindDoctor = () => {
  return (
    <div>
      <Input placeholder="Search By Name" prefix={<SearchOutlined />} />
      <Select
        showSearch
        style={{ width: 200 }}
        prefix={<MedicineBoxOutlined />}
        placeholder="Select Speciality"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "1",
            label: "Not Identified",
          },
          {
            value: "2",
            label: "Closed",
          },
          {
            value: "3",
            label: "Communicated",
          },
          {
            value: "4",
            label: "Identified",
          },
          {
            value: "5",
            label: "Resolved",
          },
          {
            value: "6",
            label: "Cancelled",
          },
        ]}
      />
      <Select
        showSearch
        style={{ width: 200 }}
        prefix={<UserOutlined />}
        placeholder="Select Gender"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "1",
            label: "Not Identified",
          },
          {
            value: "2",
            label: "Male",
          },
          {
            value: "3",
            label: "Female",
          },
          {
            value: "4",
            label: "Identified",
          },
        ]}
      />
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
    </div>
  );
};

export default FindDoctor;
