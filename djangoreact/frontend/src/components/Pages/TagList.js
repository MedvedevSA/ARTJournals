import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import {render} from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import JournalPost from '../UI/JournalNote/JournalPost'
import TagNote from '../UI/JournalNote/TagNote'
import Container from '@material-ui/core/Container';



export default class TagList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.url_backend  = "http://nnmservice.ru:1337/tags";
         
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
        return <div>Ошибка:  {error.message}</div>;
        } else if (!isLoaded) {
        return <CircularProgress/>
        } else {
        return (
            <Container maxWidth="md">
                {
                    this.state.items
                    .reverse()
                    .map((item) =>
                        <div key={item.id}>
                            <TagNote  body={item} PostId={item.id}/>
                        </div>
                )}
            </Container>
        );
    }
    }
}
