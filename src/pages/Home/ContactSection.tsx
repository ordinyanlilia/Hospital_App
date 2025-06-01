import { Form, Input, Button, Typography } from 'antd';

const ContactSection = () => (
  <div style={{ padding: '4rem 2rem', background: '#fff' }}>
    <Typography.Title level={2} style={{ textAlign: 'center' }}>Contact Us</Typography.Title>
    <Form layout="vertical" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Message" name="message" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Send</Button>
      </Form.Item>
    </Form>
  </div>
);

export default ContactSection;
