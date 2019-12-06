export function filterOptions(params: any) {
  // @ts-ignore
  const that = this;
  const options = Object.keys(that);
  return (options.length < 1) ? [] : options.map(item => item.toLowerCase())
                                            .every(key => params[key].toLowerCase() === that[key]
                                            .toLowerCase());
};
