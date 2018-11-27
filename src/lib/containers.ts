import "reflect-metadata";
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import {
  LocalStorageServiceInterface,
  LocalStorageService
} from "./services/LocalStorageService";
import Types from "./services/Types";

const container = new Container();
export const { lazyInject } = getDecorators(container);
container
  .bind<LocalStorageServiceInterface>(Types.LocalStorageService)
  .to(LocalStorageService);

export default container;
