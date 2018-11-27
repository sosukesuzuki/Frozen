import { injectable } from "inversify";

const IS_FIRST_ACCESS = "IS_FIRST_ACCESS";
const CURRENT_FILE_INDEX = "CURRENT_FILE_INDEX";

export interface LocalStorageServiceInterface {
  setIsFirstAccess: () => void;
  getIsFirstAccess: () => string | null;
  setCurrentFileIndex: (index: number) => void;
  getCurrentFileIndex: () => number | null;
}

@injectable()
export class LocalStorageService implements LocalStorageServiceInterface {
  setIsFirstAccess(): void {
    localStorage.setItem(IS_FIRST_ACCESS, "true");
  }

  getIsFirstAccess(): string | null {
    return localStorage.getItem(IS_FIRST_ACCESS);
  }

  setCurrentFileIndex(index: number): void {
    localStorage.setItem(CURRENT_FILE_INDEX, index.toString());
  }

  getCurrentFileIndex(): number | null {
    const stringifiedIndex = localStorage.getItem(CURRENT_FILE_INDEX);
    return stringifiedIndex == null ? null : parseInt(stringifiedIndex, 10);
  }
}

function doNothing(): any {}

@injectable()
export class MockLocalStorageService implements LocalStorageServiceInterface {
  setIsFirstAccess = doNothing;
  getIsFirstAccess = doNothing;
  setCurrentFileIndex = doNothing;
  getCurrentFileIndex = doNothing;
}
