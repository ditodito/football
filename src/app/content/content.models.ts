export const RATINGS = [1, 2, 3, 4, 5];

export enum Position {
  GK = 'Goalkeeper',
  DF = 'Defender',
  MF = 'Midfielder',
  FW = 'Forward',
}

export interface PositionSelect {
  label: string;
  value: Position;
}

export const POSITION: PositionSelect[] = [
  {
    label: 'catalogue.GK',
    value: Position.GK,
  },
  {
    label: 'catalogue.DF',
    value: Position.DF,
  },
  {
    label: 'catalogue.MF',
    value: Position.MF,
  },
  {
    label: 'catalogue.FW',
    value: Position.FW,
  },
];

export const FORM_RESET_EVENT_KEY = 'FORM_RESET';
