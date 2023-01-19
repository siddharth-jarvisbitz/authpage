import Badge from 'Elements/Badge';

const expenseListData = {
  columns: [
    { name: 'name', align: 'left', headerName: 'Name' },
    { name: 'purchase From', align: 'center', headerName: 'Purchase From' },
    { name: 'purchase Date', align: 'center', headerName: 'Purchase Date' },
    { name: 'amount', align: 'center', headerName: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status' }
  ],

  rows: [
    {
      name: 'Water bill',
      'purchase From': 'local',
      'purchase Date': '01/02/2023',
      amount: '350',
      /* status: (
        <ArgonTypography variant="caption" color="warning" fontWeight="medium">
          Approved
        </ArgonTypography>
      ), */
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    },
    {
      name: 'Birthday decoration',
      'purchase From': 'local store',
      'purchase Date': '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
      /* status: (
        <ArgonTypography variant="caption" color="success" fontWeight="medium">
          Approved
        </ArgonTypography>
      ) */
    },
    {
      name: 'Office cleaning',
      'purchase From': 'Other',
      'purchase Date': '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
      /* status: (
        <ArgonTypography variant="caption" color="success" fontWeight="medium">
          Approved
        </ArgonTypography>
      ) */
    },
    {
      name: 'Water bill',
      'purchase From': 'local',
      'purchase Date': '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
      /* status: (
        <ArgonTypography variant="caption" color="success" fontWeight="medium">
          Approved
        </ArgonTypography>
      ) */
    },
    {
      name: 'Birthday decoration',
      'purchase From': 'local store',
      'purchase Date': '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
      /* status: (
        <ArgonTypography variant="caption" color="success" fontWeight="medium">
          Approved
        </ArgonTypography>
      ) */
    },
    {
      name: 'Office cleaning',
      'purchase From': 'Other',
      'purchase Date': '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
      /* status: (
        <ArgonTypography variant="caption" color="warning" fontWeight="medium">
          Approved
        </ArgonTypography>
      ) */
    }
  ]
};

export default expenseListData;
