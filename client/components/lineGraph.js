class LineGraph extends Component {
  constructor(props) {
    super(props)
    this.createLineGraph = this.createLineGraph.bind(this)
  }
  componentDidMount() {
    this.createLineGraph()
  }
  componentDidUpdate() {
    this.createLineGraph()
  }
  createLineGraph() {
    const node = this.node

    let margin = {top: 10, right: 30, bottom: 30, left: 60}
    let width = 460 - margin.left - margin.right
    let height = 400 - margin.top - margin.bottom
    let testArray = []
    let testObj1 = {
      y: 1,
      x: 5
    }
    let testObj2 = {
      y: 4,
      x: 20
    }
    let testObj3 = {
      y: 9,
      x: 30
    }
    testArray.append(testObj1)
    testArray.append(testObj2)
    testArray.append(testObj3)

    let svg = select(node)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let x = scaleLinear().domain([
      0,
      max(
        testArray(data, function(d) {
          return +d.x
        })
      )
    ])
    let y = scaleLinear()
      .domain([
        0,
        max(
          testArray(data, function(d) {
            return +d.y
          })
        )
      ])
      .range([height, 0])

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
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
