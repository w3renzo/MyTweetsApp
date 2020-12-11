function writeTwt(twt) {
  let twtText =
    '<article class="message">' +
    '  <div class="message-header">' +
    '    <p>Normal message</p>' +
    '    <button class="delete" onclick="deleteTwt(' +
    twt +
    ')" id="deleteTwt" aria-label="delete"></button>' +
    '  </div>' +
    '  <div class="message-body">' +
    twt +
    '  </div>' +
    '</article>';
  return twtText;
}
