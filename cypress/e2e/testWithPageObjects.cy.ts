import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onformLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe(" Test With Page Objects", () => {
  beforeEach("Open Application", () => {
    cy.openHomePage()
  });

  it("Verify Navigation accross the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePicker();
    navigateTo.smartTablePage();

    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });

  it.only('Should submit Inline and Basic form and select tomorrow date in calendar', ()=>{
    navigateTo.formLayoutsPage()
    onformLayoutsPage.submitInlineFormWithNameAndEmail('Mihai', 'test@test.com')
    onformLayoutsPage.submitBasicForm('test@test.com', '1234')
    navigateTo.datePicker();
    onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('John', 'Smith')
    onSmartTablePage.updateAgeByFirstName('John', 22)
    onSmartTablePage.deleteRowByIndex(1)
  })

});
