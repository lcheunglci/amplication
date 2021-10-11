import { ConfigService } from "@nestjs/config";
import { mock } from "jest-mock-extended";
import { SecretsManagerServiceBase } from "./secretsManager.service.base";

describe("Testing the secrets manager base class", () => {
  const SECRET_KEY = "SECRET_KEY";
  const SECRET_VALUE = "SECRET_VALUE";
  const configService = mock<ConfigService>();
  const secretsManagerServiceBase = new SecretsManagerServiceBase(
    configService
  );
  beforeEach(() => {
    configService.get.mockClear();
  });
  test("Secrets manager need to return value from env", () => {
    //ARRANGE
    configService.get.mockReturnValue(SECRET_VALUE);
    //ACT
    expect(secretsManagerServiceBase.getSecret(SECRET_KEY)).toBe(SECRET_VALUE);
  });
  test("Secrets manager need to return null for unknown keys", () => {
    //ARRANGE
    configService.get.mockReturnValue(undefined);
    //ACT
    expect(secretsManagerServiceBase.getSecret(SECRET_KEY)).toBeNull();
  });
  //   test("Secrets manager throw error if dont get key", () => {
  //     //@ts-ignore
  //     expect(secretsManagerServiceBase.getSecret()).toThrowError();
  //   });
});
