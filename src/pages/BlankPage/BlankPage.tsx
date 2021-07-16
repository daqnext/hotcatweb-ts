/*
 * @Author: your name
 * @Date: 2021-07-16 15:07:02
 * @LastEditTime: 2021-07-16 15:12:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/BlankPage/BlankPage.tsx
 */

import React from "react";
import DashboardLayout from '../../layout/DashboardLayout'

interface Props {}

interface State {}

class BlankPage extends React.Component<Props,State> {
    constructor(props:Props) {
      super(props);

      this.state=
      {
             
      }      
    }

    render() {return (<DashboardLayout>
                         <div> Please go to document to check all tutorial </div>
                      </DashboardLayout>);         
        }
}

export default BlankPage;