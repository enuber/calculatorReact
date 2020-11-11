import '../../styles/screen.css';
import React from 'react';
import ResultScreen from './ResultScreen';
import ComputationScreen from './ComputationScreen';

const screen = () => {
    return(
    <section className="screen">
        <ResultScreen/>
        <ComputationScreen/>
    </section>
    )
};

export default screen;