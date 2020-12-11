const btn = document.querySelector('form');
const saveTwBox = document.getElementById('saveTwts');
const textarea = document.getElementById('tweet');
document.addEventListener('DOMContentLoaded', showTwt());

textarea.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    // keyCode 13 corresponds to the Enter key
    e.preventDefault(); // prevents inserting linebreak
  }
});

btn.addEventListener('submit', () => {
  let tweet = document.querySelector('#tweet').value;

  if (tweet === '') {
    alert('Write in te text area');
    return;
  }

  saveTw(tweet);
});

function saveTw(tweet) {
  let tweets;
  tweets = viewLocalStorageTwts(tweets);

  tweets.push(tweet);
  //local storage only save string as value for this use(JSON.stringify)
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function showTwt() {
  let tweets;
  tweets = viewLocalStorageTwts();

  tweets.forEach((element) => {
    saveTwBox.insertAdjacentHTML('afterbegin', writeTwt(element));
  });
  console.log(tweets);
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
  console.log(e);
  let box = document.querySelectorAll('.message');
  let g = box.length - 1;
  let tweets;
  tweets = viewLocalStorageTwts();

  for (let index = 0, l = g; index < tweets.length; index++, l--) {
    if (tweets[index] === e) {
      console.log(tweets[index]);
      tweets.splice(index, 1);
      box[l].remove();
    }
  }

  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function writeTwt(twt) {
  let e = twt;
  let twtText =
    '<article class="message">' +
    '  <div class="message-header">' +
    '    <p>Normal message</p>' +
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
