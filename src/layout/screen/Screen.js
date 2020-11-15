import '../../styles/screen.css';
import React from 'react';
import ResultScreen from './ResultScreen';
import ComputationScreen from './ComputationScreen';

const screen = (props) => {
    return(
    <section className="screen">
        <ResultScreen>{props.result}</ResultScreen>
        <ComputationScreen>{props.equation}</ComputationScreen>
    </section>
    )
};

export default screen;