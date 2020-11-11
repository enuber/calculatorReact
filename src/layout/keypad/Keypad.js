import '../../styles/keypad.css';
import React from 'react';
import KeypadRow from './KeypadRow';
import Button from '../../components/Button';

const keypad = () => {
    return(
        <section className="keypad">
            <KeypadRow>
                <Button>C</Button>
                <Button>&larr;</Button>
                <Button>%</Button>
                <Button type="Orange">/</Button>
            </KeypadRow>
            <KeypadRow>
                <Button>9</Button>
                <Button>8</Button>
                <Button>7</Button>
                <Button type="Orange">*</Button>
            </KeypadRow>
            <KeypadRow>
                <Button>6</Button>
                <Button>5</Button>
                <Button>4</Button>
                <Button type="Orange">-</Button>
            </KeypadRow>
            <KeypadRow>
                <Button>3</Button>
                <Button>2</Button>
                <Button>1</Button>
                <Button type="Orange">+</Button>
            </KeypadRow>
            <KeypadRow>
                <Button type="Large">0</Button>
                <Button>.</Button>
                <Button type="Orange">=</Button>
            </KeypadRow>
        </section>
    )
};

export default keypad;