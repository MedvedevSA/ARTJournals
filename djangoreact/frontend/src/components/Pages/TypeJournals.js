import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import {render} from "react-dom";
import JournalPost from '../UI/JournalNote/JournalPost'
import Container from '@material-ui/core/Container';
import TagInfoBaner from "../UI/JournalNote/TagInfoBaner";


export default class TypeJournals extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.url_backend  = "http://nnmservice.ru:1337/tags/" + props.match.params.id;
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
            <Container maxWidth="md">
                <TagInfoBaner name={items.tag_name}/>
                {
                    this.state.items.journal_notes
                    .reverse()
                    .map((item) =>
                        <div key={item.id}>
                            <JournalPost  body={item} PostId={item.id} />
                        </div>
                )}

            </Container>
        );
    }
    }
}

