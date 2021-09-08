import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Initials from './Initials';
import {render} from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

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

export default class BatchNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            placeholder: "Loading"
        }
        this.url_request = conf.cms_url;
        this.url_request += conf.api.tag;
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
            <Typography className={classes.name} variant="h4" component="h2" gutterBottom>
                <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
                        <Link  href={"/journals/group/" + props.body.id} className={classes.link}>
                            {props.body.tag_name}
                        </Link>
                </Box>
            </Typography>
            {console.log(props)}
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



