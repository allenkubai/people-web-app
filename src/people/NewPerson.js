import React, { Component } from 'react';
import { createPerson } from '../utils/APIUtils';
import { FIRSTNAME_MAX_LENGTH, LASTNAME_MAX_LENGTH } from '../constants';
import './NewPerson.css';
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class NewPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                text: ''
            },
            lastName: {
                text: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const personData = {
            firstName: this.state.firstName.text,
            lastName: this.state.lastName.text
        };

        createPerson(personData)
        .then(response => {
            this.props.history.push("/");
        }).catch(error => {
                notification.error({
                    message: 'People App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });

        });
    }

    validateFirstName = (firstNameText) => {
        if(firstNameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your First Name!'
            }
        } else if (firstNameText.length > FIRSTNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `First Name is too long (Maximum ${FIRSTNAME_MAX_LENGTH} characters allowed)`
            }
        }else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleFirstNameChange(event) {
        const value = event.target.value;
        this.setState({
            firstName: {
                text: value,
                ...this.validateFirstName(value)
            }
        });
    }

    validateLastName = (lastNameText) => {
        if(lastNameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your Last Name!'
            }
        } else if (lastNameText.length > LASTNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Last Name is too long (Maximum ${LASTNAME_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleLastNameChange(event) {
        const value = event.target.value;
        this.setState({
            lastName: {
                text: value,
                ...this.validateLastName(value)
            }
        });
    }

    isFormInvalid() {
        if(this.state.firstName.validateStatus !== 'success') {
            return true;
        }

        if(this.state.lastName.validateStatus !== 'success') {
            return true;
        }
    }

    render() {

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Create New Person</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.firstName.validateStatus}
                            help={this.state.firstName.errorMsg} className="poll-form-row">
                        <Input
                            placeholder="Enter your First Name"
                            style = {{ fontSize: '16px' }}
                            name = "FirstName"
                            value = {this.state.firstName.text}
                            onChange = {this.handleFirstNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.lastName.validateStatus}
                            help={this.state.lastName.errorMsg} className="poll-form-row">
                        <Input
                            placeholder="Enter your Last Name"
                            style = {{ fontSize: '16px' }}
                            name = "LastName"
                            value = {this.state.lastName.text}
                            onChange = {this.handleLastNameChange} />
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Person</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewPerson;
