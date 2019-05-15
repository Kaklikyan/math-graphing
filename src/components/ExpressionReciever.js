import React, { PureComponent } from 'react'
import Graph from './Graph';
import WolframGraph from './WolframGraph';

export default class ExpressionReciever extends PureComponent {
    state = {
        status: false,
        expression: '',
        handler: 'custom',
        expressionFunc: null,
    }

    handleBtnClick = () => {
        const { expression } = this.state;
        const clearedExpression = expression.replace(/[\[\]\{\}']+/g, "").replace(" ", "");
        try {
            if (/\d+/g.test(clearedExpression) === null) throw new Error();
            const variable = clearedExpression
                .replace(/[\(\)']+/g, "")
                .replace(/[0-9]+/g, "")
                .replace(/[+*\/-]/g, "");
            const expressionFunc = new Function(variable, `return ${clearedExpression}`);
            this.setState({ status: true, expressionFunc });
        } catch (e) {
            alert('Can not understand your function')
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            status: false,  
        })
    }

    handleMethodChange = e => {
        this.setState({ 
            handler: e.target.value,
            status: false,  
        })
    }

    render() {
        const { expression, status, handler, expressionFunc } = this.state;
        return (
                <>
                    <div>
                        <select value={handler} onChange={this.handleMethodChange}>
                            <option value="custom">Custom</option>
                            <option value="wolfram">Wolfram</option>
                        </select>
                    </div>
                    <br />
                    <input 
                        type="text"
                        name="expression"
                        value={expression}
                        onChange={this.handleInputChange}
                        placeholder="Enter function"
                    />
                    <br />
                    <br />
                    <button onClick={this.handleBtnClick}>Run</button>
                    <br />
                    {status && handler === 'custom' && <Graph handler={handler} expressionFunc={expressionFunc} />}
                    {status && handler === 'wolfram' && <WolframGraph handler={handler} expression={expression} />}
                </>
        )
    }
}
