/*
 * @Author: your name
 * @Date: 2021-07-16 14:17:39
 * @LastEditTime: 2021-07-17 13:07:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/Footer/Footer.ts
 */
import React from "react";

interface Props {}

interface State {}
class Footer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer bg-white shadow align-self-end py-3 px-xl-5 w-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start fw-bold">
                            
                        </div>
                        <div className="col-md-6 text-center text-md-end text-gray">
                             <p className="mb-2 mb-md-0  ">hotcat.live &copy; 2021</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
