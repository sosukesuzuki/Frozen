const IS_FIRST_ACCESS = "IS_FIRST_ACCESS";

export function setIsFirstAccess(): void {
  localStorage.setItem(IS_FIRST_ACCESS, "true");
}

export function getIsFirstAccess(): string | null {
  return localStorage.getItem(IS_FIRST_ACCESS);
}
