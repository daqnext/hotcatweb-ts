/*
 * @Author: your name
 * @Date: 2021-07-16 15:06:28
 * @LastEditTime: 2021-07-25 19:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/SignUpPage/SignUpPage.tsx
 */

import React from "react";
import SendCode from "../../components/SendCode/SendCode";
import { GlobalData } from "../../global/global";
import { IUserInfo } from "../../interface/interface";
import DashboardLayout from "../../layout/DashboardLayout";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";
import { Utils } from "../../utils/Utils";

interface Props {}

interface State {
    userName: string;
    email: string;
    vCode: string;
    password: string;
    repeatPassword: string;
    captcha: string;
    captchaId: string;
    captchaBase64: string;
}
class SignUpPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userName: "",
            email: "",
            vCode: "",
            password: "",
            repeatPassword: "",
            captcha: "",
            captchaId: "",
            captchaBase64:
                "data:image/png;base64,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",
        };

        //this.getCaptcha();
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        //UserManager.TokenCheckAndRedirectLogin();
        const info=UserManager.GetUserInfo()
        if (info!==null) {
            //to index page
            window.location.href = "/index";
            return
        }
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

    checkUserName(): boolean {
        if (this.state.userName.length < 4 || this.state.userName.length > 20) {
            //length error
            (window as any).notify("error", "User name length should be 5~20", "error");
            return false;
        }
        if (!Utils.checkUserNameFormat(this.state.userName)) {
            //only letter and number
            (window as any).notify("error", "User name only allow letter and number", "error");
            return false;
        }
        return true;
    }

    checkEmail(): boolean {
        if (!Utils.checkEmailFormat(this.state.email)) {
            //email format error
            (window as any).notify("error", "Please input correct email", "error");
            return false;
        }
        return true;
    }

    checkEmailVCode(): boolean {
        if (this.state.vCode.length !== 4) {
            //vCode length error
            (window as any).notify("error", "Email captcha error", "error");
            return false;
        }

        if (!Utils.checkVCodeFormat(this.state.vCode)) {
            //only letter and number
            (window as any).notify("error", "Email captcha error", "error");
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
        if (this.state.password !== this.state.repeatPassword) {
            //repeat password error
            (window as any).notify("error", "Repeat password error", "error");
            return false;
        }
        return true;
    }

    async getEmailVCode(): Promise<boolean> {
        if (!this.checkEmail()) {
            return false;
        }
        const url = GlobalData.apiHost + "/api/user/getemailvcode";
        const sendData = {
            email: this.state.email,
        };
        const responseData = await RequestTool.post<IUserInfo>(url, sendData);
        if (responseData === null) {
            //request error
            (window as any).notify("error", "send error", "error");
            return true;
        }
        if (responseData && responseData.status !== 0) {
            //error
            console.log(responseData.msg);
            (window as any).notify("error", responseData.msg, "error");
            return false;
        }

        (window as any).notify("success", "send success", "error");
        return true;
    }

    async register() {
        if (!this.checkUserName()) {
            return;
        }

        if (!this.checkEmail()) {
            return;
        }

        if (!this.checkEmailVCode()) {
            return;
        }

        if (!this.checkPassword()) {
            return;
        }

        if (!this.checkCaptcha()) {
            return;
        }

        const url = GlobalData.apiHost + "/api/user/register";
        const sendData = {
            userName: this.state.userName,
            email: this.state.email,
            vCode: this.state.vCode,
            passwd: this.state.password,
            captcha: this.state.captcha,
            captchaId: this.state.captchaId,
        };
        const responseData = await RequestTool.post<IUserInfo>(url, sendData);
        if (responseData === null) {
            //request error
            (window as any).notify("error", "SignUp error", "error");
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

        //show login success msg
        (window as any).notify("success", "SignUp success", "error");

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
                                
                                <div className="card-body p-lg-5">
                                    <h3 className=" mb-4 text-gray">Sign Up</h3>
                                    <form>
                                        
                                        <div className=" mb-3">

                                            <label htmlFor="username" className="form-label text-uppercase">UserName</label>
                                            <input
                                                className="form-control"
                                                id="username"
                                                type="username"
                                                placeholder="UserName"
                                                onChange={(event) => {
                                                    this.setState({
                                                        userName: event.target.value.trim(),
                                                    });
                                                }}
                                            />
                                           
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="floatingInput" className="form-label text-uppercase">Email</label>
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
                                            
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="floatingPassword" className="form-label text-uppercase">Password</label>
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
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="floatingRepeatPassword" className="form-label text-uppercase">Repeat Password</label>
                                            <input className="form-control" id="floatingRepeatPassword"
                                                type="password" placeholder="Repeat Password"
                                                onChange={(event) => {
                                                    this.setState({
                                                        repeatPassword: event.target.value.trim(),
                                                    });
                                                }}
                                            />
                                             
                                        </div>

                                        
  
                                        <div className="mb-3">
                                            <label className="form-label text-uppercase">Email Verification Code</label>
                                            <div className="input-group mb-3">
                                                
                                                <input
                                                    className="form-control"
                                                    id="captcha"
                                                    type="text"
                                                    placeholder="Email Verification Code"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            vCode: event.target.value.trim(),
                                                        });
                                                    }}
                                                />

                                                        <SendCode
                                                            localStorageKey="emailVCodeSendTimeStamp"
                                                            click={async () => {
                                                                return this.getEmailVCode();
                                                            }}
                                                        ></SendCode>

                                            </div>
                                        </div>



                                        <div className="mb-3">
                                            <label className="form-label text-uppercase">captcha</label>
                                            <div className="input-group mb-3">
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

                                            <div className="btn btn-outline-secondary"><img
                                                    className="captchaimg"
                                                    src={this.state.captchaBase64}
                                                    alt="click to refresh"
                                                    onClick={() => {
                                                        this.getCaptcha();
                                                    }}
                                                /></div>

                                            </div>
                                        </div>



                                         
                               
                                        {/* <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="agree"
                                                id="agree"
                                            />
                                            <label className="form-check-label" htmlFor="agree">
                                                I agree with the <a href="#">Terms & Conditions</a>.
                                            </label>
                                        </div> */}
                                        <div className="form-group">
                                            <div
                                                className="btn btn-outline-primary"
                                                id="regidter"
                                                //type="submit"
                                                // name="registerSubmit"
                                                onClick={() => {
                                                    //console.log(this.state);
                                                    this.register()
                                                }}
                                            >
                                                Sign Up
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer px-lg-5 py-lg-4">
                                    <div className="text-sm text-muted">
                                        Already have an account?{" "}
                                        <a href="/signin">Sign In</a>.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-xl-5   px-lg-4 text-center text-primary">
                            <img className="img-fluid mb-4 signinlogo" src="/img/hotcat.png" />
                            <p className="lead text-muted signinlogotext">welcome to hotcat.live <br/>share happiness with your friends</p>
                        </div>
 
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default SignUpPage;
