import container from "../container";

export default function bindDependencies(
  func: Function,
  dependencies: (string | symbol)[]
): any {
  const injections = dependencies.map((dependency: string | symbol) =>
    container.get(dependency)
  );
  return func.bind(func, ...injections);
}
