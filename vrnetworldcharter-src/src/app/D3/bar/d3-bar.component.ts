import { Component, OnInit, Input } from '@angular/core'
import * as d3 from 'd3'
import { D3Config, D3Data } from '..'

@Component({
  selector: 'd3-bar',
  templateUrl: './d3-bar.component.html',
  styleUrls: ['./d3-bar.component.scss'],
})
export class D3BarComponent implements OnInit {
  private svg!: any
  @Input() cfg!: D3Config

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.cfg.width + this.cfg.margin * 2)
      .attr('height', this.cfg.height + this.cfg.margin * 2)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.cfg.margin + ',' + this.cfg.margin + ')'
      )
  }

  private drawBars(data: D3Data[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.cfg.width])
      .domain(data.map((d) => d.name))
      .padding(0.2)

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.cfg.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([
        0,
        Math.max.apply(
          Math,
          data.map((e) => e.value)
        ),
      ])
      .range([this.cfg.height, 0])

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y))

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(this.cfg.data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.cfg.height - y(d.value))
      .attr('fill', '#d04a35')
  }

  ngOnInit() {
    this.createSvg()
    this.drawBars(this.cfg.data)
  }
}
