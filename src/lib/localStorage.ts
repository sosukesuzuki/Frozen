const IS_FIRST_ACCESS = "IS_FIRST_ACCESS";

export function setIsFirstAccess(): void {
  localStorage.setItem(IS_FIRST_ACCESS, "true");
}

export function getIsFirstAccess(): string | null {
  return localStorage.getItem(IS_FIRST_ACCESS);
}

const CURRENT_FILE_INDEX = "CURRENT_FILE_INDEX";

export function setCurrentFileIndex(index: number): void {
  localStorage.setItem(CURRENT_FILE_INDEX, index.toString());
}

export function getCurrentFileIndex(): number | null {
  const stringifiedIndex = localStorage.getItem(CURRENT_FILE_INDEX);
  return stringifiedIndex == null ? null : parseInt(stringifiedIndex, 10);
}
