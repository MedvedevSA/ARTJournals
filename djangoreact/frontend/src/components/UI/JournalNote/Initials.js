import React, {useState} from 'react'
import styles from "./Initials.css"

export default class JournalPost extends React.Component {
    render(){
        console.log(this.props.body);
        let body = this.props.body;
        {/*
        date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}).*$/g,
                                "$3.$2.$1")
        
        try {
            authorNik = props.author.firstname + " " + props.author.lastname 
        } catch {
            authorNik = "None"
        }
         */}

        return (
            <div >
                <div>
                    {body.created_at}
                </div>
                <div>
                    {body.tags.map((item) => 
                        <div>
                            <a href={"group/" + item.id}>
                                {item.tag_name}
                            </a> 
                        </div>
                            
                    )}
                </div>
                <div>
                    <a href={"batch/" + body.project.id}>
                        {body.project.batch_number}
                    </a> 
                </div>
                <div>
                </div>
            </div>
        )
    }   
}