import { getIn } from '../utils';

export const arrayToMapIndex = (indexKey: string, array: Array<any>) => {
  return array.reduce(
    (acc: any, elem: any) => {
      acc[elem[indexKey]] = elem;
      return acc;
    },
    {}
  );
}

export const mapIndexToArray = (map: any) => {
  return Object.keys(map).map(key => map[key]);
}

export const groupBy = (fn: any, data: Array<any>) => {
  return data.reduce((acc: any, datum: any) => {
    const key = fn(datum);
    if (acc[key]) {
      acc[key].push(datum)
    } else {
      acc[key] = [datum];
    }
    return acc;
  }, {});
}

export const groupByArray = (path: Array<string>, array: Array<any>) => {
  const groupByFn = (datum: any) => getIn(path, datum);
  let mapIndexed = groupBy(groupByFn, array);

  return Object.keys(mapIndexed).map(key => mapIndexed[key]);
}
