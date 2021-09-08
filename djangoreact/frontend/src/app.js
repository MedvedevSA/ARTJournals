
import React, { Component } from "react";
import ReactMarkdown from 'react-markdown'
import {render} from "react-dom";
import AllJournals from "./components/Pages/AllJournals"
import TypeJournals from "./components/Pages/TypeJournals"
import BatchJournals from "./components/Pages/BatchJournal"
import CNCInfo from "./components/CNCInfo";
import url from "url"
import BatchList from "./components/Pages/BatchList";
import TagList from "./components/Pages/TagList";
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
                        <Route path={APP_URL + "all-batch"} component={BatchList} />
                        <Route path={APP_URL + "all-group"} component={TagList} />
                        <Route path={APP_URL + "cncinfo/"} component={CNCInfo} />
                    </Switch>
                </Router>
            )
    }
}


const appDiv = document.getElementById('app');
render(<App />, appDiv);