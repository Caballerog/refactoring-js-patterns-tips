function init() {
  max = 600;
  media = document.getElementById('media');
  play = document.getElementById('play');
  bar = document.getElementById('bar');
  progress = document.getElementById('progress');
  play.addEventListener('click', click, false);
  bar.addEventListener('click', move, false);
}
function click() {
  if (!media.paused && !media.ended) {
    media.pause();
    play.innerHTML = 'Play';
    window.clearInterval(loop);
  } else {
    media.play();
    play.innerHTML = 'Pause';
    loop = setInterval(state, 1000);
  }
}

function state() {
  if (!media.ended) {
    var total = parseInt((media.currentTime * max) / media.duration);
    progress.style.width = total + 'px';
  } else {
    progress.style.width = '0px';
    play.innerHTML = 'Play';
    window.clearInterval(loop);
  }
}

function move(e) {
  if (!media.paused && !media.ended) {
    var mouseX = e.pageX - bar.offsetLeft;
    var newTime = (mouseX * media.duration) / max;
    media.currentTime = newTime;
    progress.style.width = mouseX + 'px';
  }
}
window.addEventListener('load', init, false);
