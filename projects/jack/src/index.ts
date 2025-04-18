export { something } from '@projects/rust';

export async function initAsync(): Promise<void> {
  const init = await import('@projects/rust');
  await init.default();
}
