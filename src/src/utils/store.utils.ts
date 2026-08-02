export function replaceById<T extends { id: number }>(arr: T[], updated: T): boolean {
  const index: number = arr.findIndex((item: T) => item.id === updated.id);

  if (index === -1) {
    return false;
  }
  Object.assign(arr[index]!, updated);

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

export interface Loadable {
  ensureLoaded(): Promise<void>;
}

export async function loadStores(...stores: Loadable[]): Promise<void> {
  await Promise.all(stores.map((store: Loadable) => store.ensureLoaded()));
}
