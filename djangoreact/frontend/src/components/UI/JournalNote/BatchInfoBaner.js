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


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
    },
  },
  name: {
      padding: '10px',
      margin: '10px 0px 10px 0px',
      fontWeight: 'bold',
  },
  description: {
      padding: '10px',
      margin: '10px 0px 10px 0px',
  },
  test: {
      padding: '10px',
      margin: '10px 0px 10px 0px',
  },
}));

const BatchInfoBaner = (props) => {

    var classes = useStyles();

    return (
        <Paper className={classes.test}>
            <Typography className={classes.name} variant="h4" component="h2" gutterBottom>
                <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
                    {props.name}
                </Box>
                <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
                    {props.machine_number}
                </Box>
            </Typography>
            <Divider/>
            <Typography className={classes.description}>
                {props.description}
            </Typography>
        </Paper>
    )
}

export default BatchInfoBaner;


