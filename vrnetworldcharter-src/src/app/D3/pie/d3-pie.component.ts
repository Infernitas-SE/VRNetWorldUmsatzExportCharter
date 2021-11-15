import { Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { D3PieConfig } from '..'

@Component({
  selector: 'd3-pie',
  templateUrl: './d3-pie.component.html',
  styleUrls: ['./d3-pie.component.scss'],
})
export class D3PieComponent implements OnInit {
  @Input() cfg!: D3PieConfig

  private svg
  private colors

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.cfg.width)
      .attr('height', this.cfg.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.cfg.width / 2 + ',' + this.cfg.height / 2 + ')'
      )
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.cfg.data.map((d) => d.name))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782'])
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value))

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.cfg.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.cfg.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px')

    // Add labels
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.cfg.radius)

    this.svg
      .selectAll('pieces')
      .data(pie(this.cfg.data))
      .enter()
      .append('text')
      .text((d) => d.data.name)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15)
  }

  ngOnInit(): void {
    this.createSvg()
    this.createColors()
    this.drawChart()
  }
}
