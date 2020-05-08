import React, { Component } from 'react';
import Game from './Game';

class GetView extends Component {
    // get view
        //if no saved game load new game

    render() {
        return (
            //if no saved load new game
            <Game size={4}/>
        );
    }   
}


export default GetView; 