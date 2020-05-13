import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';

class Menu extends Component {
    render (){
        let menuContainerStyle = {
            width: 400,
            height: 600
        }
        return (
            <div className='menu-container' style={menuContainerStyle}>

            </div>
        )
    }
}

export default Menu;