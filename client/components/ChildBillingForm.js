import React from 'react'

import {useToasts} from 'react-toast-notifications'
export default function ChildBillingForm(props) {
  const {addToast} = useToasts()

  const handleChildSubmit = e => {
    console.log('not making it into child handle?')
    addToast('Gotcha, these are fake chairs dummy!', {appearance: 'success'})
    props.handleSubmit(e)
  }
  return (
    <form onSubmit={handleChildSubmit}>
      <label>Name:</label>
      <input
        name="name"
        type="text"
        value={props.name}
        onChange={props.handleChange}
      />
      <label>Address:</label>
      <input
        name="address"
        type="text"
        value={props.address}
        onChange={props.handleChange}
      />
      <label>Credit Card:</label>
      <input
        name="cardNumber"
        type="text"
        placeholder="Not a real CC...SERIOUSLY"
        value={props.cardNumber}
        onChange={props.handleChange}
      />

      <button type="submit">Confirm Order</button>
    </form>
  )
}
