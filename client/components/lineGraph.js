import React, {Component} from 'react'
import {scaleLinear} from 'd3-scale'
import {select} from 'd3-selection'
import {max} from 'd3-array'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'

class LineGraph extends Component {
  constructor(props) {
    super(props)
    this.createLineGraph = this.createLineGraph.bind(this)
  }
  componentDidMount() {
    this.createLineGraph()
  }
  // componentDidUpdate() {
  //   this.createLineGraph()
  // }
  createLineGraph() {
    console.log('creating a line graph')
    const node = this.node

    let margin = {top: 10, right: 30, bottom: 30, left: 60}
    let width = 460 - margin.left - margin.right
    let height = 400 - margin.top - margin.bottom
    let testArray = []
    let testObj1 = {
      y: 1,
      x: 1
    }
    let testObj2 = {
      y: 4,
      x: 20
    }
    let testObj3 = {
      y: 9,
      x: 30
    }
    let testObj4 = {
      y: 50,
      x: 100
    }
    testArray.push(testObj1)
    testArray.push(testObj2)
    testArray.push(testObj3)
    testArray.push(testObj4)

    let svg = select(node)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let x = scaleLinear()
      .domain([
        0,
        max(testArray, function(d) {
          return +d.x
        })
      ])
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
    return <div id="my_dataviz" ref={node => (this.node = node)} />
  }
}
export default LineGraph
