import React, {useState} from 'react';
import {render} from "react-dom";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default class TestRealTimeUpd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items : null};
    this.myvar;
    this.url_machine  = "http://nnmservice.ru:1337/machines/" + this.props.cncId ;
    this.url_backend  = "https://803b-80-248-150-58.ngrok.io/cnc/getstatus/" + this.props.cncId;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    
    fetch( this.url_machine)
      .then(res => res.json())
      .then(
      (result) => {
        this.setState({
          machine: result
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

  componentWillUnmount() {
    clearInterval(this.timerID);
    
  }

  tick() {

    fetch( this.url_backend)
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

  test(){
    var classes = useStyles();
    return <Button className={classes.root}/>
  }

  render() {
    return (
      <span>
        {
          this.state.items != null ? 
            <Button variant="contained" color={this.state.items.run == 3 ? "primary" : "secondary"}>
              {
              this.state.machine != null ? 
                this.state.machine.name
                :
                null
              }
            </Button>  
            :
            <CircularProgress />
          }
      </span>
    );
  }
}
