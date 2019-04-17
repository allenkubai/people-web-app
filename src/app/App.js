import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { Layout, notification } from 'antd';
import PeopleList from '../people/PeopleList';
import NewPerson from '../people/NewPerson';
import LoadingIndicator from '../common/LoadingIndicator';
import AppHeader from '../common/AppHeader';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator/>
    }
    return (
        <Layout className="app-container">
          <AppHeader/>

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path="/" 
                  render={(props) => <PeopleList {...props} />}>
                </Route>
                <Route path="/person/new" component={NewPerson}></Route> 
               
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
