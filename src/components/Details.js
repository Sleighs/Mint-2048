import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';
import '../App.css'

//render board
class Details extends Component {
    render() {
        let containerStyle = {
            position: 'absolute',
            margin: '-370px 0 0 475px',
            padding: 5,
            width: 250,
            height: 250,
            fontSize: '1em',
        }
        let instructionsStyle = {
            margin: 'auto',
            opacity: .9
        }
        let tooltipStyle = {
            width: 200,
            height: 100,
            marginTop: 25,
            fontSize: '1.5em'
        }
            

        return(
            <div className='details-container' style={containerStyle}>
                <div style={instructionsStyle}>
                    <table>
                        <tbody>
                        <tr>
                            <th style={{fontSize: '.82em'}}><h2>{'Controls'}</h2></th>
                        </tr>
                        <tr>
                            <td style={{fontWeight: 'bold'}}>{'Arrows'}</td>
                            <td>{!GameManager.choosePowers ? 'Move tiles' : 'Select Power'}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: 'bold'}}>{'Shift'}</td>
                            <td>{'Undo'}</td>
                        </tr>
                        <tr style={{display: !GameManager.powersModeOn ? 'none' : ''}}>
                            <td style={{fontWeight: 'bold'}}>{'Enter'}</td>
                            <td>{GameManager.navPowerTiles ? 'Use Power' : (!GameManager.choosePowers ? 'Open Powers' : 'Close Powers' )}</td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: 'bold'}}>{'Esc'}</td>
                            <td>{GameManager.powersModeOn ? 'Menu' : 'Menu'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className='tooltip-container' style={tooltipStyle}>
                    
                </div>
                
            </div>
        )
    }
}
export default Details; 