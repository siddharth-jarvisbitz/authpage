import Badge from 'Elements/Badge';

const CalendarEventsData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'title', align: 'center', headerName: 'Event Title', mobileHeader: 'Title' },
    { name: 'start', align: 'center', headerName: 'Start', mobileHeader: 'Start' },
    { name: 'end', align: 'center', headerName: 'End', mobileHeader: 'End' },
    { name: 'eventType', align: 'center', headerName: 'Event Type', mobileHeader: 'Type' }
  ],
  rows: [
    {
      id: 101,
      title: 'All day conference',
      start: '2023-02-01',
      end: '2023-02-01',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="success"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'success'
    },
    {
      id: 102,
      title: 'Meeting with Mary',
      start: '2023-02-05',
      end: '2023-02-05',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="Info"
          color="info"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'success'
    },
    {
      id: 103,
      title: 'Cyber Day',
      start: '2023-02-10',
      end: '2023-02-10',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="warning"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'success'
    },
    {
      id: 104,
      title: 'Winter Hackaton',
      start: '2023-02-15',
      end: '2023-02-15',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="error"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'success'
    },
    {
      id: 105,
      title: 'Digital event',
      start: '2023-02-18',
      end: '2023-02-18',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="default"
          color="default"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'success'
    },
    {
      id: 106,
      title: 'Marketing event',
      start: '2023-02-21',
      end: '2023-02-21',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="secondary"
          color="secondary"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'success'
    },
    {
      id: 107,
      title: 'Dinner with Family',
      start: '2023-02-28',
      end: '2023-02-28',
      eventType: (
        <Badge
          variant="gradient"
          badgeContent="primary"
          color="primary"
          size="xs"
          container
          customWidth={100}
        />
      ),
      eventName: 'primary'
    }
  ]
};

export default CalendarEventsData;