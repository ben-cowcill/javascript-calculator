import React from 'react';
import './App.css';

// VARS
const operators = ['/','*','-','+'];

//  COMPONENTS

class Button extends React.Component {
  constructor(props){
    super(props);
    }
  render(){
    return(
      <button data-value={this.props.name} onClick={this.props.onClick} className='button'>{this.props.label}</button>
    );
  }
}


class Display extends React.Component {
  constructor(props){
    super(props);
  }
  
  
  render(){
      return(
      <div className='display'>
          {this.props.input}
      </div>
       ); 
    }
}
 

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '0',
      currentVal: '0'
    }
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.calc = this.calc.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  
  handleClick(e) {   
    const value = e.target.getAttribute('data-value');
    
    switch (value) {
      case 'AC':
        this.reset();
        break;
      case '=':
        this.calc(this.state.input);
        break;
      case '0':
        this.handleZero(value);
        break;
      case '.':
        this.handleDecimal(value);
        break; 
      case '/':
      case '*':
      case '-':
      case '+':
        this.handleOperator(value);
        break;
      default:
        this.handleNumber(value);
    }
  }
  
  reset() {
    this.setState({
      input: '0',
      currentVal: '0'
    })
  }
  
  calc(value) {
    const calcString = value.join("");
    const result = Math.round(eval(calcString) * 8e2 ) / 8e2;
      this.setState({
        input: result.toString()
    })
       
  }
  
  handleZero(value) {
    if (this.state.currentVal[0] !== value || this.state.currentVal.includes('.')) {
      this.updateDisplay(value);
    }
  }
  
  handleDecimal(value) {
    if (!this.state.currentVal.includes(value)){
      this.updateDisplay(value);
    }
  }
  
  handleOperator(value) {
    if (operators.indexOf(this.state.input[this.state.input.length-1]) !== -1 || this.state.input === '0'){
          this.setState(prevState => ({
            input: [...prevState.input.slice(0,-1), value],
            currentVal: ''
            })) 
      
        }else{
          this.setState(prevState => ({
            input: [...prevState.input, value],
            currentVal: ''
            }))
        }
  }

  handleNumber(value) {
    if (this.state.currentVal[0] === '0' && this.state.currentVal.length === 1) {
          this.setState(prevState => ({
          input: [...prevState.input.slice(0,-1), value,],
          currentVal: [...prevState.currentVal.slice(0,-1), value]
          }))
        }else{
          this.updateDisplay(value);
       }
  }
  
  updateDisplay(value) {
    this.setState(prevState => ({
            input: [...prevState.input, value],
            currentVal: [...prevState.currentVal, value]
            }))
  }
  
  render(){
    return(
      <div className='background'>
          <div className='calculator'>
            <Display id='display' active={this.state.active} input={this.state.input} output={this.state.output}/>
            <div className='buttons'>
             <div className='cell-1'>
               <Button id='clear' name='AC' label='CE' onClick={this.handleClick} />
             </div>   
               <Button id='divide' name='/' label='/' onClick={this.handleClick} />
               <Button id='seven' name='7' label='7' onClick={this.handleClick} /> 
               <Button id='eight' name='8' label='8' onClick={this.handleClick} />
               <Button id='nine' name='9' label='9' onClick={this.handleClick} />
               <Button id='multiply' name='*' label='x' onClick={this.handleClick} />
               <Button id='four' name='4' label='4' onClick={this.handleClick} />
               <Button id='five' name='5' label='5' onClick={this.handleClick} />
               <Button id='six' name='6' label='6' onClick={this.handleClick} />
               <Button id='subtract' name='-' label='—' onClick={this.handleClick} />
               <Button id='one' name='1' label='1' onClick={this.handleClick} />
               <Button id='two' name='2' label='2' onClick={this.handleClick} />
               <Button id='three' name='3' label='3' onClick={this.handleClick} />
               <Button id='add' name='+' label='+' onClick={this.handleClick} />
             <div className='cell-15'> 
               <Button id='zero' name='0' label='0' onClick={this.handleClick} />
             </div>  
               <Button id='decimal' name='.' label='.' onClick={this.handleClick} />
               <Button id='equals' name='=' label='=' onClick={this.handleClick} />
            </div>
          </div>  
        <p>Designed and coded in React.js by<br/><span className='myName'>Ben Cowcill</span></p>
        
      </div> 
    );
  }
}

export default App;
