import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Initials from './Initials';
import {render} from "react-dom";

export default class JournalPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.url_backend  = "http://nnmservice.ru:1337/journal-notes/" + this.props.PostId;
         
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
        console.log(this.props.body);
        const body = this.props.body;
        const { error, isLoaded, items } = this.state;
        console.log(items)
        if (!isLoaded) {
        return <div>Загрузка... 
                    <div>
                        {
                            console.log(items)
                        }
                    </div>
            </div>;

        } else {
            return (
                <div class="container-fluid journal-note">
                    {/*
                    <Initials/>
                        
                    */}

                    <div class="row">
                        <div class="col">
                            {/**
                            <Initials body={body}/>
                            * 
                            */}
                      
                            <ReactMarkdown remarkPlugins={[]} children={items.note} transformImageUri ={(uri) => uri.replace("/uploads/","https:teststrapi.duckdns.org/uploads/")}/> 
                        </div>
                    </div>
                </div>
            )
        }
    }
}



