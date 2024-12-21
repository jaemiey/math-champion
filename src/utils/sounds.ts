export const playCorrectSound = () => {
  const audio = new Audio('/correct.mp3');
  audio.volume = 0.5;
  audio.play().catch(error => console.log('Audio playback failed:', error));
};

export const playIncorrectSound = () => {
  const audio = new Audio('/incorrect.mp3');
  audio.volume = 0.5;
  audio.play().catch(error => console.log('Audio playback failed:', error));
};

export const playGameOverSound = () => {
  const audio = new Audio('/game-over.mp3');
  audio.volume = 0.5;
  audio.play().catch(error => console.log('Audio playback failed:', error));
};