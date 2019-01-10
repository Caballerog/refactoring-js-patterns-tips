const player = (function(view) {
  const max = 600;
  let GUI = {};
  let loop;
  function init() {
    GUI = {
      media: view.getElementById('media'),
      play: view.getElementById('play'),
      bar: view.getElementById('bar'),
      progress: view.getElementById('progress')
    };
    GUI.play.addEventListener('click', click, false);
    GUI.bar.addEventListener('click', move, false);
  }
  function click() {
    if (!GUI.media.paused && !GUI.media.ended) {
      GUI.media.pause();
      GUI.play.innerHTML = 'Play';
      clearInterval(loop);
    } else {
      GUI.media.play();
      GUI.play.innerHTML = 'Pause';
      loop = setInterval(state, 1000);
    }
  }
  function move(e) {
    if (!GUI.media.paused && !GUI.media.ended) {
      const mouseX = e.pageX - bar.offsetLeft;
      const newTime = (mouseX * media.duration) / max;
      GUI.media.currentTime = newTime;
      progress.style.width = mouseX + 'px';
    }
  }
  function state() {
    if (!GUI.media.ended) {
      const total = parseInt(
        (GUI.media.currentTime * max) / GUI.media.duration
      );
      GUI.progress.style.width = total + 'px';
    } else {
      GUI.progress.style.width = '0px';
      GUI.play.innerHTML = 'Play';
      clearInterval(loop);
    }
  }
  return {
    init,
    click,
    move
  };
})(window.document);
window.addEventListener('load', player.init, false);
