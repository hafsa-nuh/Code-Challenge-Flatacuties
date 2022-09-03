const baseUrl = 'http://localhost:3000/characters';

//character navbar
const divBar = document.querySelector('#character-bar');

 //GET request for character data
async function getAllCharacters(){
  divBar.innerHTML = '';
  return fetch(baseUrl)
  .then(r => r.json())
  .then(data => loopingCharacters(data))
}

// looping through the characters names in the character-bar
function loopingCharacters(data) {
  data.forEach(character => {
    renderCharacter(character);
  })  
}    

//globolizing the detail elements
const nameC = document.querySelector('#name');
const image = document.querySelector('#image');
const vote = document.querySelector('#vote-count');

//displaying the character's details, adding span and event listener
function renderCharacter(character) {
  let characterName = character.name; // storing data
  let characterImage = character.image;
  let characterVotes = character.votes;
  let characterId = character.id;
    
  let span = document.createElement('span');
  span.setAttribute('character-id', characterId);
  span.innerText = characterName;
  divBar.append(span);  

  span.addEventListener('click', () => {
    image.src = characterImage;
    nameC.innerText = characterName;
    vote.innerText = characterVotes;
  })
}

//globolizing the vote form and reset button
const voteForm = document.querySelector('#votes-form');
const resetBtn = document.querySelector('#reset-btn');
const newCharacterForm = document.querySelector('#character-form');
const deleteBtn = document.querySelector('#delete-btn');

// adding event listener to the votes and updating it
voteForm.addEventListener('submit', (event) =>{
  event.preventDefault(); 
  addVote(event.target.votes.value)
  votesForm.reset()
})
function addVote(voteCount){
  document.getElementById('vote-count').innerHTML = `${voteCount}`
}

//resetting votecount to 0 upon clicking of the reset button
resetBtn.addEventListener('click', ()=> {
  return document.getElementById('vote-count').innerHTML = 0
})

// creating new character info and add to database (localhost)
function addNewCharacter() {
  newCharacterForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    // adding to it
    let newObject = {
      'name': event.target.name.value,
      'image': event.target['image-url'].value,
      'votes': 0
    }
    //fetch POST
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObject)
    })
    .then(r => r.json())
    .then(data => renderCharacter(data))
  })
}


let currentCharacter;

//deleting currently displayed character from database 
function deleteCharacter(){
  deleteBtn.addEventListener('click', () =>{
    // using current character, currentCharacter that gets update on span click
    fetch(`${baseUrl}/${currentCharacter}`, {
      method: 'DELETE'
    })
    getAllCharacters(); // reupdate DOM 
  }) 
}

document.addEventListener('DOMContentLoaded', getAllCharacters)

















