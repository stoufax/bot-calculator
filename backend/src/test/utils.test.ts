import { mapBotResponseToBotDto } from "../utils";

describe("utils", () => {
  it("should throw an error when the argument is not an array", () => {
    expect(() => mapBotResponseToBotDto({})).toThrow();
  });

  it("should return an array of number", () => {
    const arr = [
      {
        _id: "607c65e771c92b1780b73467",
        calculatedOperation: 20,
        createdAt: "2021-04-18T17:01:27.092Z",
        updatedAt: "2021-04-18T17:01:27.092Z",
        __v: 0,
      },
      {
        _id: "607c65e771c92b1780b73461",
        calculatedOperation: 30,
        createdAt: "2021-04-18T17:01:27.092Z",
        updatedAt: "2021-04-18T17:01:27.092Z",
        __v: 0,
      },
    ];
    expect(mapBotResponseToBotDto(arr)).toEqual([20, 3]);
  });
});
