import "./Signup.css";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, DatePicker, Card, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN } from "../../routes/paths";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { fetchData } from "../../services/apiService";
import { selectPatientStatus, setPatient } from "../../features/PatientSlice";
import { selectDoctorStatus } from "../../features/DoctorSlice";
import { type Patient } from "../../features/PatientSlice";
import { type Doctor } from "../../features/DoctorSlice";
import { auth } from "../../services/apiService";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { setData } from "../../services/apiService";
import { setEmailVerified } from "../../features/UserSlice";
import loginImage from "../../assets/login-image.jpg";
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
  const { darkMode } = useTheme();
  useEffect(() => {
    if (patientStatus === "succeeded" || doctorStatus === "succeeded") {
      navigate(LOGIN);
    }
  }, [patientStatus, doctorStatus, navigate]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      const [allPatients, allDoctors] = await Promise.all([
        fetchData<Patient>("patients"),
        fetchData<Doctor>("doctors"),
      ]);

      const emailExistsInPatients = allPatients.find(
        (p) => p.email === values.email
      );
      const emailExistsInDoctors = allDoctors.find(
        (d) => d.email === values.email
      );

      if (emailExistsInPatients || emailExistsInDoctors) {
        navigate(LOGIN);
        return;
      }

      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      const firebaseUID = firebaseUser.uid;
      const token = await firebaseUser.getIdToken();

      await sendEmailVerification(firebaseUser)
        .then(() => {
          console.log("Verification email sent.");
        })
        .catch((error) => {
          console.error("Error sending email verification:", error);
        });

      if (selectedRole === "patient") {
        if (!values.dob || !values.dob.isValid())
          throw new Error("Date of birth is invalid or missing");

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
          allergies: [],
          currentMedications: [],
          medicalHistory: [],
          appointments: [],
        };

        await setData("patients", newPatient, firebaseUID);
        dispatch(setPatient(newPatient));
        dispatch(setEmailVerified(false));
        navigate(LOGIN, { state: { signupSuccess: true } });
      }

      if (selectedRole === "doctor") {
        const newDoctor: Partial<Doctor> = {
          id: firebaseUID,
          name: values.name,
          surname: values.surname,
          yearsOfExperience: parseInt(values.yearsOfExperience),
          gender: values.gender,
          specialty: values.specialty,
          email: values.email,
        };
        await setData("doctors", newDoctor, firebaseUID);
        navigate(LOGIN, { state: { signupSuccess: true } });
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div
      style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
      className="signup-root"
    >
      <div className="signup-wrapper">
        <div className="signup-visual">
          <img
            src={loginImage}
            alt="Digital illustration"
            className="signup-image"
          />
          <h2>Create your digital health account</h2>
        </div>
        <div
          style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
          className="signup-container"
        >
          {!selectedRole ? (
            <Space
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
              direction="horizontal"
              size="large"
            >
              <Card
                title="Sign up as Patient"
                hoverable
                onClick={() => setSelectedRole("patient")}
                style={{ width: 250, cursor: "pointer" }}
              >
                Manage your records and appointments.
              </Card>
              <Card
                title="Sign up as Doctor"
                hoverable
                onClick={() => setSelectedRole("doctor")}
                style={{ width: 250, cursor: "pointer" }}
              >
                Manage patients and schedules.
              </Card>
            </Space>
          ) : (
            <Form
              name="signup"
              onFinish={onFinish}
              form={form}
              layout="vertical"
              className="signup-form"
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
            >
              <Form.Item
                name="name"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="surname"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              {selectedRole === "patient" && (
                <>
                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    rules={[
                      {
                        required: true,
                        message: "Please select your date of birth",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              )}

              {selectedRole === "doctor" && (
                <>
                  <Form.Item
                    name="specialty"
                    label="Specialty"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="yearsOfExperience"
                    label="Years of Experience"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </>
              )}

              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, min: 6 }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button onClick={() => setSelectedRole(null)}>Back</Button>
                </Space>
              </Form.Item>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
