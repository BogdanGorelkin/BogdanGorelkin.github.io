/**
 * The 30-minute call, booked through Cal.com's official embed on this site's
 * own /book page. Public configuration — no keys, no secrets.
 */
export const booking = {
  /** Cal.com embed namespace and event (cal.com/b-gorelkin/30min). */
  namespace: '30min',
  calLink: 'b-gorelkin/30min',
  /** The booking page on this site: a real static page (book/index.html), so it opens directly. */
  page: '/book/',
  /** The same event on Cal.com — the fallback if the embed can't load. */
  publicUrl: 'https://cal.com/b-gorelkin/30min',
} as const
