import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import {render} from "react-dom";
import Initials from "./UI/JournalNote/Initials";
import JournalPost from './UI/JournalNote/JournalPost'



export default class AllJournals extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.url_backend  = "http://nnmservice.ru:1337/journal-notes";
         
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

        const { error, isLoaded, items } = this.state;

        if (error) {
        return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Загрузка... 
                    <div>
                        {
                            console.log(items)
                        }
                    </div>
            </div>;

        } else {
        return (
            <div class="col-sm-8">
                {
                    this.state.items
                    .reverse()
                    .map((item) =>
                        <div key={item.id}>
                            <JournalPost  body={item} PostId={item.id}/>
                        </div>
                )}

            </div>
        );
    }
    }
}

                    {/*
                   
                        <div class="container-fluid journal-note">
                                    {/*
                                    <Initials/>
                   
                            <div class="row">
                                <div class="col">
                                    <ReactMarkdown remarkPlugins={[]} children={item.richtext} transformImageUri ={(uri) => uri.replace("/uploads/","https:teststrapi.duckdns.org/uploads/")}/>
                                </div>
                            </div>

 
                        </div>
                    */}
