import React, {useState} from 'react'
import styles from "./Initials.css"
import "./Initials.css"
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import TagBlock from "./TagBlock"


export default class JournalPost extends React.Component {
    render(){
        let body = this.props.body;

        return (
            <div >
                <div>
                    {body.created_at}
                </div>
                
                <TagBlock tagList={body.tags}/>
                
                <div>
                    <a href={"/journals/batch/" + body.project.id}>
                        {body.project.batch_number}
                    </a> 
                </div>
                <div>
                </div>
            </div>
        )
    }   
}