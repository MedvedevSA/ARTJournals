import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import {render} from "react-dom";
import Initials from "./UI/JournalNote/Initials";
import CircularProgress from '@material-ui/core/CircularProgress';
import JournalPost from './UI/JournalNote/JournalPost'
import TestRealTimeUpd from "./UI/JournalNote/TestRealTimeUpd";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


export default class CNCInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.url_backend  = "http://nnmservice.ru:1337/journal-notes";
         
    }
    
    componentDidMount() {
        fetch(this.url_backend)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render(){

        const { error, isLoaded, items } = this.state;

        if (error) {
        return <div>Ошибка:  {error.message}</div>;
        } else if (!isLoaded) {
        return <CircularProgress/>
        } else {
        return (
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    {[1,2,3].map((id) => (
                        <Grid item xs>
                            <Paper>

                                <TestRealTimeUpd cncId={id} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
    }
}

