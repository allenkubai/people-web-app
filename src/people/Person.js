import React, { Component } from 'react';
import './Person.css';
import { Avatar } from 'antd';
import { getAvatarColor } from '../utils/Colors';

class Person extends Component {

    render() {

        return (
            <div className="poll-content">
                <div className="poll-header">
                    <div className="poll-creator-info">
                            <Avatar className="poll-creator-avatar"
                                style={{ backgroundColor: getAvatarColor(this.props.person.firstName)}} >
                                {this.props.person.firstName[0].toUpperCase()}
                            </Avatar>
                            <span className="poll-creator-name">
                                {this.props.person.firstName} {this.props.person.lastName}
                            </span>
                    </div>
                </div>
                <div className="poll-footer">

                </div>
            </div>
        );
    }
}


export default Person;
