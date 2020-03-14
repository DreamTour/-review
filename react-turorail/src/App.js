import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table'
import Form from './Form'
import Clock from './Clock'
import Game from './Game'
import Toggle from './Toggle'



class App extends Component {
    state={
        data:[],
        characters :[
            {
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                name: 'Dennis',
                job: 'Bartender',
            },
        ]
    }

    componentDidMount() {
        const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*'

        /*fetch(url)
            .then(result => result.json())
            .then(result => {
                console.log('result-->',result);
                this.setState({
                    data: result,
                })
            })*/
    }

    removeCharacter=(index)=>{
        const { characters } = this.state
        let data=characters.filter((value, i) => {
            console.log(index);
                return i !== index
            })
        this.setState({
            characters:data
        })
    }

    handleSubmit = (character) => {
        this.setState({ characters: [...this.state.characters, character] })
    }



    render(){

        return (
            <div className="container">
                <h1>Hello, React!</h1>
                <Table characterData={this.state.characters} removeCharacter={this.removeCharacter}/>
                <Form handleSubmit={this.handleSubmit} />
                <Game/>
                <Clock/>
                <Clock/>
                <Clock/>
                <Toggle/>
            </div>
        );
    }
}

export default App;
