import React, {useState} from 'react'
import styles from "./Initials.css"
import "./Initials.css"
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TagBlock from "./TagBlock";
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  author: {
      color: "#414b50",
      fontWeight :'bold',
  },
  date: {
    fontSize: "small",
    spacing: "1",
    justifyContent: 'flex-end',
  },
  links: {
    fontSize: "small",
    color:"#909090",
  },
  initials: {
    color:"#909090",
    '& span' : {
        padding : "0 5px",
    }
  },
}));



export default class JournalPost extends React.Component {
    Content(props){
        var classes = useStyles();
        var body = props.body;
        const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*/;
        const new_str = "$4:$5 $3/$2/$1";
        const fdate = body.created_at.replace(re, new_str);
        
        const authorName = (body) => {
            return  body.admin_user != null ?
                        <>
                            {body.admin_user.firstname + ' '} 
                            {body.admin_user.lastname}
                        </>
                        :
                        "Аноним"
        }

        return (
            <Typography className={classes.initials}>
                <span className={classes.author}>
                    {authorName(body)}
                </span>
                <span className={classes.date}>
                    {fdate}
                </span> 
                <span>

                    <Link href={"/journals/batch/" + body.project.id} className={classes.links}>
                            *{body.project.batch_number}
                    </Link> 
                    <TagBlock tagList={body.tags}/>
                </span>
            </Typography>
        )
    }

    render(){
        let body = this.props.body;
        return (
            <>
                <this.Content body={body}/> 
                
            </>
        )
    }   
}