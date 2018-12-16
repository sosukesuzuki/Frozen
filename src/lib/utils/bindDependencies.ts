import container from "../container";

export default function bindDependencies(
  func: Function,
  dependencies: (string | symbol)[]
) {
  let injections = dependencies.map((dependency: any) => {
    return container.get(dependency);
  });
  return func.bind(func, ...injections);
}
