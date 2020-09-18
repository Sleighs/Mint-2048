import React, { Component } from 'react';
import GameManager from '../GameManager';

class Combo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        }
    }

    render (){
        let comboContainerStyle = {
            height: 25,
            width: 385,
            margin: '2px auto  0 auto'
        }
        let blocksContainerStyle = {
            width: 350,
            height: 25,
            padding: '3px 0 0 0', 
            margin: 'auto',
            display: 'inline-block'
        } 
        let textStyle = {
            width: 30,
            height: 20,
            padding: '0px 0px',
            fontSize: '1.7em',
            fontWeight: 'bold',
            display: 'inline-block',
            float: 'right',
            marginTop: '-9px',
            opacity: .4,
            color: '#775e65'//'#E4DCDE' //light text 
        }


        return (
            <div className='combo-container' style={comboContainerStyle}>
                <div className='blocks' style={blocksContainerStyle}>
                    {
                        GameManager.comboBlocks.map((ele, i)=> {
                            if (i < 5) {
                                var color = '#E3DCC8';

                                if (GameManager.comboBlocks.length > 4){
                                    color = '#FAEA7E';//'#FFF29B';

                                    /*if ((GameManager.comboBlocks.length + 1) % 5 === 0) {
                                        color = '#FC7F7F'
                                    } else if ((GameManager.comboBlocks.length + 2) % 5 === 0){
                                        color = 'orange'
                                    } else {
                                        color = 'yellow'
                                    }*/
                                } /*else {
                                    color = '#E3DCC8';//'#E4DCDE';//'#cab212';
                                }*/
                                
                                return <Block key={i} color={color}/>;
                            }
                            
                        } )
                    }
                </div>
                <div style={textStyle}>
                    {this.props.comboLength}                    
                </div>
                
            </div>
        )
    }
}

class Block extends Component {
    constructor(props) {
        super(props);
    }
    render (){
        let style = {
            height: 14,
            width: 50,
            margin: '0px 6px 0px 0px',
            display: 'inline-block',
            background: this.props.color,
            borderRadius: 3
        }

        return (
            <div className={'combo-block'} style={style}></div>
        )
    }
}

export default Combo;