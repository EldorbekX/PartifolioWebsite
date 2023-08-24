import React, { useContext, useState } from "react";
import { ROLE, TOKEN, USER } from "../../constants/index";
import { request } from "../../request/index";

import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { Containers } from "../../styles";

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  // const navigate = useNavigate();

  const login = async (form: FormValues) => {
    try {
      setLoading(true);
      const {
        data: { token, user },
      } = await request.post("auth/login", form);
      console.log(user);
      const Rols = user?.role;
      localStorage.setItem(`AlbomID`, user._id);
      setIsAuthenticated(true);
      if (Rols === "admin") {
        window.location.href = "/dashboard";
      } else if (Rols === "client") {
        window.location.href = "/account";
      } else if (Rols === "user") {
        alert("Siz Clint emassiz adminga murojat qiling!");
      }
      // console.log(role);

      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, Rols);
      Cookies.set(USER, user);
    } catch (err) {
      console.log(
        "Please enter your information in detail and correctly.",
        err
      );
    } finally {
      setLoading(false);
    }
  };
  const formItemLayout = {
    labelCol: {
      md: { span: 6 },
    },
  };

  return (
    <Containers>
      <div id="login" style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ marginTop: "200px", width: "400px" }}
          className="loginInput text-center"
        >
          <h2 className="containr text-center text-4xl py-5 font-semibold">
            LogIn
          </h2>
          <Form
            name="login"
            onFinish={login}
            {...formItemLayout}
            className="text-center"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              hasFeedback
            >
              <Input
                style={{ height: "50px" }}
                placeholder="username"
                className="w-1/2 border mb-3"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              hasFeedback
            >
              <Input.Password
                style={{ height: "50px" }}
                placeholder="password"
                className="w-1/2 border mb-3"
              />
            </Form.Item>
            <div className="buttonlogin">
              <Button htmlType="submit" disabled={loading}>
                {loading ? "sjijsiji" : "Login"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Containers>
  );
};

export default Login;
