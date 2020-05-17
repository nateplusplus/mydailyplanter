import React from "react"

import { createPlant } from "../services/userplants"

const defaultState = {
    name: ``,
}

class AddPlantForm extends React.Component {
    constructor( props ) {
        super(props)
        this.state = defaultState
    }

    resetState = () => this.setState( defaultState )

    handleUpdate = event => {
        // ..
    }

    handleSuccess = userData => {
        // ..
    }

    handleFailure = errorData => {
        // ..
    }

    handleSubmit = event => {
        // ..
    }

    getErrorMessage = () => {
        // ..
    }

    render() {
        return (
            <form id="addPlant">
                <div className="py-2 my-2 flex items-stretch w-full">
                    <input
                        title='Plant Name'
                        type="text"
                        name="name"
                        value={ this.state.name }
                        onChange={ this.handleUpdate }
                        className="border p-2 my-0 flex-1 border-r-0"
                        placeholder='Type a name for your plant (Example: "Aloe Vera")'
                    />
                    <button
                        type="button"
                        name="add-plant-submit"
                        className="border p-2 w-8 bg-grey-lighter hover:bg-blue-light flex-no-shrink"
                        >+</button>
                </div>
            </form>
        )
    }
}

export default AddPlantForm