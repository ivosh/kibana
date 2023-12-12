import { parseDuration } from '../../../../../alerting/common/parse_duration.ts';

if (!Deno.env.get('QUERY_DELAY_MS')) {
  throw new Error('QUERY_DELAY_MS not set');
}

const delay = Number.parseInt(Deno.env.get('QUERY_DELAY_MS'), 10);

export function getTimeRange(window?: string): { dateStart: string; dateEnd: string } {
  let timeWindow: number = 0;
  if (window) {
    try {
      timeWindow = parseDuration(window);
    } catch (err) {
      throw new Error(`Invalid format for windowSize: "${window}"`);
    }
  }

  const queryDelay = delay * 1000;
  const date = Date.now();
  const dateStart = new Date(date - (timeWindow + queryDelay)).toISOString();
  const dateEnd = new Date(date - queryDelay).toISOString();

  return { dateStart, dateEnd };
};
