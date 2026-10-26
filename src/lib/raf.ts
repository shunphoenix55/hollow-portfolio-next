export function rafScheduler(draw: (now: number) => boolean | void) {
  let id = 0;
  const run = (now: number) => {
    id = 0;
    if (draw(now)) request();
  };
  const request = () => {
    if (!id) id = requestAnimationFrame(run);
  };
  const cancel = () => {
    cancelAnimationFrame(id);
    id = 0;
  };
  return { request, cancel };
}
