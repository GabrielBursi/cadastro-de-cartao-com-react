/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
/* eslint-disable default-case */
import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

import Button from './Button';

function Form() {
    
    const { setName, setNumber, setMonth, setYear, setCVC } = useContext(FormContext);
    
    const regexStr = /^[a-zA-Z\s]+$/;
    const regexNum = /^[0-9]+$/;

    function isEmpty(e){
        return e === '';
    }
    
    function filterInputName(e){
        let value = e.target.value;
        if(!value.match(regexStr)) {
            let valueWithoutNumber = value.substring(0, value.length - 1);
            e.target.value = valueWithoutNumber
        }else{
            setName(value.toUpperCase());
        }
    }
    
    function filterInputNumber(e, setState){
        let value = e.target.value;
        if(!value.match(regexNum)){
            let valueWithoutLetter = value.substring(0, value.length - 1);
            e.target.value = valueWithoutLetter;
        }else{
            setState(value.slice(0, 16));
        }
    }
    
    function filterInputs(e, setState, regex){
        switch(regex){
            case regexStr:
                filterInputName(e)
                break
            case regexNum:
                filterInputNumber(e, setState)
                break
        }
    }
    function setInputs(e, setState, regex, state){
        let value = e.target.value
        if(isEmpty(value)){
            setState(state)
        }else{
            filterInputs(e, setState, regex)
        }
    }

    function formatNumber(e){
        const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = value.match(/\d{4,16}/g);
        const match = matches && matches[0] || ''
        const parts = []

        for (let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }

        if (parts.length) {
            const numberCard = parts.join(' ')
            setNumber(numberCard)
        } else {
            return value
        }
    }

    function getInputs() {
        const inputsNodeList = document.querySelectorAll("input");
        return inputsNodeList
    }

    return (
        <form>
            <div className="form-container">
                <label htmlFor="cardholder">CARDHOLDER NAME</label>
                <input 
                    id="cardholder" 
                    type="text" 
                    autoComplete='off'
                    placeholder='ex: Gabriel Bursi' 
                    onChange={(e) => {setInputs(e, setName, regexStr, "GABRIEL BURSI")}}
                />

                <label htmlFor="card-number">CARD NUMBER</label>
                <input 
                    id="card-number" 
                    type="text" 
                    placeholder='0000 0000 0000 0000' 
                    minLength={16} 
                    maxLength={16} 
                    autoComplete='off' 
                    onChange={(e) => {setInputs(e, setNumber, regexNum, "0000 0000 0000 0000"); formatNumber(e)}}
                />
                <div className="data-cvc">
                    <div className='date'>
                        <label htmlFor="date">EXP. DATE (MM/YY)</label>
                        <div className='inputs-my'>
                            <input 
                                id="date" 
                                type="text" 
                                placeholder='MM' 
                                minLength={2} 
                                maxLength={2} 
                                autoComplete='off'
                                onChange={(e) => {setInputs(e, setMonth, regexNum, "00")}}
                            />
                            <input 
                                id="date" 
                                type="text" 
                                placeholder='YY' 
                                minLength={2} 
                                maxLength={2} 
                                autoComplete='off' 
                                onChange={(e) => {setInputs(e, setYear, regexNum, "00");}}
                            />
                        </div>
                    </div>
                    <div className='cvc-form'>
                        <label htmlFor="cvc-form">CVC</label>
                        <input 
                            id="cvc-form" 
                            type="text" 
                            placeholder='123' 
                            minLength={3} 
                            maxLength={3} 
                            autoComplete='off' 
                            onChange={(e) => {setInputs(e, setCVC, regexNum, "000");}}
                        />
                    </div>
                </div>
                <Button nav='/complete' text='Confirm' inputs={getInputs}/>
            </div>
        </form>
    );
}

export default Form;