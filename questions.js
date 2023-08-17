console.log("PCC Housing Insecurity Survey Questions");

function createSurveyQuestions() {
  var q1 = new MultipleSelectQuestionOther(
    "Status",
    "What is your status at PCC?( Select more than one if applicable)",
    [
      "Full-time student",
      "Part-time student",
      "GED student",
      "High School dual enrollment",
      "International Student",
      "Work Study",
      "Full-time Faculty",
      "Part-time Faculty",
      "Full-time staff",
      "Part-time staff",
      "Management"
    ]
  );

  var q2 = new MultipleSelectQuestion(
    "Campus",
    "What location are you primarily taking classes at? (If equally split between campuses - check both)",
    [
      "Cascade Campus",
      "Rock Creek Campus",
      "Southeast Campus",
      "Sylvania Campus",
      "Online courses only",
      "Other PCC Center/location"
    ]
  );

  var q3 = new ShortAnswerQuestion("Zip Code", "What is your zip code?");

  var q4 = new MultipleChoiceQuestion("Rent or Own", "Is your living space rented or owned?", [
    "Rent",
    "Own"
  ]);

  var q5 = new MultipleSelectQuestionOther("Payment", "Who pays for the rent/mortgage (Select that apply)?", [
    "Self",
    "Partner",
    "Spouse",
    "Parents",
    "Other family",
    "Roommates"
  ]);

  var allQuestions = [q1, q2, q3, q4, q5];

  for (var counter = 0; counter < allQuestions.length; counter++) {
    allQuestions[counter].number = counter + 1;
  }

  var s1 = new QuestionSection("Demographics", [q1, q2, q3]);
  var s2 = new QuestionSection("Housing Information", [q4, q5]);

  var allSections = [s1, s2];

  for (var counter = 0; counter < allSections.length; counter++) {
    allSections[counter].number = counter + 1;
  }

  return new Survey("PCC Housing Insecurity Survey", [s1, s2]);
}
