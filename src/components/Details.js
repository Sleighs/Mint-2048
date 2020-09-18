import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameManager from '../GameManager';

//render board
class Details extends Component {
    getDetails() {
        return (<div>{GameManager.tooltip}</div>)
    }
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
        }
        let tooltipStyle = {
            width: 200,
            height: 100,
            marginTop: 0
        }
            

        return(
            <div className='details-container' style={containerStyle}>
                <div style={instructionsStyle}>
                    <table>
                        <tr>
                            <th style={{fontSize: '.82em'}}><h2>{'Controls'}</h2></th>
                        </tr>
                        <tr>
                            <td style={{fontWeight: 'bold'}}>{'Arrows'}</td>
                            <td>{'Move tiles'}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: 'bold'}}>{'Shift'}</td>
                            <td>{GameManager.powersModeOn ? 'Open Powers' : 'Undo'}</td>
                        </tr>
                        <tr>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>
                    </table>
                </div>
                
                <div className='tooltip-container' style={tooltipStyle}>
                    {this.getDetails()}
                </div>
                
            </div>
        )
    }
}
export default Details; 