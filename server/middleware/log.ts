export default defineEventHandler((event) => {
  const method = getMethod(event);
  const path = getRequestURL(event).pathname;
  logger.info(`${method} ${path}`, { method, path });
});
