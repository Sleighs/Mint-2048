import React, { Component } from 'react';
import Board from './Board';
import GameManager from '../GameManager';


class EndGame extends Component {
    getScreen(){
        let winStyle = {
            textAlign: 'center',
            margin: 'auto',
            color: 'white'
        }
        let winTitleStyle = {
            fontSize: '3.5em',
            fontWeight: 'bold'
        }
        let winTextStyle = {
            fontSize: '1.8em',
            padding: '5px',
            width: 404,
            height: 92
        }

        let loseStyle = {
            textAlign: 'center',
            margin: 'auto',
            color: '#775e65',
            zIndex: 9
        }
        let loseTitleStyle = {
            fontSize: '3.5em',
            fontWeight: 'bold',
        }
        let loseTextStyle = {
            fontSize: '1.7em',
            padding: '5px',
            width: 404,
            height: 92
        }

        if (this.props.type === 'win') {
            return (
                <div className='win-game' style={winStyle}>
                    <div className='win-title' style={winTitleStyle}>
                        {'You Win'}
                    </div>
                    <p style={winTextStyle}>
                        {'You unlocked the 2048 tile with '}
                        {GameManager.moves}
                        {' moves in '}
                        {GameManager.time}
                    </p>
                    <Board board={this.props.board}/>
                </div>
            )
        }
        if (this.props.type === 'lose') {
            return (
                <div className='lose-game' style={loseStyle}>
                    <div className='lose-title' style={loseTitleStyle}>
                        {'Game Over'}
                    </div>
                    <p style={loseTextStyle}>
                        {'You ended with a score of '}
                        {GameManager.score}
                        {' in '}
                        {GameManager.time}
                    </p>
                    <Board board={this.props.board}/>
                    <EndGameButtons  newGame={this.props.newGame} undo={this.props.undo}/>
                </div>
            )
        }
    }

    render (){
        let style = {
            backgroundColor: !GameManager.gameOver ? '#FAD250' : '#eee4da',
            height: 625,
            width: 404,
            position: 'absolute',
            borderRadius: 4,
            zIndex: 100
        }

        return (
            <div className='end-game-container' style={style}>
                {this.getScreen()}
            </div>
        )
    }
}

class EndGameButtons extends Component {
    render (){
        let containerStyle = {
            height: 65,
            width: 330,
            margin: 'auto',
            display: 'block',
            fontSize: '2em'
        }
        let btnStyle = {
            width: 150,
            height: 40,
            backgroundColor: '#775e65',
            color: 'white',
            fontSize: '.6em',
            display: 'inline-block',
            borderRadius: 5,
            padding: '4px 15px',
            textDecoration: 'none',
            border: 'none'
        }
        let undoStyle = {
            float: 'right'
        }
        let newStyle = {
            float: 'left'
        }

        return (
            <div className='btnContainer' style={containerStyle}>
                <button className={'info-btn', 'info-btn-left', 'newgame-btn'} style={{...btnStyle, ...newStyle}} onClick={this.props.newGame}>{"New"} </button>
                <button className={'info-btn', 'info-btn-right', 'undo-btn'} style={{...btnStyle, ...undoStyle}} onClick={this.props.undo}>{"Undo"}</button>
            </div>
        )
    }
}

export default EndGame;