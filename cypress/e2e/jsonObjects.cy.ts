/// <reference types="cypress" />

describe("JSON objects", () => {
  it("JSON Objects", () => {
    cy.openHomePage();

    const simpleObject = {
      key: "value",
      key2: "value2",
    };

    const simpleArrayOfValues = ["one", "two", "three"];

    const arrayOfObjects = [
      { key: "value" },
      { key2: "value2" },
      { key3: "value3" },
    ];

    const typesOfData = {
      string: "this is a string",
      number: 13,
    };
    const mix = {
      FirstName: "John",
      LastName: "Smith",
      Age: 33,
      Students: [
        {
          firstName: "Sara",
          lastName: "Connor",
        },
        {
          firstName: "Bruce",
          lastName: "Willis",
        },
      ],
    };
    console.log(simpleObject.key2)
    console.log(simpleObject["key2"])
    console.log(simpleArrayOfValues[1])
    console.log(arrayOfObjects[2].key3)
    console.log(mix.Students[1].firstName)

  });
});
