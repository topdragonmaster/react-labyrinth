export interface ILocation {
  row: number;
  column: number;
}

export enum ResultOption {
  PROCESS = 'process',
  LOST = 'lost',
  WON = 'won',
}