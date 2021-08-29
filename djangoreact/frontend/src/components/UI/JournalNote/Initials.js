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
        const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*/;
        const new_str = "$4:$5 $3/$2/$1";
        const fdate = body.created_at.replace(re, new_str);
        return (
            <div >
                <div>
                    {
                        body.admin_user != null ?
                            <div>
                                {body.admin_user.firstname}
                            </div>
                            :
                            null
                    }

                    {fdate}
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