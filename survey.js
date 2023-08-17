console.log("Survey");

var survey;

function Question(title, text) {
  this.title = title;
  this.text = text;
  this.number = 0;
  this.toHTML = function () {
    var result = "";

    result += "<h3>" + this.number + ". " + this.title + "</h3>\n";
    result += "<p>" + this.text + "</p>\n";

    return result;
  };
  this.getAnswer = function () {
    return {};
  };
}

function MultipleChoiceQuestion(title, text, options) {
  Question.call(this, title, text);
  this.options = options;

  var superToHTML = this.toHTML;

  this.toHTML = function () {
    var result = superToHTML.call(this);

    result += '<ol id="' + this.title + '" type="a">\n';
    for (var counter = 0; counter < this.options.length; counter++) {
      result +=
        '<li><input type="radio" name="' +
        this.title +
        '" value="' +
        this.options[counter] +
        '"> ' +
        this.options[counter] +
        '</li>\n';
    }
    result += "</ol>\n";
    return result;
  };
  this.getAnswer = function () {
    var answers = {};
    var inputs = document.getElementById(this.title).getElementsByTagName("input");

    for (var counter = 0; counter < inputs.length; counter++) {
      answers[inputs[counter].value] = inputs[counter].checked;
    }

    return answers;
  };
}

function MultipleChoiceQuestionOther(title, text, options) {
  MultipleChoiceQuestion.call(this, title, text, options);

  var superToHTML = this.toHTML;
  var superGetAnswer = this.getAnswer;

  this.toHTML = function () {
    var result = superToHTML.call(this);

    result += '<p>Other: <input id="' + this.title + '_other" type="text" name="' + this.title + '_Other"></p>\n';

    return result;
  };
  this.getAnswer = function () {
    var answers = superGetAnswer.call(this);
    var otherInput = document.getElementById(this.title + '_other');
    answers["Other"] = otherInput.value;

    return answers;
  };
}

function MultipleSelectQuestion(title, text, options) {
  Question.call(this, title, text);
  this.options = options; 

  var superToHTML = this.toHTML;

  this.toHTML = function () {
    var result = superToHTML.call(this);

    result += '<ol type="a">\n';
    for (var counter = 0; counter < this.options.length; counter++) {
      result +=
        '<li><input type="Checkbox" name="' +
        this.title + 
        '" value="' +
        this.options[counter] + 
        '"> ' +
        this.options[counter] +
        '</li>\n'; 
    }
    result += "</ol>\n";
    return result;
  };
  this.getAnswer = function() {
    var answers = {};
    var inputs = document.getElementsByName(this.title);
    var selectedValues = [];

    for (var counter = 0; counter < inputs.length; counter++) {
      if (inputs[counter].checked) {
        selectedValues.push(inputs[counter].value);
      }
    }

    answers[this.title] = selectedValues;
    return answers;
  };
}

function MultipleSelectQuestionOther(title, text, options) {
  MultipleSelectQuestion.call(this, title, text, options);
  
  var superToHTML = this.toHTML;
  var superGetAnswer = this.getAnswer;

  this.toHTML = function () {
    var result = superToHTML.call(this);
  
    result += '<p>Other: <input id="' + this.title + '_other" type="text" name="' + this.title + '_Other"></p>\n';
  
    return result;
  };

  this.getAnswer = function() {
    var answers = superGetAnswer.call(this);
    var otherInput = document.getElementById(this.title + '_other');
    answers["Other"] = otherInput.value;
    
    return answers;
  };
}

function ShortAnswerQuestion(title, text, options) {
  Question.call(this, title, text);
  this.options = options; 

  var superToHTML = this.toHTML;

  this.toHTML = function () {
    var result = superToHTML.call(this);

    result += '<p>Please type your answer here: <input type="text" name="' + this.title + '"></p>\n';
  
    return result;
  };
  this.getAnswer = function() {
    var answers = {};
    var input = document.getElementsByName(this.title)[0];
    answers[this.title] = input.value.trim();
    return answers;
  };
}

function QuestionSection(title, questions) {
  this.title = title;
  this.questions = questions; 
  this.toHTML = function() {
    var result = "<h2>Section " + this.number + ": " + this.title + "</h2>\n";
    for (var counter = 0; counter < this.questions.length; counter++) {
      this.questions[counter].number = counter + 1; 
      result += this.questions[counter].toHTML();
    }
    return result;
  };
  this.getAnswer = function() {
    var answers = {};
    for (var counter = 0; counter < this.questions.length; counter++) {
      var question = this.questions[counter];
      answers[question.title] = question.getAnswer();
    }  
    return answers;  
  };
}


function Survey(title, sections) {
  this.title = title;
  this.sections = sections; 
  this.toHTML = function() {
    var result = "<h1>" + this.title + "</h1>\n";
    for (var counter = 0; counter < this.sections.length; counter++) {
      this.sections[counter].number = counter + 1; 
      result += this.sections[counter].toHTML();
    }
    result += '<input id="submit" type="button" value="SUBMIT">\n';
    return result;
  };
  this.getAnswer = function() {
    var answers = {};
    for (var counter = 0; counter < this.sections.length; counter++) {
      answers[this.sections[counter].title] = this.sections[counter].getAnswer();
    }
    return answers;
  };    
}

function submit() {
  console.log("Answer submitted.");
  var answers = survey.getAnswer();
  var form = document.createElement('form');
  form.method = 'POST';
  form.action = 'submit_survey.php'; 


  var hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'answers';
  hiddenInput.value = JSON.stringify(answers);
  form.appendChild(hiddenInput);

  document.body.appendChild(form); 
  form.submit();
}


window.addEventListener("load", function() {
  survey = createSurveyQuestions(); 
  document.getElementById("survey").innerHTML = survey.toHTML();
  document.getElementById("submit").addEventListener("click", submit);
});
