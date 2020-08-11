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
    let guestOrder = JSON.parse(localStorage.getItem('guestOrder'))
    console.log('GUEST ORDER on billing Form', guestOrder)
    console.log('props', this.props)
    return (
      <div>
        <div className="billingForm">
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Name</label>
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <label>Address</label>
          <input
            name="cardNumber"
            type="text"
            value={this.state.cardNumber}
            onChange={this.handleChange}
          />
          <label>
            Credit Card DON'T ENTER YOUR REAL CC NUMBER HERE DONT DO IT FO REAL
          </label>
          <button type="button">Submit</button>
        </div>
      </div>
    )
  }
}

export default BillingForm
