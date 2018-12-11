import React, { Component } from 'react';
import Person from './Person';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon } from 'antd';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './PeopleList.css';
import { getAllPeople } from '../utils/APIUtils';

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadPeopleList = this.loadPeopleList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadPeopleList(page = 0, size = DEFAULT_PAGE_SIZE) {
        let promise;

        promise = getAllPeople(page, size);


        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
            const people = this.state.people.slice();

            this.setState({
                people: people.concat(response._embedded.people),
                page: response.page.number,
                size: response.page.size,
                totalElements: response.page.totalElements,
                totalPages: response.page.totalPages,
                last: response.last,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentWillMount() {
        this.loadPeopleList();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                people: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                currentVotes: [],
                isLoading: false
            });
            this.loadPeopleList();
        }
    }

    handleLoadMore() {
        this.loadPeopleList(this.state.page + 1);
    }

    render() {
        const peopleViews = [];
        this.state.people.forEach((person, personIndex) => {
            peopleViews.push(<Person
                key={person.id}
                person={person}
                />)
        });

        return (
            <div className="polls-container">
                {peopleViews}
                {
                    !this.state.isLoading && this.state.people.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No people Found.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-polls">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }
                {
                    this.state.isLoading ?
                    <LoadingIndicator />: null
                }
            </div>
        );
    }
}

export default withRouter(PeopleList);
