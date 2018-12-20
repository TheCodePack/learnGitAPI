'use strict';

function getRepos() {
  $('#results-list').empty();

  var userInput = $("#js-search-term").val();

  fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(response => response.json())
    .then(responseJson =>
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}


function displayResults(responseJson) {

  console.log(responseJson);

  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>`
      )};

  if (responseJson.code == '404') {
    alert('Bad request, please try another');
  }

  $('#results').removeClass('hidden');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});