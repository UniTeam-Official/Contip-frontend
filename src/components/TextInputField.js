import React, { Component } from "react";

class TextInputField extends Component {
    render() {
        const { textInputList } = this.props;
        const inputs = textInputList.map(input => {
            return (
                <input type={ input.type } name={ input.name } id={ input.id } value={ input.value } onChange={ input.onChange } placeholder={ input.placeholder } key={ input.id } />
            );
        });

        return inputs;
    }
}

export default TextInputField;
