import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import {render} from "react-dom";
import JournalPost from '../UI/JournalNote/JournalPost'
import BatchInfoBaner from "../UI/JournalNote/BatchInfoBaner";
import Container from '@material-ui/core/Container';

const conf = require("../../config.json");

export default class BatchJournal extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.url_request = conf.cms_url;
        this.url_request += conf.api.project;
        this.url_request += "/" + props.match.params.id;
        
    }
    
    componentDidMount() {
        fetch(this.url_request)
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
                {/*
                {console.log(items)}
                */}
                <BatchInfoBaner 
                    name={items.batch_number}
                    description={items.description}
                    machine_number={items.machine?.name || "Станок не указан"}
                    />
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

