export interface CustomTooltipProps {
    active: boolean | undefined;
    payload: { payload: { timestamp: number; log_count: number } }[] | null | undefined;
}