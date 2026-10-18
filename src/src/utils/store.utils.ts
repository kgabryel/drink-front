export interface Loadable {
  ensureLoaded(): Promise<void>;
}

export function replaceById<T extends { id: number }>(arr: T[], updated: T): boolean {
  const existing: T | undefined = arr.find((item: T) => item.id === updated.id);

  if (!existing) {
    return false;
  }

  Object.assign(existing, updated);

  return true;
}

export function removeById<T extends { id: number }>(array: T[], id: number): boolean {
  const index: number = array.findIndex((element: T) => element.id === id);

  if (index !== -1) {
    array.splice(index, 1);
  }

  return true;
}

export function pushItem<T>(array: T[], item: T): boolean {
  array.push(item);

  return true;
}

export async function loadStores(...stores: Loadable[]): Promise<void> {
  await Promise.all(stores.map((store: Loadable) => store.ensureLoaded()));
}
