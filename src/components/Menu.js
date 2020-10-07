import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';
import Game from './Game';

class Menu extends Component {
    constructor(props) {
        super(props);
        
    }

    render (){
        let menuContainerStyle = {
            width: 409,
            height: 635,
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
                console.log(event.target);
                if (event.target.className === 'menu-container'){
                    GameManager.showMenu = false;
                }
            }}>
                <MenuItems newGame={this.props.newGame} noNewGame={this.props.noNewGame} yesNewGame={this.props.yesNewGame}/>
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
        

        console.log('toggle undo clicked')
    }
    showStats(){
        console.log('statistics clicked')
    }

    render() {
        let containerStyle = {
            background:'#eee4da',
            width: 350,
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
            margin: 'auto',
            display: 'block'
            
        }

        
        if (GameManager.newGame){
            return(
                <div className='menu-list-container' style={containerStyle}>
                    <ul className={'menu-list'} style={menuListStyle}>
                        <li style={itemStyle}><h1 style={menuTitleStyle}>Start new game?</h1></li>
                        <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{GameManager.newGame = false; GameManager.showMenu = false;  this.props.yesNewGame()}}>Yes</li>
                        <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{GameManager.newGame = false ; this.props.noNewGame()}}>No</li>
                    </ul>
                </div>
            )
            
        } else {
            return(
                <div className='menu-list-container' style={containerStyle}>
                    <ul className={'menu-list'} style={menuListStyle}>
                        <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.actuate('classic')}}>Classic Play</li>
                        <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.actuate('mint')}}>Mint</li>
                        <li className={'menu-item'} style={scoreItemStyle2} onclick={()=>{this.showStats()}}>Statistics</li>
                        <li className={'menu-item'} style={scoreItemStyle2}>Sounds OFF</li>
                        <li className={'menu-item'} style={scoreItemStyle} onClick={()=>{this.toggleUndo()}}>{!GameManager.canUndo ? 'Undo OFF' : 'Undo ON'} </li>
                        <li className={'menu-item'} style={scoreItemStyle2}>How to play</li>
                        <li className={'menu-item'} style={scoreItemStyle2}>About Mint 2048</li>
                    </ul>
                </div>
            )
        }
    }
   
}

export default Menu;