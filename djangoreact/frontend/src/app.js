
import React, { Component } from "react";
import ReactMarkdown from 'react-markdown'
import {render} from "react-dom";
import HomePage from "./components/HomePage";
import AllJournals from "./components/AllJournals"
import TypeJournals from "./components/TypeJournals"
import BatchJournals from "./components/BatchJournal"
import url from "url"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';




export default class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
    }
    
    render(){
            const APP_URL = "/journals/"
            return (
                <Router >
                    <Switch>
                        <Route exact path={APP_URL} component={AllJournals} />
                        <Route path={APP_URL + "group/:id"} component={TypeJournals} />
                        <Route path={APP_URL + "batch/:id"} component={BatchJournals} />
                    </Switch>
                </Router>
            )
    }
}


const appDiv = document.getElementById('app');
render(<App />, appDiv);