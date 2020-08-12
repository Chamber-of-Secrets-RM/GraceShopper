import React, {Component} from 'react'
import {scaleLinear, scaleTime} from 'd3-scale'
import {select} from 'd3-selection'
import {max, extent} from 'd3-array'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'
import {connect} from 'react-redux'
import {convertTime} from './helperFunctions'
import {timeParse} from 'd3-time-format'

class LineGraph extends Component {
  constructor(props) {
    super(props)
    this.createLineGraph = this.createLineGraph.bind(this)
  }
  componentDidMount() {
    console.log('COMPONENT DID MOUNT LINE GRAPHXXX?')
    this.createLineGraph()
  }
  // componentDidUpdate() {
  //   this.createLineGraph()
  // }
  createLineGraph() {
    console.log('creating a line graph')
    console.log('what are my props', this.props)
    const node = this.node

    let margin = {top: 10, right: 30, bottom: 30, left: 60}
    let width = 460 - margin.left - margin.right
    let height = 400 - margin.top - margin.bottom
    let testArray = []
    let hashTable = {}
    for (let element of this.props.orderHistory) {
      let x = element.updatedAt
      x = convertTime(x)
      if (x in hashTable) {
        hashTable[x] += parseInt(element.quantity)
      } else {
        hashTable[x] = parseInt(element.quantity)
      }
    }
    console.log('what is my hashTable', hashTable)
    var parseTime = timeParse('%d-%b-%y')
    for (let key of Object.keys(hashTable)) {
      console.log()
      let newObj = {
        x: parseTime(key),
        y: hashTable[key]
      }
      testArray.push(newObj)
    }
    let total = testArray[0].y
    for (let i = 1; i < testArray.length; i++) {
      let temp = testArray[i].y
      testArray[i].y += total
      total += temp
    }

    console.log('WHAT IS MY TEST ARRAY', testArray)
    // convert all dates in array to match the domain on line 61
    // can write a quick helper function

    let svg = select(node)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let x = scaleTime()
    ///.domain([new Date("1972-02-24 00:00:00"), new Date("1972-03-06 00:00:00")])
    x
      .domain(
        extent(testArray, function(d) {
          return d.x
        })
      )
      .range([0, width])
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(x))

    let y = scaleLinear()
      .domain([
        0,
        max(testArray, function(d) {
          return +d.y
        })
      ])
      .range([height, 0])

    svg.append('g').call(axisLeft(y))

    // add the line
    svg
      .append('path')
      .datum(testArray)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        line()
          .x(function(d) {
            return x(d.x)
          })
          .y(function(d) {
            return y(d.y)
          })
      )
  }

  render() {
    console.log('RENDERING LINE GRAPH')
    if (!this.props.orderHistory) {
      return <div>hello</div>
    } else {
      return (
        <div>
          {/* <div>{this.props.orderHistory[0].quantity}</div> */}
          <div id="my_dataviz" ref={node => (this.node = node)} />
        </div>
      )
    }
  }
}
const mapState = state => {
  return {
    orderHistory: state.orderHistory
  }
}

export default connect(mapState, null)(LineGraph)
