import {Button, Col, List, Row, Space, Typography} from "antd";
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";
import profileImage from '../../../assets/images/profile-photo.jpg'
import {type Patient} from "../../../services/apiService.ts";
import dayjs from "dayjs";
const {Text} = Typography;

const UserInfo = ({user, onSetIsEditing}: { user: Patient | undefined, onSetIsEditing: MouseEventHandler<HTMLElement> }) => {
    const registeredDate = dayjs(user?.registeredAt).format('MMM D, YYYY');
    const dobDate = dayjs(user?.dob).format('DD/MM/YYYY');
    return (
        <Row gutter={[16, 16]} className={'profile'}>
            <Col span={8}>
                <div className="profile-main-info">
                    <img src={profileImage} alt="profile picture"/>
                    <h3>{user?.name} {user?.surname}</h3>
                    <p><PhoneOutlined/>{user?.phoneNumber}</p>
                    <p><MailOutlined/>{user?.email}</p>
                    <Space direction="vertical">
                        <Text type="secondary" strong>
                            Registered At:{registeredDate}
                        </Text>
                        <Button onClick={onSetIsEditing}>Edit Profile</Button>
                    </Space>

                </div>
            </Col>
            <Col span={8}>
                <div className="profile-details">
                    <Text type="secondary" strong>Gender</Text>
                    <p>{user?.gender}</p>
                    <Text type="secondary" strong>Date of Birth</Text>
                    <p>{dobDate}</p>
                    <Text type="secondary" strong>Blood</Text>
                    <p>{user?.bloodType}</p>
                    <Text type="secondary" strong>Allergies</Text>
                    <List
                        size="small"
                        itemLayout={'horizontal'}
                        dataSource={user?.allergies}
                        renderItem={(item: string) => <List.Item>{item}</List.Item>}
                    />
                </div>
            </Col>
            <Col span={6}>
                <div className="profile-history">
                    <Text type="secondary" strong>Medical History</Text>
                    <List
                        size="small"
                        dataSource={user?.medicalHistory}
                        renderItem={(item: string) => <List.Item>{item}</List.Item>}
                    />
                    <Text type="secondary" strong>Current Medications</Text>
                    <List
                        size="small"
                        dataSource={user?.currentMedications}
                        renderItem={(item: string) => <List.Item>{item}</List.Item>}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default UserInfo;