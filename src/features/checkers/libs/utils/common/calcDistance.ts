export const calcDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}