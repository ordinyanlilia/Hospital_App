import type { FormProps } from "antd";
import {
  Button,
  Row,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { LOGIN, PROFILE } from "../../routes/paths.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useState, useEffect } from "react";
import { fetchData } from "../../services/apiServices.ts";
import {
  addPatient,
  selectPatientStatus,
} from "../../features/PatientSlice.ts";
import { addDoctor, selectDoctorStatus } from "../../features/DoctorSlice.ts";
import { type Patient } from "../../features/PatientSlice.ts";
import { type Doctor } from "../../features/DoctorSlice.ts";
import { auth } from "../../services/apiServices.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setData } from "../../services/apiServices.ts";
import { setUser } from "../../features/UserSlice.ts";
import { FirebaseError } from "firebase/app";
import { useTheme } from "../../context/theme-context.tsx";
const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patientStatus = useAppSelector(selectPatientStatus);
  const doctorStatus = useAppSelector(selectDoctorStatus);
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(
    null
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (patientStatus === "succeeded" || doctorStatus === "succeeded") {
      navigate(LOGIN);
    } else if (patientStatus === "failed" || doctorStatus === "failed") {
      messageApi.open({
        type: "error",
        content: "There was an error while signing",
      });
    }
  }, [patientStatus, doctorStatus, navigate]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      const firebaseUID = firebaseUser.uid;
      const token = await firebaseUser.getIdToken();

      if (selectedRole === "patient") {
        if (!values.dob || !values.dob.isValid())
          throw new Error("Date of birth is invalid or missing");

        const allPatients: Patient[] = await fetchData("patients");
        const exists = allPatients.find((p) => p.email === values.email);
        if (exists) return navigate(PROFILE);

        const newPatient: Patient = {
          id: firebaseUID,
          name: values.name,
          surname: values.surname,
          dob: values.dob?.toISOString(),
          gender: values.gender,
          email: values.email,
          phoneNumber: values.phoneNumber,
          bloodType: "unknown",
          registeredAt: new Date().toISOString(),
          password: values.password,
          allergies: [],
          currentMedications: [],
          medicalHistory: [],
          appointments: [],
        };

        await setData("patients", newPatient, firebaseUID);
        dispatch(addPatient(newPatient));
        dispatch(setUser({ data: newPatient, role: "patient", token }));
      }

      if (selectedRole === "doctor") {
        const allDoctors = await fetchData("doctors");
        const exists = allDoctors.find((d) => d.email === values.email);
        if (exists) return navigate(PROFILE);

        const newDoctor: Doctor = {
          id: firebaseUID,
          name: values.name,
          surname: values.surname,
          yearsOfExperience: parseInt(values.yearsOfExperience),
          gender: values.gender,
          specialty: values.specialty,
          email: values.email,
          password: values.password,
        };

        await setData("doctors", newDoctor, firebaseUID);
        dispatch(addDoctor(newDoctor));
        dispatch(setUser({ data: newDoctor, role: "doctor", token }));
      }
    } catch (err) {
      console.error("Firebase error:", err);

      let messageText = "Something went wrong. Please try again.";

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/weak-password":
            messageText = "Your password must be at least 6 characters.";
            break;
          case "auth/email-already-in-use":
            messageText = "This email is already registered.";
            break;
          case "auth/invalid-email":
            messageText = "Please enter a valid email address.";
            break;
          default:
            messageText = err.message;
            break;
        }

        messageApi.open({
          type: "error",
          content: messageText,
        });
      }
    }
  };
  const { darkMode } = useTheme();

  return (
    <Row justify="center" align="top" style={{ padding: "2rem" }}>
      {contextHolder}
      {!selectedRole && (
        <Space direction="horizontal">
          <Card
            title="Sign up as Patient"
            hoverable
            onClick={() => setSelectedRole("patient")}
            style={{ width: 300, cursor: "pointer" }}
          >
            Register to manage your health records and appointments.
          </Card>
          <Card
            title="Sign up as Doctor"
            hoverable
            onClick={() => setSelectedRole("doctor")}
            style={{ width: 300, cursor: "pointer" }}
          >
            Join to manage patients and appointments.
          </Card>
        </Space>
      )}

      {selectedRole && (
        <Form
          name="signup"
          onFinish={onFinish}
          form={form}
          layout="vertical"
          style={{
            width: 500,
            backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please write your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Please write your surname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          {selectedRole === "patient" && (
            <>
              <Form.Item
                label="Birth Date"
                name="dob"
                style={{
                  backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#000000",
                }}
                rules={[{ required: true, message: "Birth date is required" }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]{7,15}$/,
                    message: "Enter a valid phone number",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          {selectedRole === "doctor" && (
            <>
              <Form.Item
                label="Years of Experience"
                name="yearsOfExperience"
                rules={[
                  { required: true, message: "Enter years of experience" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Specialty"
                name="specialty"
                rules={[{ required: true, message: "Enter your speciality" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => setSelectedRole(null)}>Back</Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Row>
  );
};

export default Signup;
