import shuffleCards from '../utils/shuffleCards';

function MusicRenderer() {
  const audioContext = new AudioContext();
  let songs = [];
  let currentSongIndex = 0;

  for (let i = 1; i <= 9; i += 1) {
    songs.push(`./assets/music/music-${i}.mp3`);
  }

  const onEnded = () => {
    currentSongIndex += 1;

    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
  };

  const handleDecodeAudioData = (arrayBuffer) => {
    audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      document.addEventListener('click', () => {
        source.start();
      });

      setTimeout(() => {
        this.play();
      }, audioBuffer.duration * 1000);
    });
  };

  this.suffleSongs = () => {
    songs = shuffleCards(songs);
  };

  this.play = (songIndex = 0) => {
    fetch(songs[songIndex])
      .then((response) => response.arrayBuffer())
      .then(handleDecodeAudioData);

    onEnded();
  };
}

export default MusicRenderer;
