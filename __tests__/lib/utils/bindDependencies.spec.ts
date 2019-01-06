import bindDependencies from "@lib/utils/bindDependencies";
import Types from "@lib/services/Types";
import { DBServiceInterface, MockDBService } from "@lib/services/DBService";
import {
  LocalStorageServiceInterface,
  MockLocalStorageService
} from "@lib/services/LocalStorageService";

describe("bindDependencies", () => {
  it("returns func bound with container", () => {
    // Given
    function useDB(db: DBServiceInterface, localstrage: LocalStorageServiceInterface) {
      return { db, localstrage };
    }

    // When
    const boundFunc = bindDependencies(useDB, [Types.DBService, Types.LocalStorageService]);

    // Then
    expect(typeof boundFunc).toBe("function");
    const { db, localstrage }: any = boundFunc();
    expect(db).toBeInstanceOf(MockDBService);
    expect(localstrage).toBeInstanceOf(MockLocalStorageService);
  });
});
