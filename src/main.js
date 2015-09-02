let s = new Snap('#london');

Snap.load('london.svg', response => {
  let london = response;

  s.append(london);
});
