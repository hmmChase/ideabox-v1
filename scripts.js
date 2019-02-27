const $inputIdea = $('#inputIdea');
const $inputForms = $('#input-forms');

$('#button-save').on('click', buttonSave);
$('#bottom-section').on('click', '#delete-idea', deleteButton);
$('#bottom-section').on('keyup', '.key-up', updateStorage);

loadIdeas();

function loadIdeas() {
  console.log('localstorage: ', localStorage);
  if (localStorage.getItem('ideas') === null) {
    localStorage.setItem('ideas', '[]');
  } else {
    parsedIdeas().forEach(function(idea) {
      renderIdea(idea.id, idea.idea);
    });
  }
}

function parsedIdeas() {
  return JSON.parse(localStorage.getItem('ideas'));
}

function renderIdea(id, idea) {
  $('#idea-card-area').append(`
    <li class="idea" id="${id}">
      <p class="ideaP key-up" id="ideaP" contenteditable="true">${idea}</p>
      <button class="idea-button delete-idea" id="delete-idea"></button>
    </li>`);
}

function buttonSave(e) {
  e.preventDefault();
  const randID = Math.floor(Math.random() * 999999999);
  const newIdea = new Idea(randID, $inputIdea.val());
  const existingIdeas = parsedIdeas();
  existingIdeas.push(newIdea);
  localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  renderIdea(newIdea.id, newIdea.idea);
  $inputForms.trigger('reset');
}

function Idea(id, idea) {
  this.id = id;
  this.idea = idea;
}

function deleteButton() {
  deleteHTML();
  deleteLocalStorage();
}

function deleteHTML() {
  $(event.target)
    .closest('li')
    .remove();
}

function deleteLocalStorage() {
  const existingIdeas = parsedIdeas();
  const ideaID = $(event.target)
    .closest('li')
    .attr('id');
  existingIdeas.forEach(function(idea, index) {
    if (idea.id == ideaID) {
      existingIdeas.splice(index, 1);
    }
  });
  localStorage.setItem('ideas', JSON.stringify(existingIdeas));
}

function updateStorage() {
  console.log('keyup');

  const article = $(event.target).closest('li');
  const ideaID = article.attr('id');
  const ideaP = article.text();
  const existingIdeas = parsedIdeas();

  existingIdeas.forEach(function(idea, index) {
    if (idea.id == ideaID) {
      idea.idea = ideaP;
    }
    localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  });
}

function enterKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}
