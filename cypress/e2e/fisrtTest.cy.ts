/// <reference types = "cypress" />

import { drop, wrap } from "cypress/types/lodash";

describe("Get text from element", () => {
  it("Get text from element", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });

    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    //4
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    //5
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .then((propValue) => {
        expect(propValue).to.equal("test@test.com");
      });
  });

  it("Get text from element", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("Chekboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();
    cy.get('[type="checkbox"]').uncheck({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
  });

  it("Chekboxes", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(`${futureYear}`)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateToAssert;
    }
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const dateToAssert = selectDayFromCurrent(4);

        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it("Lists and dropdown", () => {
    cy.visit("/");

    //1
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");

    //2
    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropDown).should("contain", itemText);
        if (index < 3) {
          cy.wrap(dropDown).click();
        }
      });
    });
  });

  it("Web Tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1 Get table row by text
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "35");
      });

    //2 Get row by index
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("John");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.get("tbody tr")
          .first()
          .find("td")
          .then((tableColumns) => {
            cy.wrap(tableColumns).eq(2).contains("John");
            cy.wrap(tableColumns).eq(3).contains("Smith");

            //3 Table loops get each row validation
            const age = [20, 30, 40, 200];

            // cy.wrap(age).each(age =>{
            //     cy.get('thead').find('[placeholder="Age"]').clear().type(`${age}`)
            //     cy.wait(500)
            //     cy.get('tbody tr').each(tableRow =>{
            //         if(age == 200){
            //             cy.wrap(tableRow).should('contain', 'No data found')
            //         } else{
            //         cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            //         }
            //     })
            // })
          });
      });
  });
  it("PopUps and ToolTips", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  });

  //Browser dialog box

  it.only("PopUps and ToolTips", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1 Not to use method
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) =>{
        expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2 To use method
    const stub = cy.stub()
    cy.on('window:confirm',stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => false)

  });
});
