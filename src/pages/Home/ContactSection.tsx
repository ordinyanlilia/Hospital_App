import { Form, Input, Button, Typography } from "antd";
import { useTheme } from "../../context/theme-context";

const ContactSection = () => {
  const { darkMode } = useTheme();
  return (
    <div
      style={{
        padding: "4rem 2rem",
        background: darkMode ? "#141414" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <Typography.Title
        level={2}
        style={{
          textAlign: "center",
          background: darkMode ? "#141414" : "#f5f5f5",
          color: darkMode ? "#ffffff" : "#000000",
        }}
      >
        Contact Us
      </Typography.Title>
      <Form
        layout="vertical"
        style={{
          maxWidth: 600,
          margin: "auto",
          background: darkMode ? "#141414" : "#f5f5f5",
          color: darkMode ? "#ffffff" : "#000000",
        }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactSection;
