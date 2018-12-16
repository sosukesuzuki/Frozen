import { injectable } from "inversify";
import { MarkdownFile } from "../types";

const IS_FIRST_ACCESS = "IS_FIRST_ACCESS";
const CURRENT_FILE = "CURRENT_FILE";

export interface LocalStorageServiceInterface {
  setIsFirstAccess: () => void;
  getIsFirstAccess: () => string | null;
  setCurrentFile: (file: MarkdownFile) => void;
  getCurrentFile: () => string | null;
}

@injectable()
export class LocalStorageService implements LocalStorageServiceInterface {
  setIsFirstAccess(): void {
    localStorage.setItem(IS_FIRST_ACCESS, "false");
  }

  getIsFirstAccess(): string | null {
    return localStorage.getItem(IS_FIRST_ACCESS);
  }

  setCurrentFile(file: MarkdownFile): void {
    localStorage.setItem(CURRENT_FILE, file.id);
  }

  getCurrentFile(): string | null {
    const id = localStorage.getItem(CURRENT_FILE);
    return id == null ? null : id;
  }
}

function doNothing(): any {}

@injectable()
export class MockLocalStorageService implements LocalStorageServiceInterface {
  setIsFirstAccess = doNothing;
  getIsFirstAccess = doNothing;
  setCurrentFile = doNothing;
  getCurrentFile = doNothing;
}
