import * as d3 from 'd3';

export class presentationUtils {
   constructor() { }
   //
   //Draws the graphs that are needed for presentation using the given data,
   //width, height 
   drawBars(data: any[], svg:any, width:number, height:number): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

    // Draw the X-axis on the DOM
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([height, 0]);

    // Draw the Y-axis on the DOM
    svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.Framework))
    .attr("y", (d: any) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => height - y(d.Stars))
    .attr("fill", "#d04a35");
  }

}
