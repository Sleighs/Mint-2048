import React, { Component } from 'react';
import GameManager from '../GameManager';
import Game from './Game';
import ReactTouchEvents from "react-touch-events";
import Cookies from 'universal-cookie';

class Menu extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        // check for saved high score

    }

    render (){
        let menuContainerStyle = {
            width: GameManager.windowWidth,
            minHeight: GameManager.windowHeight,
            height: 'fit-content',
            borderRadius: 4,
            //border: 'solid 1pt',
            position: 'absolute',
            //display: 'none',
            margin: 'auto',
            //padding: '25px 0',
            background: '#FAF8EF',//'#eee4da', //'#BFF0D6', //'#ebcf8a',
            //opacity: '90%',
            padding: '0',
            zIndex: 3
        }

        return (
            <div className='menu-container' style={menuContainerStyle} onClick={(event)=>{
                if (event.target.className === 'menu-container'){
                    GameManager.showMenu = false;
                }
            }}>
                <MenuItems 
                    newGame={this.props.newGame} 
                    noNewGame={this.props.noNewGame} 
                    yesNewGame={this.props.yesNewGame}
                    clearBestScore={this.props.clearBestScore}
                    saveGame={this.props.saveGame}
                />
            </div>
        )
    }
}


class MenuItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    actuate(option){
        if (option === 'classic'){
            GameManager.newGame = true;
            GameManager.gameType = 'classic';
        }
        if (option === 'mint') {
            GameManager.newGame = true;
            GameManager.gameType = 'mint';
        }
    }

    toggleUndo(){
        //choose between on off extra
        if (!GameManager.canUndo){
            GameManager.canUndo = true;
        } else {
            GameManager.canUndo = false;
        }
    }
    showStats(){
        console.log('statistics clicked')
    }
    toggleMenu(){
        if (!GameManager.showMenu){
            GameManager.showMenu = true;
        } else {
            GameManager.showMenu = false;
            GameManager.newGame = false;
            GameManager.navPowerTiles = false;
            GameManager.choosePowers = false;
        } 
    }

    startNewGame(){
        GameManager.newGame = false; 
        GameManager.showMenu = false;  
        this.props.yesNewGame()
    }

    noNewGame(){
        GameManager.newGame = false; 
        this.props.noNewGame()
    }

    clearScore(){
        GameManager.showMenu = false; 
        this.props.clearBestScore()
    }
    save(){
        console.log('game saved')
        this.props.saveGame()
    }


    render() {
        let containerStyle = {
            background:'#eee4da',
            width: '90%',
            padding: '5%',
            margin: '65px auto',
            borderRadius: 4

        }
        let menuListStyle = {
            listStyleType: 'none'
        }

        let scoreItemStyle = {
            width: 280,
            height: 55,
            backgroundColor: 'white',
            color: '#775e65',
            margin: '7px auto',
            borderRadius: 4,
            textAlign: 'center',
            fontSize: '1.8em',
            fontFamily: 'Karla',
            //letterSpacing: 1,
            fontWeight: 'bold',
            padding: 8,
            userSelect: 'none'
        }
        let itemStyle = {
            width: 280,
            height: 65,
            //backgroundColor: 'white',
            color: '#775e65',
            margin: '7px auto',
            borderRadius: 4,
            textAlign: 'center',
            //fontSize: '1.8em',
            fontFamily: 'Karla',
            //letterSpacing: 1,
            fontWeight: 'bold',
            padding: 8,
            userSelect: 'none'
        }
        let scoreItemStyle2 = {
            width: 280,
            height: 55,
            backgroundColor: 'white',
            color: '#775e65',
            margin: '7px auto',
            borderRadius: 4,
            textAlign: 'center',
            fontSize: '1.8em',
            fontFamily: 'Karla',
            //letterSpacing: 1,
            padding: 8,
            fontWeight: 'bold',
            display: 'none'
        }
        let menuTitleStyle = {
            textAlign: 'center',
            opacity: .8,
            fontSize: '.8em',
            margin: 'auto',
            display: 'block'
            
        }

        
        if (GameManager.newGame){
            return(
                <div className='menu-list-container' style={containerStyle}>
                    <ul className={'menu-list'} style={menuListStyle}>
                        <li style={itemStyle}><h2 style={menuTitleStyle}>Start new game?</h2></li>
                        <ReactTouchEvents onTap={this.startNewGame.bind(this)}>
                            <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.startNewGame()}}>Yes</li>
                        </ReactTouchEvents>
                        <ReactTouchEvents onTap={this.noNewGame.bind(this)}>
                            <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.noNewGame()}}>No</li>
                        </ReactTouchEvents>
                        
                    </ul>
                </div>
            )
            
        } else {
            return(
                <div className='menu-list-container' style={containerStyle}>
                    <ul className={'menu-list'} style={menuListStyle}>
                        <ReactTouchEvents onTap={()=> this.actuate('classic')}>
                            <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.actuate('classic')}}>Classic Play</li>
                        </ReactTouchEvents>
                        <ReactTouchEvents onTap={()=> this.actuate('mint')}>
                            <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.actuate('mint')}}>Mint</li>
                        </ReactTouchEvents>
                        <li className={'menu-item'} style={scoreItemStyle2} onClick={()=>{this.showStats()}}>Statistics</li>
                        <li className={'menu-item'} style={scoreItemStyle2}>Sounds OFF</li>
                        <ReactTouchEvents onTap={this.toggleUndo.bind(this)}>
                            <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.toggleUndo()}}>{!GameManager.canUndo ? 'Undo OFF' : 'Undo ON'} </li>
                        </ReactTouchEvents>
                        <li className={'menu-item'} style={scoreItemStyle2}>How to play</li>
                        <ReactTouchEvents onTap={this.clearScore.bind(this)}>
                            <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.clearScore()}}>Clear high score</li>
                        </ReactTouchEvents> 
                        <ReactTouchEvents onTap={this.save.bind(this)}>
                            <li className={'menu-item'} style={scoreItemStyle}>Save game</li>
                        </ReactTouchEvents>
                        <ReactTouchEvents onTap={this.toggleMenu.bind(this)}>
                            <li className={'menu-item'} style={scoreItemStyle}>Back to game</li>
                        </ReactTouchEvents>
                    </ul>
                </div>
            )
        }
    }
   
}

export default Menu;