import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { GraphsService } from '../../utils/graphs.service'



@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
  providers:[GraphsService]
})
export class BarComponent implements OnInit {

  private data = [
    {"Framework": "Vue", "Stars": "166443","users": "112443", "Released": "2014 release"},
    {"Framework": "React", "Stars": "150793","users": "172443", "Released": "2013 tuko gangari"},
    {"Framework": "Angular", "Stars": "62342", "users": "800443", "Released": "2016 ndio tunaanza"},
    {"Framework": "Backbone", "Stars": "27647", "users": "112443", "Released": "2010 tuko sawa "},
    {"Framework": "Ember", "Stars": "21471", "users": "112443", "Released": "2011 enables "},
  ];

  @ViewChild('tooltip', { static: true }) tooltip: ElementRef;
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  //constructor() { }
  constructor(private graphs : GraphsService) { }

  ngOnInit(): void {
    this.createSvg();
    // this.drawBars(this.data);
    // this.drawPlot()
    this.graphs.drawBars(this.data, this.svg, this.tooltip, this.width, this.height, 'users', "#c7d3ec", 2 , 0)
    this.graphs.drawBars(this.data, this.svg, this.tooltip, this.width, this.height, 'Stars', "#d04a35", 2, 1)
    //this.graphs.drawBars(this.data, this.svg,this.width, this.height, "#5a6782", 3, 1)
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

   // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));


    const B = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisRight(B));


    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.Framework))
    .attr("y", (d: any) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.Stars))
    .attr("fill", "#d04a35");
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([2009, 2017])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([200, 200000])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d.Released))
    .attr("cy",  (d: any) => y(d.Stars))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text( (d: any) => d.Framework)
    .attr("x", (d: any) => x(d.Released))
    .attr("y", (d: any)  => y(d.Stars))
  }

}
