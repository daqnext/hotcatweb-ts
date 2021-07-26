/*
 * @Author: your name
 * @Date: 2021-07-16 14:17:58
 * @LastEditTime: 2021-07-23 12:13:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/SideBar/SideBar.ts
 */

import React from "react";
import { UserManager } from "../../manager/UserManager";
interface Props {}

interface State {}
class SideBar extends React.Component<Props,State> {

  
    checkactive(prefix:string) {
        if(window.location.pathname.startsWith(prefix)){
            return "active";
        }
        return "";
    }

    constructor(props:Props) {
      super(props);

      this.state=
      {
        
      }      
    }

    async componentDidMount() {
        if (UserManager.GetUserToken() == null) {
            this.setState({
                dataready: true,
            });
            return;
        }

        ////////
        await UserManager.UpdateUserInfo();
        this.setState({
            dataready: true,
        });
    }

    render() {return (
            <div className="sidebar" id="sidebar">
             
             
                <ul className="list-unstyled">

                    <li className="sidebar-list-item">
                        <a className={"sidebar-link text-muted "+ (this.checkactive("/index")) } href="/index">
                            <i className={"fas fa-film"}></i><span className="sidebar-link-title">Videos</span>
                        </a>
                    </li>

                     

                    <li className="sidebar-list-item">
                        <a className={"sidebar-link text-muted "+ (this.checkactive("/newlivestream")) } href="/newlivestream">
                         <i className="fas fa-video"></i><span className="sidebar-link-title">Create Livestream</span>
                        </a>
                    </li>


                    <li className="sidebar-list-item">
                        <a className={"sidebar-link text-muted "+ (this.checkactive("/managelivestream")) } href="/managelivestream">
                            <i className="fas fa-icons"/><span className="sidebar-link-title">My Videos</span>
                        </a>
                    </li>




                    {/* <li className="sidebar-list-item">
                        <a className="sidebar-link text-muted" href="#" data-bs-target="#documentDropDown" data-bs-toggle="collapse"> 
                            <i className="fas fa-book"></i><span className="sidebar-link-title">My video</span>
                        </a>
                        <ul className={"sidebar-menu list-unstyled "+ (this.checkactive("/newlivestream")||this.checkactive("/managelivestream") ? "":"collapse")}  id="documentDropDown">
                            <li className="sidebar-list-item"><a className={"sidebar-link text-muted "+ (this.checkactive("/newlivestream"))} href="/newlivestream"><i className="fas fa-bomb"></i>New livestream</a></li>
                            <li className="sidebar-list-item"><a className={"sidebar-link text-muted "+ (this.checkactive("/managelivestream"))} href="/managelivestream"><i className="fas fa-icons"></i>Manager video</a></li>
                        </ul>
                    </li> */}



                    {/* <li className="sidebar-list-item">
                        <a className="sidebar-link text-muted" href="#" data-bs-target="#demopageDropDown" data-bs-toggle="collapse"> 
                            <i className="fas fa-pager"></i><span className="sidebar-link-title">Demo Pages</span>
                        </a>
                        <ul className={"sidebar-menu list-unstyled "+ (this.checkactive("/demopage")==="active" ? "":"collapse")}  id="demopageDropDown">
                            <li className="sidebar-list-item"><a className={"sidebar-link text-muted "+ (this.checkactive("/demopage/signup"))} href="/demopage/signup"><i className="far fa-registered"></i>Sign Up</a></li>
                            <li className="sidebar-list-item"><a className={"sidebar-link text-muted "+ (this.checkactive("/demopage/signin"))} href="/demopage/signin"><i className="fas fa-key"></i>Sign In</a></li>  
                        </ul>
                    </li> */}


                    {/* <li className="sidebar-list-item">
                        <a className="sidebar-link text-muted" href="#" data-bs-target="#componentsDropDown" data-bs-toggle="collapse"> 
                            <i className="fas fa-cogs"></i><span className="sidebar-link-title">Components</span>
                        </a>
                        <ul className={"sidebar-menu list-unstyled "+ (this.checkactive("/components") ? "":"collapse")}  id="componentsDropDown">
                            <li className="sidebar-list-item"><a className={"sidebar-link text-muted "+ (this.checkactive("/components/notify"))} href="/components/notify"><i className="fas fa-comment-dots"></i> Notify</a></li>
                            <li className="sidebar-list-item"><a className={"sidebar-link text-muted "+ (this.checkactive("/components/pageloader"))} href="/components/pageloader"><i className="fas fa-spinner"></i>Page Loader</a></li>
 
                        </ul>
                    </li> */}


                </ul>
            </div>
            );         
        }
}

export default SideBar;
