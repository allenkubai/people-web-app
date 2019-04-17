import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Icon } from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);     
    }

    render() {     
        let menuItems;
        
        menuItems = [
            <Menu.Item key="/people/new">
                <Link to="/people/new">
                    <Icon type="user-add" className="nav-icon" />
                </Link>
          </Menu.Item>            
          ];

        return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">People App</Link>
              </div> 
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>             
            </div>
          </Header>
        );
    }
}

export default withRouter(AppHeader);