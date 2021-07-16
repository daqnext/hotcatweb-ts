/*
 * @Author: your name
 * @Date: 2021-07-16 15:06:05
 * @LastEditTime: 2021-07-16 15:15:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/SignInPage/SignInPage.tsx
 */

import React from "react";
import DashboardLayout from '../../layout/DashboardLayout';
interface Props {}

interface State {}

class SignInPage extends React.Component<Props,State> {
    constructor(props:Props) {
      super(props);

      this.state=
      {
             
      }      
    }

    render() {return (<DashboardLayout>
                         <div className="container">
                            <div className="row align-items-center">
                            <div className="col-lg-6 px-lg-4">
                                <div className="card">
                                <div className="card-header px-lg-5">
                                    <div className="card-heading text-primary">Sign In</div>
                                </div>
                                <div className="card-body p-lg-5">
                                    <h3 className="mb-4">Hi, welcome back! 👋👋</h3>
                                    <p className="text-muted text-sm mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                    <form id="loginForm" action="index.html">
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="floatingInput" type="email" placeholder="name@example.com"/>
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="floatingPassword" type="password" placeholder="Password"/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember"/>
                                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                                    </div>
                                    <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                                    </form>
                                </div>
                                <div className="card-footer px-lg-5 py-lg-4">
                                    <div className="text-sm text-muted">Don't have an account? <a href="/demopage/signup">Register</a>.</div>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary">
                                <img className="img-fluid mb-4" width="300" src="/img/drawkit-illustration.svg" alt="" style={{transform: "rotate(10deg)"}} />
                                <h1 className="mb-4">something you want <br className="d-none d-lg-inline"/>to type here</h1>
                                <p className="lead text-muted">somethign your want say to user when he comes back!</p>
                            </div>
                            </div>
                        </div>
                      </DashboardLayout>);         
        }
}

export default SignInPage;

