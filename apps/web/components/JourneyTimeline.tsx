// apps/web/components/JourneyTimeline.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockCustomers, Customer, Touchpoint } from '../lib/mock-data';

const engagementColorMap = {
  high: 'green',
  medium: 'yellow',
  low: 'red',
};

const channelIconMap = {
  email: '📧',
  website: '🌐',
  social: '📱',
  sales_call: '📞',
};

interface JourneyTimelineProps {
    searchQuery: string;
    engagementFilter: string;
    channelFilter: string;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ searchQuery, engagementFilter, channelFilter }) => {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTouchpoint, setSelectedTouchpoint] = useState<Touchpoint | null>(null);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);

  useEffect(() => {
    let customers = mockCustomers;

    if (searchQuery) {
      customers = customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (engagementFilter) {
        customers = customers.map(c => ({
            ...c,
            journey: c.journey.filter(t => t.engagement === engagementFilter)
        })).filter(c => c.journey.length > 0);
    }

    if (channelFilter) {
        customers = customers.map(c => ({
            ...c,
            journey: c.journey.filter(t => t.channel === channelFilter)
        })).filter(c => c.journey.length > 0);
    }

    setFilteredCustomers(customers);
  }, [searchQuery, engagementFilter, channelFilter]);

  useEffect(() => {
    const drawChart = () => {
        if (ref.current && containerRef.current && filteredCustomers.length > 0) {
            const svg = d3.select(ref.current);
            svg.selectAll("*").remove(); // Clear previous render
    
            const width = containerRef.current.offsetWidth;
            const height = 500;
    
            svg.attr('viewBox', `0 0 ${width} ${height}`);
    
            const allTimestamps = filteredCustomers.flatMap(c => c.journey.map(t => new Date(t.timestamp)));
            const timeDomain = d3.extent(allTimestamps) as [Date, Date];
    
            const xScale = d3.scaleTime().domain(timeDomain).range([150, width - 50]);
            const yScale = d3.scaleBand().domain(filteredCustomers.map(c => c.id)).range([50, height - 100]).padding(0.1);
    
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale).tickFormat(d => filteredCustomers.find(c => c.id === d)?.name || '');
    
            const g = svg.append('g');
    
            g.append('g')
            .attr('transform', `translate(0, ${height - 50})`)
            .call(xAxis);
    
            g.append('g')
            .attr('transform', `translate(150, 0)`)
            .call(yAxis);
    
            const customerGroups = g.selectAll('.customer-group')
            .data(filteredCustomers)
            .enter()
            .append('g')
            .attr('class', 'customer-group')
            .attr('transform', d => `translate(0, ${yScale(d.id) || 0})`);
    
            customerGroups.selectAll('.touchpoint')
            .data(d => d.journey)
            .enter()
            .append('text')
            .attr('class', 'touchpoint')
            .attr('x', d => xScale(new Date(d.timestamp)))
            .attr('y', yScale.bandwidth() / 2)
            .attr('fill', d => engagementColorMap[d.engagement])
            .text(d => channelIconMap[d.channel])
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                setSelectedTouchpoint(d as Touchpoint);
            });
    
            const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 5])
            .translateExtent([[0, 0], [width, height]])
            .on('zoom', (event) => {
                g.attr('transform', event.transform.toString());
            });
    
            svg.call(zoom);
        }
    }

    drawChart();

    window.addEventListener('resize', drawChart);
    return () => window.removeEventListener('resize', drawChart);

  }, [filteredCustomers]);

  return (
    <div ref={containerRef}>
      <svg ref={ref}></svg>
      {selectedTouchpoint && (
        <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '2em', background: 'white', border: '1px solid black' }}>
          <h2>Touchpoint Details</h2>
          <p><strong>Channel:</strong> {selectedTouchpoint.channel}</p>
          <p><strong>Content:</strong> {selectedTouchpoint.content}</p>
          <p><strong>Engagement:</strong> {selectedTouchpoint.engagement}</p>
          <p><strong>Timestamp:</strong> {selectedTouchpoint.timestamp}</p>
          <button onClick={() => setSelectedTouchpoint(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default JourneyTimeline;
