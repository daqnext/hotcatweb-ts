/*
 * @Author: your name
 * @Date: 2021-07-18 17:36:43
 * @LastEditTime: 2021-07-18 17:37:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/ManageLiveStream/ManageLiveStreamPage.tsx
 */
import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";

interface Props {}

interface State {
}



const category = ["Crypto", "Games", "Sports", "Technology"];

class ManageLiveStreamPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
    }

    async componentDidMount(){

    }

    render() {
        return (
            <DashboardLayout>
                manage livestreaming page
            </DashboardLayout>
        );
    }
}

export default ManageLiveStreamPage;