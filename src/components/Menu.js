import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';

class Menu extends Component {
    render (){
        let menuContainerStyle = {
            width: 418,
            height: 595,
            borderRadius: 4,
            //border: 'solid 1pt',
            position: 'absolute',
            //display: 'none',
            margin: 'auto',
            background:'#BFF0D6', //'#ebcf8a',
            opacity: '70%',
            padding: '2%'
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
        return (
            <div>
                <p></p>
            </div>
        );
    }
   
}

export default Menu;