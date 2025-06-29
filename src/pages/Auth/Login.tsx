import "./Login.css";
import React, { useRef, useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNUP, PROFILE, DOCTOR_PAGE } from "../../routes/paths";
import { fetchData } from "../../services/apiService";
import { setPatient, type Patient } from "../../features/PatientSlice";
import { type Doctor } from "../../features/DoctorSlice";
import { setEmailVerified, setUser } from "../../features/UserSlice";
import { useAppDispatch } from "../../app/hooks";
import { auth } from "../../services/apiService";
import { signInWithEmailAndPassword } from "firebase/auth";
import loginImage from "../../assets/login-image.jpg";
import { useTheme } from "../../context/theme-context.tsx";
import { useTranslate } from "../../context/TranslationProvider.tsx";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hasNavigated = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { darkMode } = useTheme();
  const [form] = Form.useForm();
  const signupSuccess = location.state?.signupSuccess;

  useEffect(() => {
    if (signupSuccess && !hasNavigated.current) {
      messageApi.open({
        type: "success",
        content: translate("successSigned"),
      });
      hasNavigated.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [signupSuccess, location.pathname, navigate]);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      const token = await firebaseUser.getIdToken();

      localStorage.setItem("authToken", token);

      const [allPatients, allDoctors] = await Promise.all([
        fetchData("patients") as Promise<Patient[]>,
        fetchData("doctors") as Promise<Doctor[]>,
      ]);

      const matchedPatient = allPatients.find((p) => p.id === firebaseUser.uid);
      const matchedDoctor = allDoctors.find((d) => d.id === firebaseUser.uid);

      if (matchedDoctor) {
        dispatch(setUser({ data: matchedDoctor, role: "doctor", token }));
        dispatch(setEmailVerified(true));
        navigate(DOCTOR_PAGE);
      } else if (matchedPatient) {
        dispatch(setUser({ data: matchedPatient, role: "patient", token }));
        dispatch(setPatient(matchedPatient));
        dispatch(setEmailVerified(true));
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
    <>
      {contextHolder}
      <div
        style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
        className="login-root"
      >
        <div className="login-wrapper">
          <div className="login-visual">
            <img
              src={loginImage}
              alt="Digital illustration"
              className="login-image"
            />
            <h2>{translate("oneClick")}</h2>
          </div>
          <div
            style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
            className="login-container"
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
                label= {translate("mail")}
                rules={[{ required: true, type: "email" }]}
              >
                <Input size="middle" />
              </Form.Item>
              <Form.Item
                name="password"
                label={translate("password")}
                rules={[{ required: true }]}
              >
                <Input.Password size="middle" />
              </Form.Item>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {translate("login")}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={() => navigate(SIGNUP)} block>
                  {translate("signUp")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
