/*
 * @Author: your name
 * @Date: 2021-07-16 14:18:43
 * @LastEditTime: 2021-07-16 15:32:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/TopHeader/TopHeader.ts
 */
import React from "react";
interface Props {}

interface State {}
class TopHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <header className="header">
                <nav className="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
                    <a className="sidebar-toggler text-gray-500 me-4 me-lg-5 lead" href="#">
                        <i className="fas fa-align-left"></i>
                    </a>
                    <img className="navlogo" src="/img/navlogo.png"></img>
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
                                    <h6 className="text-uppercase font-weight-bold">Jack</h6>
                                    <small>Programmer</small>
                                </div>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">
                                    Settings
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="login.html">
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default TopHeader;
