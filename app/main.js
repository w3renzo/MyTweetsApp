const btn = document.querySelector('form');
const saveTwBox = document.getElementById('saveTwts');
const textarea = document.getElementById('tweet');
const noti = document.querySelector('#notificationDelete');

let tweets = viewLocalStorageTwts();

document.addEventListener('DOMContentLoaded', showTwt());
textarea.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    // keyCode 13 corresponds to the Enter key
    e.preventDefault(); // prevents inserting linebreak
  }
});

btn.addEventListener('submit', () => {
  let tweet = document.querySelector('#tweet').value;

  saveTw(tweet);
});

function saveTw(tweet) {
  tweets = viewLocalStorageTwts(tweets);
  tweets.push(tweet);
  //local storage only save string as value for this use(JSON.stringify)
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function showTwt() {
  tweets.forEach((element) => {
    saveTwBox.insertAdjacentHTML('afterbegin', writeTwt(element));
  });
}

function viewLocalStorageTwts() {
  let tweets;

  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function deleteTwt(e) {
  let box = document.querySelectorAll('.message');
  let htmlArray = box.length - 1;
  let tweets;
  tweets = viewLocalStorageTwts();

  for (let index = 0, l = htmlArray; index < tweets.length; index++, l--) {
    if (tweets[index] === e) {
      console.log(tweets[index]);
      tweets.splice(index, 1);
      box[l].remove();
    }
  }
  localStorage.setItem('tweets', JSON.stringify(tweets));
  displayNotification();
  // timeout for notification popup
  setTimeout(() => {
    noti.innerHTML = '';
  }, 3000);
}

function writeTwt(twt) {
  let e = twt;
  let twtText =
    '<article class="message">' +
    '  <div class="message-header">' +
    '    <p>My Tweet</p>' +
    '    <button type="submit" class="delete" onclick="deleteTwt(\'' +
    e +
    '\')" id="deleteTwt" aria-label="delete"></button>' +
    '  </div>' +
    '  <div class="message-body">' +
    twt +
    '  </div>' +
    '</article>';
  return twtText;
}

const notification =
  '<div class="notification is-danger is-light">' +
  '    <strong>Tweet Eliminado</strong>' +
  '  </div>';

function displayNotification() {
  noti.innerHTML = notification;
}
