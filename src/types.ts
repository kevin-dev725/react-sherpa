// Record factory that removes keys and sets default values It
// operates similar to ImmutableJS Record type. It only keeps the
// behavior of dropping keys and setting default values.
export const Record = (map: any) => {
  const defaultKeys: Array<string> = Object.keys(map);

  return (newMap: any, allowNull?: boolean) => {
    let newMap2: any = { ...map, ...newMap };
    const keys: Array<string> = Object.keys(newMap2);

    keys.forEach((key: string) => {
      if (!defaultKeys.includes(key)) {
        delete newMap2[key];
      } else if (!allowNull && newMap[key] === null) {
        // don't allow null values and override the value with the
        // defaultValue from original map
        newMap2[key] = map[key];
      }
    });

    return newMap2;
  };
}
