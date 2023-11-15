import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  //
  //
  constructor() { }
   //
   //Draws the graphs that are needed for presentation using the given data,
   //width, height 
   drawBars(data: any[], svg:any, tip: ElementRef, width:number, height:number, bar:string, color:string, count:number, index): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);
    //
    //Draw the X-axis on the DOM
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
    //
    //Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 800000])
    .range([height, 0]);
    //
    // Draw the Y-axis on the DOM
    svg.append("g")
    .call(d3.axisLeft(y));

    const tooltip = d3.select(tip.nativeElement)
      .style('display', 'none');
    //
    //Create and fill the bars
    svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.Framework) + ((x.bandwidth()/count)*index))
    .attr("y", (d: any) => y(d[bar]))
    .attr("width", x.bandwidth()/count)
    .attr("height", (d: any) => height - y(d[bar]))
    .attr("fill", color)
    .on('mouseover', (event, d) => {
        d3.select(event.target).attr('fill', 'orange');
        tooltip
        .style('display', 'block')
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 15) + 'px')
        .text(d.Released);
    })
    .on('mouseout', (event, d) => {
      d3.select(event.target).attr('fill', color)
      console.log(`Mouseout: ${d.category}, Value: ${d.value}`);
    });

  }

}
