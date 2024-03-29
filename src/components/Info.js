import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';
import ReactTouchEvents from "react-touch-events";

//Render game info
class Info extends Component {
    constructor(props){
        super(props);
        this.state = { }
        this.getDetails = this.getDetails.bind(this)
    }

    getDetails() {
        let activeStyle = {
            //color: !GameManager.navPowerTiles ? '' : GameManager.activePower.color,
            fontWeight: 'bold',
            fontSize: '.8em',
            fontFamily: 'Cabin',
            textAlign: 'center',
        }
        let active2Style = {
            //color: !GameManager.navPowerTiles ? '' : GameManager.activePower.color,
            fontWeight: 'bold',
            fontSize: '.75em',
            fontFamily: 'Cabin',

            textAlign: 'center',
        }

        if (GameManager.navPowerTiles === true){
            return (
                <div style={{marginTop: -12,}}>
                    <div style={activeStyle}>{GameManager.tooltip + ' '}</div>
                    <div style={active2Style}>active</div>
                </div>)
        } /*else {
            return (
                <div>
                    <div>{GameManager.tooltip}</div>
                    <div style={{
                        fontSize: '.6em',
                        opacity: .8
                    }}>{GameManager.tooltip2}</div>
                </div>
            )
        }*/
    }
    openMenu(){
        if (!GameManager.showMenu){
            GameManager.showMenu = true;
        } else {
            GameManager.showMenu = false;
            GameManager.newGame = false;
            GameManager.navPowerTiles = false;
            GameManager.choosePowers = false;
        } 
    }

    render (){
        let infoStyle = {
            height: 168,
            width: '100%',
            padding: '4 0',
            margin: 'auto',
            display: 'block',
            fontSize: '2em',
            userSelect: 'none',
            fontFamily: 'Kanit'
        }
        let gameTitleStyle = {
            fontFamily: 'Arial',
            display: 'block',
            float: 'left',
            fontWeight: 'bold',
            borderRadius: 4,
            width: 127,
            height: 127,
            padding: '40px 10px',
            color: 'white',
            backgroundColor: 
                GameManager.navPowerTiles
                ? GameManager.activePower.color 
                : '#98E7BD', //'#BFF0D6'//'#C3FAE4', //'#edcc61'
        }
        let titleStyle = {
            textAlign: 'center',
            fontSize: '1.4em',
            margin: '-11px 0 0 0',
            fontFamily: 'Cabin'
        }
        let infoContainerStyle = {
            display: 'block',
            height: 136,
            width: '100%',
        }
        let infoRightStyle = {
            display: 'inline-block',
            width: 200,
            height: 132,
            float: 'right'
        }

        return (
            <div className='info' style={infoStyle}>
                {(GameManager.showWinScreen || GameManager.showLoseScreen) ? null :  <Time minutes={this.props.minutes} seconds={this.props.seconds} milisec={this.props.milisec}/>}
                <div className="info-container" style={infoContainerStyle}>
                    <ReactTouchEvents onTap={this.openMenu.bind(this)}>
                        <div className='game-title' style={gameTitleStyle} onClick={this.props.openMenu}>
                            {
                                GameManager.navPowerTiles 
                                ? this.getDetails()
                                : <div className='title' style={titleStyle}>{"mint"}</div>
                            }
                        </div>
                    </ReactTouchEvents>
                    <div className='info-right' style={infoRightStyle}>
                        <Score 
                            score={this.props.score} 
                            bestScore={this.props.bestScore}
                        />
                        <Buttons 
                            pressed={false} 
                            newGame={this.props.newGame} 
                            undo={this.props.undo}

                            handleInput={this.props.handleInput}
                            previousBoards={this.props.previousBoards}
                            actuate={this.props.actuate}
                        />
                    </div>  
                </div>
            </div>
        )
    } 
}

class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    render (){
        let timeStyle = {
            display: 'block',
            fontFamily: 'Cabin',
            height: 30,
            width: '90%',
            margin: '3px auto',//margin: '5px 0 0 0',
            fontSize: '.58em',
            textShadow: '.3px .3px .3px silver',
            letterSpacing: .2,
            opacity: .35,
            color: '#776e65',
            textAlign: 'center',
        }
        let digitStyle = {
            width: 100,
            margin: 'auto 125px auto auto'
        }

        return (
            <div className='time' style={timeStyle}>
                <div className='time-digits' style={digitStyle}>
                    {this.props.hours !== 0 ? this.props.hours : ' '}
                    {this.props.minutes < 10 ? "0" + this.props.minutes : this.props.minutes}
                    {this.props.seconds < 10 ? ":0" + this.props.seconds : ":" + this.props.seconds}
                    {/*this.props.milisec < 100 ? ".0" + (this.props.milisec < 10 ? "0" + this.props.milisec : this.props.milisec) : "." + this.props.milisec*/}
                </div>
            </div>
        )
    } 
}

