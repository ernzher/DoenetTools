describe('Editor Test', function () {
  const userId = "cyuserId";
  const studentUserId = "cyStudentUserId";
  // const userId = "devuserId";
  const courseId = "courseid1";
  const doenetId = "activity1id";
  const pageDoenetId = "_page1id";

  before(() => {
    cy.signin({ userId });
    cy.clearAllOfAUsersCoursesAndItems({ userId });
    cy.clearAllOfAUsersCoursesAndItems({ userId: studentUserId });
    cy.createCourse({ userId, courseId, studentUserId });
  })
  
  beforeEach(() => {
    cy.signin({ userId });
    cy.clearIndexedDB();
    cy.clearAllOfAUsersActivities({ userId })
    cy.clearAllOfAUsersActivities({ userId: studentUserId })
    cy.createActivity({courseId,doenetId,parentDoenetId:courseId,pageDoenetId});
    cy.visit(`course?tool=editor&doenetId=${doenetId}&pageId=${pageDoenetId}`)
  })

  it('Test Caption and BreadCrumb',()=>{
    cy.task('queryDb', `SELECT label FROM course_content WHERE courseId="${courseId}" AND doenetId="${doenetId}"`).then((result) => {
      const labelName = result[0].label
      cy.get('[data-test="Crumb 3"]').should('contain', labelName)      
      cy.get('[data-test="Activity Label"]').should('contain', labelName)   
    })    
  })
})