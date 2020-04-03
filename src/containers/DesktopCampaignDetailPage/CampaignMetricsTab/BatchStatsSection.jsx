import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// components
import TableWithSorting, { comparators } from '../../../components/TableWithSorting';
import { DataLoader } from '../../../components/LoadingData';

// utils
import Axios from '../../../axiosConfig';
import { batchStatsToItemList } from '../utils';
import { getIn } from '../../../utils';


const StyledList = styled.ul`
  li {
    span {
      text-align: left;
      flex: 0 0 calc(100% / 6);
    }
  }
`;

const DeliveryStatus = props => {
  const Indicator = styled.div`
    background: ${props =>
      props.value < 70 ? "var(--red)" :
        props.value < 90 ? "var(--yellow)" :
          "var(--green)"};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 4px;
  `;

  return (
    <div className="d-flex align-items-center">
      <Indicator value={props.value} />
      {props.value}%
    </div>
  );
}

const headers = [
  {
    active: true,
    sorting: 0,
    name: 'Batch',
    type: 'number',
    path: ['batchNumber']
  },
  {
    active: true,
    sorting: 0,
    name: 'Response',
    type: 'number',
    path: ['responseRate']
  },
  {
    active: true,
    sorting: 0,
    name: 'Attempts',
    type: 'number',
    path: ['sendAttempt']
  },
  {
    active: true,
    sorting: 0,
    name: 'Delivery',
    type: 'number',
    path: ['deliveredPercent']
  },
  {
    active: true,
    sorting: 0,
    name: 'Skipped',
    type: 'number',
    path: ['totalSkipped']
  },
  {
    active: true,
    sorting: 0,
    name: 'Last Send',
    type: 'number',
    path: ['lastSend']
  },
];

const BatchStatsSection = () => {
  const { id } = useParams();
  const [stats, setStats] = useState([]);
  const [activeSort, setActiveSort] = useState({ id: 0, sorting: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const sortedStats = useMemo(() => {
    const { type, path } = headers[activeSort.id];
    const comparator = comparators[type][activeSort.sorting];

    return stats.concat().sort(
      (stat1, stat2) => comparator(getIn(path, stat1), getIn(path, stat2))
    );
  }, [activeSort, stats]);

  useEffect(() => {
    setIsLoading(true);
    Axios
      .get(`/stats-batches/?campaign=${id}`)
      .then(({ data: { results } }) => {
        setStats(batchStatsToItemList(results));
        setIsLoading(false);
      })
      .catch(_ => console.log("something wrong happened"));
  }, []);

  return (
    <>
      <h2 className="fw-bold mb-3">Batch Stats</h2>
      <TableWithSorting
        header=''
        headers={headers}
        listStyle={StyledList}
        setActiveSort={setActiveSort}
      >
        <DataLoader
          status={isLoading ? 'Fetching' : 'Success'}
          data={stats}
          emptyResultsMessage="You don't have any batch statistics yet"
          renderData={() => (
            <>
              {sortedStats.map(stat => (
                <li className="item textM mb-1">
                  <span className="fw-black">#{stat.batchNumber}</span>
                  <span>{stat.responseRate}%</span>
                  <span>{stat.sendAttempt}</span>
                  <span><DeliveryStatus value={stat.deliveredPercent} /></span>
                  <span>{stat.totalSkipped}</span>
                  <span className="gray">{stat.lastSendParsed}</span>
                </li>
              ))}
            </>
          )}
        />
      </TableWithSorting>
    </>
  );
};

export default BatchStatsSection;
