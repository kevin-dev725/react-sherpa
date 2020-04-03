// select-keys function and helpers
// the different arities allows for using it with aggregates
// Ex: data = {hello: 1, two: 2, three: 4}
//     selectKeys(['hello', 'three']) which yields {hello: 1, three: 4}
//
// We can use it on aggregates
// Ex2: data2 = [{hello: 1, two: 2, three: 4}, {hello: 10, two: 20, three: 40}]
//      data2.map(selectKeys('two')) which yields [{two: 2}, {two: 20}]

const selectKeysArity2 = (keys: Array<string>, map: { [key: string]: any }) => {
  return keys.reduce((acc: any, key: string) => {
    if (map.hasOwnProperty(key))
      acc[key] = map[key];

    return acc;
  }, {});
};

const selectKeysArity1 = (keys: Array<string>) =>
  (map: { [key: string]: any }) => selectKeysArity2(keys, map)

export const selectKeys = (keys: Array<string>, map?: { [key: string]: any }) => {
  if (map) return selectKeysArity2(keys, map);
  return selectKeysArity1(keys);
};

// get-in function and helpers
// the different arities allows for using it with aggregates
// getIn function takes a path and a data structure to walk through.
// Returns undefined a path doesn't exist.
// Ex:  data = [{hello: {one: { two: 'hello'}}}, {hello: {one: { two: 'bye'}}}]
//      data.map(getIn(['hello', 'one', 'two'])) which yields  ['hello', 'bye']
//
// Ex2: data = {hello: [1,2,3 {four: "booom"}]}
//      getIn(['hello', 3, 'four']) which yields "booom"
const getInArity2 = (path: Array<string | number>, map: Array<any> | { [key: string]: any }) => {
  return path.reduce((acc: any, step: string | number) => {
    if (!acc)
      return undefined;
    return acc[step];
  }, map)
};
const getInArity1 = (path: Array<string | number>) =>
  (map: Array<any> | { [key: string]: any }) => getInArity2(path, map);

export const getIn = (path: Array<string | number>, map?: Array<any> | { [key: string]: any }) => {
  if (map) return getInArity2(path, map);
  return getInArity1(path);
};

// update-in function to update deeply nested structures.
// It walks the `map` 
// NOTE: Update the function to support multiple-arities
// this will allow it to be used with aggregates.
export const updateIn = (
  path: Array<string | number>,
  changeFn: (currentMap: any, x: any, args: any) => any,
  fnArgs: any,
  map: Array<any> | { [key: string]: any }
) => {
  // Note: This is update in place
  // walk the data-structure with the path provided to get the current-value
  let value = getIn(path, map);
  let newValue = changeFn(map, value, fnArgs); // apply the supplied update function
  let [lastKey] = path.slice(-1);

  // update the path with the new value computed with `changeFn`
  let val: any = path.slice(0, -1).reduce((acc: any, key) => acc[key], map);
  val[lastKey] = newValue;
};

export const identity = (x: any) => x;
export const all = (coll: Array<any>) => coll.reduce((acc: boolean, el: any) => acc && el, true);
export const any = (coll: Array<any>) => coll.reduce((acc: boolean, el: any) => acc || el, false);
export const compose = (...fns: Array<Function>) => (args: any) => fns.reduceRight((args: any, f: Function) => f(args), args);
