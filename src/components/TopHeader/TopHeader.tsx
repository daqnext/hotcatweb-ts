/*
 * @Author: your name
 * @Date: 2021-07-16 14:18:43
 * @LastEditTime: 2021-07-18 15:52:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/TopHeader/TopHeader.ts
 */
import React from "react";
import { IUserInfo } from "../../interface/interface";
import { UserManager } from "../../manager/UserManager";
interface Props {}

interface State {
    userInfo:IUserInfo
}
class TopHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userInfo:null
        };
    }

    async componentDidMount(){
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        //UserManager.TokenCheckAndRedirectLogin();
        const info=UserManager.GetUserInfo()
        if (info==null) {
            return
        }
        this.setState({userInfo:info})
    }

    render() {
        return (
            <header className="header">
                <nav className="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
                    <a className="sidebar-toggler text-gray-500 me-4 me-lg-5 lead" href="#">
                        <i className="fas fa-align-left"></i>
                    </a>
                    <img className="navlogo" src="/img/navlogo.png"/>
                    {this.state.userInfo?
                    <ul className="ms-auto d-flex align-items-center list-unstyled mb-0">
                        <li className="nav-item dropdown ms-auto">
                            <a
                                className="nav-link pe-0"
                                id="userInfo"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img className="avatar p-1" src="/img/avatar.png" />
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-end dropdown-menu-animated"
                                aria-labelledby="userInfo"
                            >
                                <div className="dropdown-header text-gray-700">
                                    <h6 className="text-uppercase font-weight-bold">{this.state.userInfo.name}</h6>
                                    <small>Programmer</small>
                                </div>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">
                                    Settings
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/index"
                                onClick={()=>{
                                    UserManager.UnsetUserToken()
                                }}>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                    :
                    <div className="ms-auto d-flex align-items-center list-unstyled mb-0 ">
                    <a className=" btn btn-primary btn-lg" href="/signin">Sign In</a>
                    <a className=" btn btn-primary btn-lg" href="/signup">Sign Up</a>
                    </div>
                    }
                    
                </nav>
            </header>
        );
    }
}

export default TopHeader;
