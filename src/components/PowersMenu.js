
import React, { Component } from 'react';
import GameManager from '../GameManager';

class PowersMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    getAbilityColor(type) {
        var color;

        switch(type){
            case 'divide':
                color = '#E26369';
                break;
            case 'freeze':
                color = '#7AB5D5';
                break;
            case 'multiply':
                color = '#6ED475';
                break;
            case 'four tile':
            case 'two tile':
                color = '#e6eaf0';
                break;
            case 'grow':
                color = '#d7e376';
                break;
            default:
                color = '#bbada0';
        }

        return color;
    }

    render(){
        let wrapperStyle = {
            display: 'none',
            width: 410,
            height: 90,
            margin: 'auto',
            borderRadius: 6
        }
        let containerStyle = {
            width: 410,
            height: 50,
            margin: 'auto',
            borderRadius: 5,
            background: '#bbada0',
            padding: '7px 5px'
        }

        return(
            <div className='powers-wrapper' style={wrapperStyle}>
                <div className='powers-container' style={containerStyle}>
                    <Powers />
                </div>
            </div>
        )
    }
}

class Powers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            powersTooltipMsg: ''
        }
    }

    
    
    render() {
        let powerStyle = {
            
        }


        return (
            <div className={'power', this.props.type} style={powerStyle} 
                onMouseEnter={()=>{this.tooltip(true, this.props.type)}} 
                onMouseLeave={()=>{this.tooltip(false, this.props.type)}}
            >
                <div onClick={()=>{this.props.useAbility(this.props.type, this.props.id)}}>Power 1</div>
                <div onClick={()=>{this.props.useAbility(this.props.type, this.props.id)}}>Power 2</div>
                <div onClick={()=>{this.props.useAbility(this.props.type, this.props.id)}}>Power 3</div>
            </div>
        )
    }
}


export default PowersMenu;