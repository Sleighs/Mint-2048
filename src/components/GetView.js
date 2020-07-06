import React, { Component } from 'react';
import Game from './Game';
import Details from './Details';
import GameManager from '../GameManager';

class GetView extends Component {
    render() {
        let viewStyle = {
            margin: 5
        }
        let footerStyle = {
            textAlign: 'center',
            width: 440,
            marginTop: 17,
            color: '#C6BABD '
        }

        return (
            <div style={viewStyle}>
                <Game size={GameManager.size}/> 
            
                <div style={footerStyle}>
                    <p style={{fontSize: '.75em'}}>                       
                        <span>By Samuel Wright</span>
                        &nbsp; &nbsp; &nbsp;
                        <a href='https://github.com/Sleighs/Mint-2048' style={{color: '#C6BABD'}}>GitHub</a>
                  
                    </p>
                </div>
                
            </div>
                      
        );
    }   
}

export default GetView; 