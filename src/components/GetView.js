import React, { useLayoutEffect, useState, useEffect } from 'react';
import Game from './Game';
import GameManager from '../GameManager';

function useWindowSize () {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize () {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

const GetView = () => {
    const [windowWidth, windowHeight] = useWindowSize();

    useEffect(() => {
        GameManager.windowWidth = windowWidth;
        GameManager.windowHeight = windowHeight;
    })

    let viewStyle = {
        margin: 0,
    }
    let footerStyle = {
        textAlign: 'center',
        width: '85vw',
        margin: '5% auto',
        marginTop: 25,
        color: '#C6BABD',
    }

    return (
        <div className="view" style={viewStyle}>
            <Game 
                size={GameManager.size} 
                windowHeight={windowHeight}
                windowWidth={windowWidth}
            /> 
            
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

export default GetView; 