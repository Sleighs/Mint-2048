
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
            width: 250,
            height: 250,
            borderRadius: 4,
            //border: 'solid 1pt',
            position: 'absolute',
            //display: 'none',
            margin: '275px 75px',
            //padding: '25px 0',
            //background: '#FAF8EF',//'#eee4da', //'#BFF0D6', //'#ebcf8a',
            //opacity: '90%',
            padding: '0',
            zIndex: 3
        }
        

        return(
            <div className='powers-wrapper' style={wrapperStyle}>
                <Powers useAbility={this.props.useAbility}/>
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
        let containerStyle = {
            /*width: 220,
            height: 300,
            borderRadius: 4,
            border: 'solid 1pt',
            //position: 'absolute',
            //display: 'none',
            margin: 'auto',
            //padding: '25px 0',
            background: '#FAF8EF',//'#eee4da', //'#BFF0D6', //'#ebcf8a',
            //opacity: '90%',
            padding: '0',
            zIndex: 3*/
        }
        let tableStyle = {
            width: 250,
            height: 250,
            //border: 'solid 1pt green',
            zIndex: 5
        }
    
        let itemStyle = {
            height: 65,
            width: 65,
            color: 'white',
            background: 'rgba(155,155,174, .8)',
            margin: 5,
            borderRadius: '50%',
            textAlign: 'center'
        }
        let itemStyle1 = {
            height: 75,
            width: 75,
            color: 'white',
            background: GameManager.powers[1].color,
            margin: 5,
            borderRadius: '50%',
            textAlign: 'center',
            opacity: .8
        }
        let itemStyle2 = {
            height: 75,
            width: 75,
            color: 'white',
            background: GameManager.powers[0].color,
            margin: 5,
            borderRadius: '50%',
            textAlign: 'center',
            opacity: .8
        }
        let itemStyle3 = {
            height: 75,
            width: 75,
            color: 'white',
            background: GameManager.powers[2].color,
            margin: 5,
            borderRadius: '50%',
            textAlign: 'center',
            opacity: .8
        }
        let itemStyle4 = {
            height: 75,
            width: 75,
            color: 'white',
            background: GameManager.powers[4].color,
            margin: 5,
            borderRadius: '50%',
            textAlign: 'center',
            opacity: .8
        }
        let emptyStyle = {
            height: 60,
            width: 60,
            color: 'white',
            margin: 5
        }
        
        
        /*
            get list of powers in game
            generate table

        */


        return (
            <div className={'power', this.props.type} style={containerStyle}>
                <table style={tableStyle}>
                    <tr>
                        <td style={emptyStyle}></td>
                        <td style={itemStyle1}>{GameManager.powers[1].type} <br/>{GameManager.powers[1].count}</td>
                        <td style={emptyStyle}></td>
                    </tr>
                    <tr>
                        <td style={itemStyle2}>{GameManager.powers[0].type} <br/>{GameManager.powers[0].count}</td>
                        <td style={emptyStyle}></td>
                        <td style={itemStyle3}>{GameManager.powers[2].type} <br/>{GameManager.powers[2].count}</td>
                    </tr>
                    <tr>
                        <td style={emptyStyle}></td>
                        <td style={itemStyle4}><div onClick={()=>{
                            GameManager.navPowerTiles = false;
                            GameManager.activePower = {type: GameManager.powers[3].type, count: GameManager.powers[3].count}
                            this.props.useAbility(GameManager.powers[3].type, 3);
                            }}>
                                {GameManager.powers[3].type} <br/>{GameManager.powers[3].count}</div>
                        </td>
                        <td style={emptyStyle}></td>
                    </tr>
                </table>
            </div>
        )
    }
}


export default PowersMenu;