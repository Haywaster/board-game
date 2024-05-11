type Mods = Record<string, boolean | string>

export const classNames = (cls: string, mods: Mods, additional: Array<string | undefined>):string => {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
    //eslint-disable-next-line
			.filter(([_, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');
};