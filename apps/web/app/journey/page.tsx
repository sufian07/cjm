// apps/web/app/journey/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import JourneyTimeline from '../../components/JourneyTimeline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { mockCustomers } from '../../lib/mock-data';

export default function JourneyPage() {
  const [search, setSearch] = useState('');
  const [engagementFilter, setEngagementFilter] = useState('');
  const [channelFilter, setChannelFilter] = useState('');
  const timelineRef = useRef<HTMLDivElement>(null);

  const exportAsPNG = () => {
    if (timelineRef.current) {
      html2canvas(timelineRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'journey-timeline.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const exportAsPDF = () => {
    if (timelineRef.current) {
      html2canvas(timelineRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), 0);
        pdf.save('journey-timeline.pdf');
      });
    }
  };

  const exportAsCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Customer,Timestamp,Channel,Content,Engagement\n";
    mockCustomers.forEach(customer => {
        customer.journey.forEach(touchpoint => {
            csvContent += `${customer.name},${touchpoint.timestamp},${touchpoint.channel},${touchpoint.content},${touchpoint.engagement}\n`;
        });
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'journey-timeline.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Customer Journey Visualization</h1>
      <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <input type="text" placeholder="Search customer..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={engagementFilter} onChange={e => setEngagementFilter(e.target.value)}>
          <option value="">All Engagements</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={channelFilter} onChange={e => setChannelFilter(e.target.value)}>
          <option value="">All Channels</option>
          <option value="email">Email</option>
          <option value="website">Website</option>
          <option value="social">Social</option>
          <option value="sales_call">Sales Call</option>
        </select>
        <button onClick={exportAsPNG}>Export as PNG</button>
        <button onClick={exportAsPDF}>Export as PDF</button>
        <button onClick={exportAsCSV}>Export as CSV</button>
      </div>
      <div ref={timelineRef}>
        <JourneyTimeline
          searchQuery={search}
          engagementFilter={engagementFilter}
          channelFilter={channelFilter}
        />
      </div>
    </div>
  );
}
