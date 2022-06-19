import React, { Component } from 'react';
import Board from './Board';
import GameManager from '../GameManager';
import ReactTouchEvents from "react-touch-events";
import autoAnimate from '@formkit/auto-animate';

class EndGame extends Component {
    getScreen(){
        let winStyle = {
            textAlign: 'center',
            margin: 'auto',
            color: 'white',
        }
        let winTitleStyle = {
            fontSize: '3.2em',
            fontWeight: 'bold',
        }
        let winTextStyle = {
            textAlign: 'center',
            fontSize: '1.5em',
            padding: '5px',
            margin: 'auto',
            width: '90%',
        }
        let winText2Style = {
            textAlign: 'center',
            fontSize: '1.2em',
            padding: '5px',
            margin: 'auto',
        }

        let loseStyle = {
            textAlign: 'center',
            margin: 'auto',
            color: '#775e65',
            zIndex: 9,
        }
        let loseTitleStyle = {
            fontSize: '3.5em',
            fontWeight: 'bold',
        }
        let loseTextStyle = {
            fontSize: '1.7em',
            padding: '5px',
            margin: 'auto',
            width: '90%',
        }

        if (this.props.type === 'win') {
            return (
                <div className='win-game' style={winStyle}>
                    <div className='win-title' style={winTitleStyle}>
                        {'You Win'}
                    </div>
                    <p style={winTextStyle}>
                        {'You unlocked the 2048 tile with '}
                        {this.props.moveCount}
                        {' moves in '}
                        {GameManager.time}
                    </p>
                    <p  style={winText2Style}>
                        {'Undos: '}
                        {this.props.undoCount}
                    </p>
                    <div style={{
                        width: 400,
                        height: 400,
                        margin: 'auto',
                    }}>
                        <Board board={this.props.board}/>
                    </div>
                    <EndGameButtons 
                        type={'win'} 
                        newGame={this.props.newGame} 
                        undo={this.props.undo}
                    />
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
                    <div style={{
                        width: 400,
                        height: 400,
                        margin: 'auto',
                    }}>
                        <Board board={this.props.board}/>
                    </div>
                    <EndGameButtons  
                        type={'lose'} 
                        newGame={this.props.newGame} 
                        undo={this.props.undo}
                    />
                </div>
            )
        }
    }

    render (){
        let style = {
            backgroundColor: !GameManager.gameOver ? '#FAD250' : '#eee4da',
            height: '125vh',
            width: '100vw',//GameManager.windowWidth,
            position: 'absolute',
            borderRadius: 4,
            zIndex: 100,
            top: 0,
            left: 0,
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
            margin: '1% auto',
            display: 'block',
            fontSize: '2em'
        }
        let btnStyle = {
            width: 165,
            height: 45,
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
            float: this.props.type === 'win' ? '' : 'left',
        }

        return (
            <div className='btnContainer' style={containerStyle}>
                <ReactTouchEvents onTap={()=>this.props.newGame()}>
                    <button 
                        className={'info-btn info-btn-left newgame-btn'} 
                        style={{...btnStyle, ...newStyle}} 
                        onClick={this.props.newGame}
                    >
                        {"New Game"} 
                    </button>
                </ReactTouchEvents>
                {
                    this.props.type === 'lose' ?
                    <ReactTouchEvents onTap={()=>this.props.undo()}>
                        <button 
                            className={'info-btn info-btn-right undo-btn'} 
                            style={{...btnStyle, ...undoStyle}} 
                            onClick={this.props.undo}
                        >
                            {"Undo"}
                        </button>
                    </ReactTouchEvents>
                    : <></>
                }
               
            </div>
        )
    }
}

export default EndGame;