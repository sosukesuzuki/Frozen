import "reflect-metadata";
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import {
  LocalStorageServiceInterface,
  LocalStorageService,
  MockLocalStorageService
} from "./services/LocalStorageService";
import Types from "./services/Types";
import {
  DBServiceInterface,
  MockDBService,
  DBService
} from "./services/DBService";

const env = process.env.NODE_ENV;

const container = new Container();
export const { lazyInject } = getDecorators(container);
if (env != "development" && env != "production") {
  container
    .bind<LocalStorageServiceInterface>(Types.LocalStorageService)
    .to(MockLocalStorageService);
  container.bind<DBServiceInterface>(Types.DBService).to(MockDBService);
} else {
  container
    .bind<LocalStorageServiceInterface>(Types.LocalStorageService)
    .to(LocalStorageService);
  container.bind<DBServiceInterface>(Types.DBService).to(DBService);
}

export default container;
