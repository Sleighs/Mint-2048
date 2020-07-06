import React, { Component } from 'react';
import Game from './Game';
import GameManager from '../GameManager';

class GetView extends Component {
    render() {
        return (
            <Game size={GameManager.size}/>            
        );
    }   
}

export default GetView; 