import React, { Component } from 'react';
import Board from './Board';
import Buttons from './Info';
import GameManager from '../GameManager';


class EndGame extends Component {
    constructor(props){
        super(props);
    }

    getScreen(){
        let winStyle = {
            textAlign: 'center',
            margin: 'auto',
            color: 'white'
        }
        let winTitle = {
            fontSize: '3.5em',
            fontWeight: 'bold'
        }
        let winTextStyle = {
            fontSize: '1.8em',
            padding: '5px',
            width: 420,
            height: 92
        }

        let loseStyle = {
            textAlign: 'center',
            margin: 'auto'
        }
        let loseTitleStyle = {
            fontSize: '3.5em'
        }

        if (this.props.type === 'win') {
            return (
                <div className='win-game' style={winStyle}>
                    <div className='win-title' style={winTitle}>
                        {'You Win'}
                    </div>
                    <p style={winTextStyle}>
                        {'You unlocked the 2048 tile with '}
                        {GameManager.moves}
                        {' moves in '}
                        {GameManager.winTime}
                    </p>
                </div>
            )
        }
        if (this.props.type === 'lose') {
            return (
                <div className='lose-game' style={loseStyle}>
                    <div className='lose-title' style={loseTitleStyle}>
                        {'You Lose'}
                    </div>
                </div>
            )
        }
    }

    render (){
        let style = {
            backgroundColor: 'gold',
            height: 620,
            width: 440,
            position: 'absolute',
            borderRadius: 4,
        }

        return (
            <div className='end-game-container' style={style}>
                {this.getScreen()}
                <Board board={this.props.board}/>
            </div>
        )
    }
}

export default EndGame;