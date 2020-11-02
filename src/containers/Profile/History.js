import { Grid, H2, H3, Hr } from 'components/styled';
import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import styled from 'styled-components';

const Wrapperbar = styled.div`
  padding: 2rem 0;
  width: 70%;
  height: 70vh;
  margin: 0 12rem;
  text-align: center;
  margin-bottom: 8rem;

  ${H2} {
    margin-bottom: 3rem;
  }
`;

const Wrappertable = styled.div`
  padding: 3rem 0 3rem 3rem;
  width: 100%;

  ${H3} {
    margin-bottom: 2rem;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  background-color: #1ab188;
  color: white;
  text-align: left;
  padding: 8px;
  font-size: 1.5rem;
`;

const Td = styled.td`
  text-align: left;
  padding: 8px;
  font-size:1.2rem;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  };

& > :first-child {
  font-size: 1.3rem;
  font-weight: bold;
}
`;

const Wrapoughnut = styled.div`
  height: 20rem;
  width: 75rem;
`;

const Div = styled.div`
  margin-bottom: 4rem;
`;

const History = () => {
  const brandNames = [
    'LE GRAND BIKES',
    'KROSS',
    'EXPLORER',
    'VISITOR',
    'PONY',
    'FORCE',
    'E-BIKES',
    'IDEAL',
  ];

  const data = {
    labels: brandNames.map((name) => name),
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 20, 50, 30, 80, 70, 110, 45],
      },
    ],
  };

  return (
    <Div>
      <Wrapperbar>
        <H2>Hystory Records</H2>
        <Bar data={data} />
      </Wrapperbar>
      <Hr bottom='6rem' top='4rem' />
      <Grid justifyContent="center" alignItems="center" >
        <Wrappertable>
          <H3>Your Orders</H3>
          <Table>
            <thead>
              <Tr>
                <Th>#</Th>
                <Th>Date of purchased</Th>
                <Th>Description</Th>
                <Th>Amount</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>1</Td>
                <Td>Griffin</Td>
                <Td>$100</Td>
                <Td>$100</Td>
              </Tr>
              <Tr>
                <Td>2</Td>
                <Td>Griffin</Td>
                <Td>$150</Td>
                <Td>$150</Td>
              </Tr>
              <Tr>
                <Td>3</Td>
                <Td>Swanson</Td>
                <Td>$300</Td>
                <Td>$300</Td>
              </Tr>
            </tbody>
          </Table>
        </Wrappertable>
        <Wrapoughnut>
          <Radar data={data} />
        </Wrapoughnut>
      </Grid>
    </Div>
  );
};

export default History;
