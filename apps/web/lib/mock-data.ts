// apps/web/lib/mock-data.ts

export interface Touchpoint {
  id: string;
  timestamp: string;
  channel: 'email' | 'website' | 'social' | 'sales_call';
  content: string;
  engagement: 'high' | 'medium' | 'low';
}

export interface Customer {
  id: string;
  name: string;
  attributes: { [key: string]: string };
  journey: Touchpoint[];
}

export const mockCustomers: Customer[] = [
  {
    id: 'cust_1',
    name: 'John Doe',
    attributes: {
      'First Seen': '2023-01-15',
      'Status': 'Lead',
    },
    journey: [
      { id: 'tp_1_1', timestamp: '2023-01-15T10:00:00Z', channel: 'website', content: 'Visited pricing page', engagement: 'medium' },
      { id: 'tp_1_2', timestamp: '2023-01-16T12:30:00Z', channel: 'email', content: 'Opened welcome email', engagement: 'high' },
      { id: 'tp_1_3', timestamp: '2023-01-18T14:00:00Z', channel: 'social', content: 'Liked a post on LinkedIn', engagement: 'low' },
      { id: 'tp_1_4', timestamp: '2023-01-20T11:00:00Z', channel: 'sales_call', content: 'Initial discovery call', engagement: 'high' },
    ],
  },
  {
    id: 'cust_2',
    name: 'Jane Smith',
    attributes: {
      'First Seen': '2023-02-10',
      'Status': 'Trial',
    },
    journey: [
      { id: 'tp_2_1', timestamp: '2023-02-10T09:00:00Z', channel: 'website', content: 'Signed up for a trial', engagement: 'high' },
      { id: 'tp_2_2', timestamp: '2023-02-11T15:00:00Z', channel: 'email', content: 'Clicked on "Get Started" button', engagement: 'high' },
      { id: 'tp_2_3', timestamp: '2023-02-15T16:30:00Z', channel: 'website', content: 'Visited documentation', engagement: 'medium' },
    ],
  },
  {
    id: 'cust_3',
    name: 'Peter Jones',
    attributes: {
        'First Seen': '2023-03-01',
        'Status': 'Churned',
    },
    journey: [
        { id: 'tp_3_1', timestamp: '2023-03-01T11:00:00Z', channel: 'social', content: 'Commented on a blog post', engagement: 'medium' },
        { id: 'tp_3_2', timestamp: '2023-03-05T13:20:00Z', channel: 'email', content: 'Unsubscribed from newsletter', engagement: 'low' },
    ]
  }
];
