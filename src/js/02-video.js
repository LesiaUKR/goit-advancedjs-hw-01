import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
console.log(throttle);
const CURRENT_PLAYER_TIME = 'Current Player Time';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(currentTime) {
  const currentDuration = currentTime.seconds;
  localStorage.setItem(CURRENT_PLAYER_TIME, JSON.stringify(currentDuration));
  console.log(currentDuration);
}

player
  .getCurrentTime()
  .then(function () {
    const savedCurrentDuration = localStorage.getItem(CURRENT_PLAYER_TIME);
    console.log(savedCurrentDuration);
    if (!savedCurrentDuration) {
      return;
    }
    player.setCurrentTime(savedCurrentDuration);
  })
  .catch(function (error) {
    console.log(error);
  });
