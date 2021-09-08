import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Initials from './Initials';
import {render} from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const conf = require("../../../config.json");

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
    },
  },
  test: {
      padding: '10px',
      margin: '10px 0px 10px 0px',
  },
}));

export default class JournalPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            placeholder: "Loading"
        }
        this.url_request = conf.cms_url;
        this.url_request += conf.api.note;
        this.url_request  += "/" + this.props.PostId;
         
    }
    
    componentDidMount() {
        fetch(this.url_request)
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

    Content(props){
        var classes = useStyles();
        return (
            <Paper className={classes.test}>
                {console.log(props)}
                <Initials body={props.body}/>
                <Divider/>
                <ReactMarkdown remarkPlugins={[]} children={props.body.note} transformImageUri ={(uri) => uri.replace("/uploads/","https://artcms.nnmservice.ru/uploads/")}/> 
            </Paper>

        ) 
    }

    render(){
        const { error, isLoaded, items: body } = this.state;
        if (!isLoaded) {
        return <CircularProgress/>
        } else {
            return (
                <this.Content body={body}/>
            )
        }
    }
}



