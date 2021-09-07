import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
  link: {
      color:"#909090",
      fontSize:"small",
  },
}));


export default function TagBlock( props ) {
    const classes = useStyles();

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <>
            {
                props.tagList.map((tag)=>
                    <span key={tag.id}>
                        <Link  href={"/journals/group/" + tag.id} className={classes.link}>
                          ~{tag.tag_name}
                        </Link>
                    </span>
                )
            }
        </>
  );
}