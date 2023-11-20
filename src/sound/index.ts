const sounds = ['fart', 'punch', 'wow', 'pew', 'bell', 'john', 'sad', 'wrong'];

sounds.forEach((sound) => {
  const button = document.createElement('button');
  const textNode = document.createTextNode(sound);
  button.appendChild(textNode);
  button.classList.add('sound-card');

  button.addEventListener('click', () => {
    document.querySelector<HTMLAudioElement>(`#${sound}`)?.play();
  });

  const soundBoard = document.querySelector('#soundBoard');

  soundBoard?.appendChild(button);
});

document.querySelector('#soundHomeBtn')?.addEventListener('click', () => {
  const soundApp = document.querySelector('#soundApp');
  soundApp?.classList.add('sound--hide');
});
