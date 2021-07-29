/*
 * @Author: your name
 * @Date: 2021-07-16 14:18:43
 * @LastEditTime: 2021-07-29 21:22:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/TopHeader/TopHeader.ts
 */
import React from "react";
import { IUserInfo } from "../../interface/interface";
import { UserManager } from "../../manager/UserManager";
import Avatar from "react-avatar";
import { GlobalData } from "../../global/global";

interface Props {}
interface State {
    userInfo: IUserInfo;
}
class TopHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userInfo: null,
        };
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        //UserManager.TokenCheckAndRedirectLogin();
        const info = UserManager.GetUserInfo();
        if (info == null) {
            return;
        }
        this.setState({ userInfo: info });
    }

    render() {
        return (
            <header className="header">
                <nav className="navbar navbar-expand-lg px-4 py-2 ">
                    <a className="sidebar-toggler text-gray-500 me-4 me-lg-5 lead" href="#">
                        <i className="fas fa-align-left"></i>
                    </a>
                    {/* <img className="navlogo" src="/img/navlogo.png" /> */}
                    <h3 className="navtext"><span>HOT</span>CAT.LIVE</h3>
                    {this.state.userInfo ? (
                        <ul className="ms-auto d-flex align-items-center list-unstyled mb-0">
                            {/* <a href="/newlivestream">
                            <i
                                className="fas fa-video"
                                style={{ fontSize: "30px", cursor: "pointer",color:"#343a40" }}
                                
                            />
                            </a> */}
                            

                            <li className="nav-item dropdown ms-auto">
                                <a
                                    className="nav-link pe-0"
                                    id="userInfo"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {/* <img className="avatar p-1" src="/img/avatar.png" /> */}
                                    <Avatar name={this.state.userInfo ? this.state.userInfo.name : ""}
                                        round={true} size="30"
                                        // src={
                                        //     this.state.userInfo &&
                                        //     this.state.userInfo.avatarUrl !== ""
                                        //         ? GlobalData.apiHost+this.state.userInfo.avatarUrl
                                        //         : ""
                                        // }
                                    />
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-end dropdown-menu-animated"
                                    aria-labelledby="userInfo"
                                >
                                    <div className="dropdown-header text-gray-700">
                                        <h6 className="font-weight-bold">
                                            {this.state.userInfo.name}
                                        </h6>
                                        {/* <small>Programmer</small> */}
                                    </div>
                                    {/* <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">
                                        Settings
                                    </a> */}
                                    <div className="dropdown-divider"></div>
                                    <a
                                        className="dropdown-item"
                                        href="/index"
                                        onClick={() => {
                                            UserManager.UnsetUserToken();
                                        }}
                                    >
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <div className="ms-auto d-flex align-items-center list-unstyled mb-0 ">
                            <a className="btn btn-sm btn-primary " href="/signin"> Sign In </a>
                        </div>
                    )}
                </nav>
            </header>
        );
    }
}

export default TopHeader;
