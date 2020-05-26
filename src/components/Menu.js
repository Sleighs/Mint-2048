import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

class Menu extends Component {
    render (){
        let menuContainerStyle = {
            width: 420,
            height: 590,
            borderRadius: 4,
            //border: 'solid 1pt',
            position: 'absolute',
            //display: 'none',
            margin: 'auto',
            background:'#eee4da', //'#BFF0D6', //'#ebcf8a',
            //opacity: '70%',
            padding: '0'
        }
        return (
            <div className='menu-container' style={menuContainerStyle} onClick={this.props.openMenu}>
                <MenuItem />
            </div>
        )
    }
}

class Scores extends Component {
    render() {

        return (
            <div className='menu-scores'>
                <ul>
                    
                </ul>
            </div>
        )
    }
}

class MenuItem extends Component {
    render() {
        let containerStyle = {

        }
        let menuListStyle = {
            listStyleType: 'none'
        }

        let scoreItemStyle = {
            width: 280,
            height: 55,
            backgroundColor: '#FC7F7F',
            margin: 'auto',
            borderRadius: 4,
            textAlign: 'center',
            color: 'white',
            fontSize: '2.5em',
            fontFamily: 'Karla',
            //letterSpacing: 1,
            padding: 0,
            fontWeight: 'bold'
        }



        return (
            <div className='menu-container' style={containerStyle}>
                <ul className={'menu-list'} style={menuListStyle}>
                    <li className={'menu-item', 'menu-item-scores'} style={scoreItemStyle}>Scores</li>
                </ul>
            </div>
        )
    }
   
}

export default Menu;