function getCanvas() {
  let canvas = document.querySelector("#canv");
  let ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return { canvas, ctx };
}

function ease(time) {
  return Math.sin(time);
}


function bounce(time) {
  let outTime = 0;

  outTime = time;
  while (outTime > 1) {
    outTime -= 1;
  }

  if (outTime < .5) {
    outTime *= 2
  }
  else {
    outTime = (1 - outTime) * 2;
  }

  return outTime;
}

export {getCanvas, ease, bounce};