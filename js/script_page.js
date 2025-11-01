
/* Audio */
const audio = document.getElementById('info-sound-audio');
const playBtn = document.getElementById('playBtn');
const seekBar = document.getElementById('seekBar');
const time = document.getElementById('time');

audio.addEventListener('loadedmetadata', () => {
  seekBar.max = audio.duration;
  updateGauge();
});

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.src = './Images/common/sound_button_pause.png';
    playIcon.alt = 'pause';
    /*playBtn.textContent = '⏸';*/
  } else {
    audio.pause();    
    playIcon.src = './Images/common/button_next.png';
    playIcon.alt = 'pause';
    /*playBtn.textContent = '▶︎';*/
  }
});

seekBar.addEventListener('input', () => {
  audio.currentTime = seekBar.value;
  
  const percent = (seekBar.value / seekBar.max) * 100 || 0;
  gaugeWrap.style.setProperty('--fill', percent + '%');
  updateGauge();
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  gaugeWrap.style.setProperty('--fill', percent + '%');

  seekBar.value = audio.currentTime;
  /*time.textContent = formatTime(audio.currentTime);*/
});
function updateGauge() {
  if (!audio.duration) return;

  // range 실제 값도 바꾼다
  seekBar.value = audio.currentTime;

  // 커스텀 게이지라면 채워진 비율도 바꾼다
  const percent = (audio.currentTime / audio.duration) * 100;
  if (gaugeWrap) {
    gaugeWrap.style.setProperty('--fill', percent + '%');
  }
}
function formatTime(sec) {
  sec = Math.floor(sec);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ':' + (s < 10 ? '0' + s : s);
}