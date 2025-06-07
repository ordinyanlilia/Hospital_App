import "./Login.css";
import { useState } from "react";
import { Button, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { DOCTOR_PAGE, PROFILE, SIGNUP } from "../../routes/paths.ts";
import { auth, fetchData } from "../../services/apiService.ts";
import { type Patient, setPatient } from "../../features/PatientSlice.ts";
import { type Doctor } from "../../features/DoctorSlice.ts";
import { setUser } from "../../features/UserSlice.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fetchAppointments, resetStatus } from "../../features/appointments/appointmentsSlice.ts";
import { useTheme } from "../../context/theme-context.tsx";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { darkMode } = useTheme();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      localStorage.setItem("authToken", token);

      const [allPatients, allDoctors] = await Promise.all([
        fetchData<Patient>("patients"),
        fetchData<Doctor>("doctors"),
      ]);

      const matchedPatient = allPatients.find((p) => p.id === firebaseUser.uid);
      const matchedDoctor = allDoctors.find((d) => d.id === firebaseUser.uid);

      if (matchedDoctor) {
        dispatch(setUser({ data: matchedDoctor, role: "doctor", token }));
        await dispatch(
          fetchAppointments({ appointments: matchedDoctor?.appointments })
        );
        navigate(DOCTOR_PAGE);
      } else if (matchedPatient) {
        dispatch(setPatient(matchedPatient));
        try {
          await dispatch(
            fetchAppointments({ appointments: matchedPatient?.appointments })
          );
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(resetStatus());
        }
        dispatch(setUser({ data: matchedPatient, role: "patient", token }));
        navigate(PROFILE);
      } else {
        setError("User found in Firebase but not in database.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div
      style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
      className="login-container"
    >
      <Row
        justify="center"
        align="top"
        style={{
          padding: "2rem",
        }}
      >
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          className="login-form"
          style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input size="middle" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password size="middle" />
          </Form.Item>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => navigate(SIGNUP)} block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default Login;
