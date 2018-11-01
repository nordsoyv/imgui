export type WidgetId = number;

export interface IMouseInfo {
  xPos: number;
  yPos: number;
  leftButton: boolean;
  rightButton: boolean;
}

export interface IKeyInfo {
  key: string;
  alt: boolean;
  shift: boolean;
  ctrl: boolean;
}
