import { captureException } from "@sentry/nextjs";

export default (e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  captureException(e);
}