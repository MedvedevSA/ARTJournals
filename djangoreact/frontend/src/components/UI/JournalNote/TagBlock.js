import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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
        <div className={classes.root}>
            {
                props.tagList.map((tag)=>
                    <span key={tag.id}>
                        <Chip 
                            size="small" 
                            label={tag.tag_name} 
                            component="a" 
                            href={"/journals/group/" + tag.id} 
                            clickable 
                            variant="outlined" 
                          />
                    </span>
                )
            }
        </div>
  );
}