class Score extends Component {
    render (){
        let scoreBoxStyle = {
            display: 'inline-block',
            textAlign: 'center',
            //textShadow: '.1px .1px .1px #776e65',
            float: 'right',
            minWidth: 210,
            height: 69,
            padding: '2px 0',
            margin: 'auto',
            color: 'white',
            fontFamily: 'Cabin',
            letterSpacing: .5,
            zIndex: 2
        }
        let scoreStyle = {
            fontSize: '.69em',
            height: 25
        }
        let titleStyle = {
            fontSize: '.52em',
            height: 22
        }
        let scoreContainerStyle = {
            display: 'inline-block',
            borderRadius: 4,
            padding: '4px 12px',
            height: 56,
            minWidth: 90,
            backgroundColor: '#bbada0',
            color: '#f5f6f5',
            margin: 'auto'
        }
        let bestScoreContainerStyle = {
            display: 'inline-block',
            borderRadius: 4,
            padding: '4px 12px',
            height: 56,
            minWidth: 90,
            backgroundColor: '#bbada0',
            color: '#f5f6f5',
            float: 'right'
        }
        
        return (
            <div className='score' style={scoreBoxStyle}>
                <div className="score-container" style={scoreContainerStyle}>
                    <div className='score' style={scoreStyle}>
                        {this.props.score}      
                    </div>
                    <div className='score-title' style={titleStyle}>
                        {"Score"}
                    </div>
                </div>

                <div className="best-container" style={bestScoreContainerStyle}>
                    <div className='best-score' style={scoreStyle}>
                        {this.props.bestScore}      
                    </div>
                    <div className='best-title' style={titleStyle}>
                        {"Best"}
                    </div>
                </div>  
            </div>
        )
    } 
}

class Buttons extends Component {
    constructor(props) {
        super(props);
    }

    newGame(){
        this.props.newGame()
        console.log(this.props.previousBoards.length, this.props.previousBoards)
    }

    undo(){
        this.props.undo()  
        //console.log(this.props.previousBoards.length, this.props.previousBoards)
    }

    render (){
        let containerStyle = {
            height: 65,
            width: 195,
            margin: 'auto',
            display: 'block',
            float: 'right'
        }
        let btnStyle = {
            width: 90,
            height: 56,
            backgroundColor: '#775e65',
            color: 'white',
            fontFamily: 'Cabin',
            fontSize: '.6em',
            letterSpacing: .7,
            margin: 'auto',
            display: 'inline-block',
            borderRadius: 4,
            padding: '4px 12px',
            textDecoration: 'none',
            border: 'none',
            userSelect: 'none',
        }
        let undoStyle = {
            float: 'right',
        }

        return (
            <div className='btnContainer' style={containerStyle}>
                <ReactTouchEvents onTap={this.newGame.bind(this)}>
                    <button 
                        className='info-btn info-btn-left newgame-btn' 
                        style={btnStyle} 
                        onClick={this.props.newGame}
                    >
                        {"New"} 
                    </button>
                </ReactTouchEvents>
                    <button 
                        className='info-btn info-btn-right undo-btn' 
                        style={{...btnStyle, ...undoStyle}} 
                        onClick={this.props.undo}
                    >
                        {"Undo"}
                        <UndoNodes />
                    </button> 
            </div>
        )
    }
}

class UndoNodes extends Component {
    constructor(props) {
        super(props);
    }

    render (){
        let containerStyle = {
            height: 8,
            width: 76,
            marginTop: -1,
            marginLeft: -5,
            display: 'block',
            position: 'absolute',
            fontSize: '.5em',
        }
        let nodeStyle = {
            background: GameManager.undoCount < 3 ? '#eee4da' : '#edcc61',
            width: 15,
            height: 5,
            margin: 3,
            borderRadius: 2,
            display: !GameManager.canUndo ? 'none' : 'inline-block',
            opacity: GameManager.undoCount < 3 ? .7 : .8,
        }

        return(
            <div style={containerStyle}>
                {
                    GameManager.undoNodes.map((ele, i)=> {
                        return (
                            <Node style={nodeStyle} key={i}/>
                        )
                    })
                }
                {
                    !GameManager.canUndo 
                        ? ''//'OFF' 
                        : null
                }
            </div>
        )
    }
}

class Node extends Component {
    constructor(props) {
        super(props);
    }

    render (){    
        return(
            <div style={this.props.style}></div>
        )
    }
}

Info.propTypes = {
    score: PropTypes.number.isRequired
}

export default Info; 