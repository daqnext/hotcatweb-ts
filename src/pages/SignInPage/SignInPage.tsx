/*
 * @Author: your name
 * @Date: 2021-07-16 15:06:05
 * @LastEditTime: 2021-07-17 13:19:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/SignInPage/SignInPage.tsx
 */

import React from "react";
import { GlobalData } from "../../global/global";
import { IUserInfo } from "../../interface/interface";
import DashboardLayout from "../../layout/DashboardLayout";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";
import { Utils } from "../../utils/Utils";
interface Props {}

interface State {
    email: string;
    password: string;
    captcha: string;
    captchaId: string;
    captchaBase64: string;
}

class SignInPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            captcha: "",
            captchaId: "",
            captchaBase64:
                "data:image/png;base64,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",
        };
    }
    componentDidMount() {
        this.getCaptcha();
    }

    getCaptcha() {
        Utils.getCaptcha().then((data) => {
            if (data === null) {
                //get captcha error
                console.log("get captcha failed");
                (window as any).notify("error", "get captcha failed", "error");
            } else {
                this.setState({
                    captchaBase64: "data:image/png;base64,"+data.captchaBase64,
                    captchaId: data.captchaId,
                });
            }
        });
    }

    checkEmail(): boolean {
        if (!Utils.checkEmailFormat(this.state.email)) {
            //email format error
            (window as any).notify("error", "Please input correct email", "error");
            return false;
        }
        return true;
    }

    checkCaptcha(): boolean {
        if (this.state.captcha.length !== 4) {
            //chapter length error
            (window as any).notify("error", "Captcha error", "error");
            return false;
        }
        return true;
    }

    checkPassword(): boolean {
        if (this.state.password.length < 6 || this.state.password.length > 20) {
            //password length error
            (window as any).notify("error", "Password length should be 6~20", "error");
            return false;
        }
        return true;
    }

    async login() {
        if (!this.checkEmail()) {
            return;
        }

        if (!this.checkPassword()) {
            return;
        }

        if (!this.checkCaptcha()) {
            return;
        }

        const url = GlobalData.apiHost + "/api/user/login";
        const sendData = {
            email: this.state.email,
            passwd: this.state.password,
            captcha: this.state.captcha,
            captchaId: this.state.captchaId,
        };
        const responseData = await RequestTool.post<IUserInfo>(url, sendData);
        if (responseData === null) {
            //request error
            (window as any).notify("error", "SignIn error", "error");
            return;
        }
        if (responseData && responseData.status !== 0) {
            //error
            console.log(responseData.msg);
            (window as any).notify("error", responseData.msg, "error");
            return;
        }

        //register success
        //auto login
        const userInfo: IUserInfo = responseData.data;
        UserManager.SetUserToken(userInfo.cookie);
        //UserManager.SetUserInfo(userInfo)

        //show login success msg
        (window as any).notify("success", "SignIn success", "error");

        //to index page
        window.location.href = "/index";
    }

    render() {
        return (
            <DashboardLayout>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 px-lg-4">
                            <div className="card">
                                <div className="card-header px-lg-5">
                                    <div className="card-heading text-primary">Sign In</div>
                                </div>
                                <div className="card-body p-lg-5">
                                    <h3 className="mb-4">Hi, welcome back! 👋👋</h3>
                                    <p className="text-muted text-sm mb-5">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore.
                                    </p>
                                    <form id="loginForm" action="index.html">
                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control"
                                                id="floatingInput"
                                                type="email"
                                                placeholder="name@example.com"
                                                onChange={(event) => {
                                                    this.setState({
                                                        email: event.target.value.trim(),
                                                    });
                                                }}
                                            />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control"
                                                id="floatingPassword"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(event) => {
                                                    this.setState({
                                                        password: event.target.value.trim(),
                                                    });
                                                }}
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        <div className="">
                                            <div className="form-floating col-3">
                                                <input
                                                    className="form-control"
                                                    id="captcha"
                                                    type="text"
                                                    placeholder="captcha"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            captcha: event.target.value.trim(),
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="captcha">captcha</label>
                                            </div>

                                            <div className="input-group col-3">
                                                <img
                                                    src={this.state.captchaBase64}
                                                    alt="click to refresh"
                                                    onClick={() => {
                                                        this.getCaptcha();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember"/>
                                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                                    </div> */}
                                        <div className="btn btn-primary btn-lg"
                                        onClick={()=>{
                                            this.login()
                                        }}
                                        >Sign In</div>
                                    </form>
                                </div>
                                <div className="card-footer px-lg-5 py-lg-4">
                                    <div className="text-sm text-muted">
                                        Don't have an account?{" "}
                                        <a href="/signup">Register</a>.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary">
                            <img
                                className="img-fluid mb-4"
                                width="300"
                                src="/img/drawkit-illustration.svg"
                                alt=""
                                style={{ transform: "rotate(10deg)" }}
                            />
                            <h1 className="mb-4">
                                something you want <br className="d-none d-lg-inline" />
                                to type here
                            </h1>
                            <p className="lead text-muted">
                                somethign your want say to user when he comes back!
                            </p>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default SignInPage;
