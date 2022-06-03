import React, { Component } from 'react';
import Game from './Game';
import GameManager from '../GameManager';
import { useMediaQuery } from 'react-responsive';

class GetView extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        //this.viewRef = React.createRef()
        this.getMediaQuery = this.getMediaQuery.bind(this)
    }

    getMediaQuery(){
        return useMediaQuery({ maxWidth: 760 })
        //return useMediaQuery({ query: `(max-width: 760px)` })
    }

    render() {
        let viewStyle = {
            height: 705,
            //width: this.getMediaQuery ? '95vw': null,
            margin: this.getMediaQuery ? 0 : 0,
        }
        let footerStyle = {
            textAlign: 'center',
            width: this.getMediaQuery ? '85vw' : 400,
            marginTop: this.getMediaQuery ? 25 : 20,
            margin: '5% auto',
            color: '#C6BABD',
        }

        return (
            <div className="view" 
                style={viewStyle} 
                ref={ref => !this.state.viewRef && this.setState({ viewRef: ref })}
            >
                <Game size={GameManager.size} viewRef={this.state.viewRef}/> 
            
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