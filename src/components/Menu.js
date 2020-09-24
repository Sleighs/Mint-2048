import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';
//import { findRenderedComponentWithType } from 'react-dom/test-utils';

class Menu extends Component {
    constructor(props) {
        super(props);
        
    }


    render (){
        let menuContainerStyle = {
            width: 440,
            height: 650,
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
            <div className='menu-container' style={menuContainerStyle} onClick={this.props.openMenu}>
                <MenuItems newGame={this.props.newGame}/>
            </div>
        )
    }
}


class MenuItems extends Component {
    constructor(props){
        super(props);
        this.playClassic = this.playClassic.bind(this);
        this.playMint = this.playMint.bind(this);
    }
    
    actuate(option){
        if (option === 'classic'){
            this.playClassic()
        }
        if (option === 'mint') {
            this.playMint()
        }
    }

    playClassic(){
        //ask to start new game
        //return to game
        /*
            actuate game with
                regular undo
        
        */
        GameManager.powersModeOn = false;
        this.props.newGame;

        console.log('Classic Play clicked')
    }
    playMint(){
        GameManager.powersModeOn = true;
        this.props.newGame;
        console.log('Mint Play clicked')
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
            margin: '5px auto',
            borderRadius: 4,
            textAlign: 'center',
            fontSize: '1.8em',
            fontFamily: 'Karla',
            //letterSpacing: 1,
            fontWeight: 'bold',
            padding: 8
        }
        let scoreItemStyle2 = {
            width: 280,
            height: 55,
            backgroundColor: 'white',
            color: '#775e65',
            margin: '5px auto',
            borderRadius: 4,
            textAlign: 'center',
            fontSize: '1.8em',
            fontFamily: 'Karla',
            //letterSpacing: 1,
            padding: 8,
            fontWeight: 'bold',
            display: 'none'
        }

        

        return (
            <div className='menu-container' style={containerStyle}>
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

export default Menu;