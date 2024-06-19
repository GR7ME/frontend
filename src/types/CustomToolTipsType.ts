export interface CustomTooltipProps {
    active: boolean | undefined;
    payload: { payload: { timestamp: number; entries_number: number } }[] | null | undefined;
  }