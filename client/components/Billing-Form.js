import React from 'react'

class BillingForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      cardNumber: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit() {}
  render() {
    return (
      <div className="billingForm">
        <input name="name" type="text" value={this.state.name} />
        <label>Name</label>
        <input name="address" type="text" value={this.state.address} />
        <label>Address</label>
        <input name="cardNumber" type="text" value={this.state.cardNumber} />
        <label>
          Credit Card DON'T ENTER YOUR REAL CC NUMBER HERE DONT DO IT FO REAL
        </label>
        <button>Submit</button>
      </div>
    )
  }
}

export default BillingForm
