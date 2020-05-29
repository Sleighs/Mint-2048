import React, { Component } from 'react';
import GameManager from '../GameManager';

class Powers extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){

    }

    render(){
        let powersContainerStyle = {
            width: 410,
            height: 50,
            margin: 'auto',
            borderRadius: 5,
            background: '#bbada0',
            padding: '7px 5px'
        }
        let powerStyle = {
            display: 'inline-block',
            color: '#F4FEF9',
            borderRadius: 4,
            background: '#cdc1b4',
            width: 123,
            height: 36,
            textAlign: 'center',
            margin: '0 5px'
        }
        
        return(
            <div className={'powers'} style={powersContainerStyle}>
                <div className={'power1'} style={powerStyle}>{''}</div>
                <div className={'power2'} style={powerStyle}>{''}</div>
                <div className={'power3'} style={powerStyle}>{''}</div>
            </div>
        )
    }
}


export default Powers;