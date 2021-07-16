/*
 * @Author: your name
 * @Date: 2021-07-16 14:19:18
 * @LastEditTime: 2021-07-16 15:26:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/layout/DashboardLayout.ts
 */
import React from "react";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";
import TopHeader from "../components/TopHeader/TopHeader";

interface Props {}

interface State {}
class DashboardLayout extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <TopHeader></TopHeader>
                <div className="d-flex align-items-stretch">
                    <SideBar></SideBar>
                    <div className="page-holder bg-gray-100">
                        <div className="container-fluid px-lg-4 px-xl-5">{this.props.children}</div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardLayout;
