import {Button, Col, DatePicker, Flex, Input, List, Row, Select, Space, Typography,} from "antd";
import {DeleteOutlined, DeleteTwoTone, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import {type Patient, updateData} from "../../../services/apiService";
import {type ChangeEvent, useState} from "react";
import dayjs from "dayjs";

const {Text} = Typography;
const {Option} = Select;

const EditUserInfo = ({
                          user,
                          onSetIsEditing,
                      }: {
    user: Patient | undefined;
    onSetIsEditing: React.MouseEventHandler<HTMLElement>;
}) => {

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
    });

    const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value ?? e;
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleListChange = (field: "allergies" | "currentMedications", index: number, value: string) => {
        const updatedList = [...formData[field]];
        updatedList[index] = value;
        setFormData((prev) => ({...prev, [field]: updatedList}));
    };

    const handleAddListItem = (field: "allergies" | "currentMedications") => {
        setFormData((prev) => ({...prev, [field]: [...prev[field], ""]}));
    };

    const handleDeleteListItem = (field: "allergies" | "currentMedications", index: number) => {
        const updatedList = formData[field].filter((_item: string, i: number) => i !== index);
        console.log(updatedList);
        setFormData((prev) => ({...prev, [field]: updatedList}));
    }

    const handleSave = async () => {
        await updateData<Patient>('2e3C5vE5WSVC6LJ9Zjc0', 'patients', formData)
        onSetIsEditing();
    };

    const handleDateChange = (date: Date) => {
        if (date) {
            setFormData((prev) => ({...prev, dob: date.toISOString()}));
        }
    }

    return (
        <Row gutter={[16, 16]} className="profile">
            <Col span={8}>
                <Flex vertical gap={'small'}>
                    <Text type="secondary" strong className={'blue-text'}>Name</Text>
                    <Input
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange("name")}
                    />
                    <Text type="secondary" strong className={'blue-text'}>Surname</Text>
                    <Input
                        placeholder="Surname"
                        value={formData.surname}
                        onChange={handleChange("surname")}
                    />
                    <Text type="secondary" strong className={'blue-text'}>Phone Number</Text>
                    <Input
                        prefix={<PhoneOutlined/>}
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                    />
                    <Text type="secondary" strong className={'blue-text'}>Email</Text>
                    <Input
                        prefix={<MailOutlined/>}
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange("email")}
                    />
                    <Space align={'center'}>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={onSetIsEditing} danger style={{marginLeft: 8}}>
                            Cancel
                        </Button>
                    </Space>

                </Flex>
            </Col>

            <Col span={8}>
                <div className="profile-details">
                    <Text type="secondary" strong className={'blue-text'} className={'blue-text'}>Gender</Text>
                    <Select
                        value={formData.gender}
                        onChange={(value) => setFormData((prev) => ({...prev, gender: value}))}
                        style={{width: '100%'}}
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>

                    <Text type="secondary" strong className={'blue-text'}>Date of Birth</Text>
                    <DatePicker
                        value={dayjs(formData.dob, 'YYYY/MM/DD')}
                        format={'YYYY/MM/DD'}
                        onChange={handleDateChange}
                        style={{width: '100%'}}
                    />

                    <Text type="secondary" strong className={'blue-text'}>Blood Type</Text>
                    <Input
                        placeholder="Blood Type"
                        value={formData.bloodType}
                        onChange={handleChange("bloodType")}
                    />

                    <Text type="secondary" strong className={'blue-text'}>Allergies</Text>
                    <List
                        className={'edit-list'}
                        dataSource={formData.allergies}
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                style={{
                                    border: 'none',
                                    padding: '8px',
                                }}>
                                <Input
                                    size={'middle'}
                                    value={item}
                                    onChange={(e) =>
                                        handleListChange("allergies", index, e.target.value)
                                    }
                                />
                                <DeleteTwoTone
                                    onClick={() => handleDeleteListItem("allergies", index)}
                                    style={{cursor: 'pointer', marginLeft: 8}}
                                />
                            </List.Item>
                        )}
                    />
                    <Button onClick={() => handleAddListItem("allergies")}>Add Allergy</Button>
                </div>
            </Col>

            <Col span={8}>
                <div className="profile-history">
                    <Text type="secondary" strong className={'blue-text'}>Current Medications</Text>
                    <List
                        dataSource={formData.currentMedications}

                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                style={{
                                    border: 'none',
                                    padding: '8px',
                                }}>
                                <Input
                                    value={item}
                                    onChange={(e) =>
                                        handleListChange("currentMedications", index, e.target.value)
                                    }
                                />
                                <DeleteOutlined
                                    style={{cursor: 'pointer', marginLeft: 8}}
                                    onClick={() => handleDeleteListItem("currentMedications", index)}/>
                            </List.Item>
                        )}
                    />
                    <Button onClick={() => handleAddListItem("currentMedications")}>
                        Add Medication
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

export default EditUserInfo;
