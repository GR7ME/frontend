export interface CustomTooltipProps {
    active: boolean | undefined;
    payload: { payload: { interval: number; count: number } }[] | null | undefined;
  }