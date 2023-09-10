export interface ISketchStore {
  drawTool: 'pencil' | 'eraser';
  color: string;
  mouseDown: boolean;

  actions: {
    setMouseDown: (isMouseDown: boolean) => void;
    setColor: (color: string) => void;
    setDrawTool: (drawTool: 'pencil' | 'eraser') => void;
    draw: (e: Event) => void;
    clearBoard: () => void;
  };
}

const sketchStore: ISketchStore = {
  drawTool: 'pencil',
  color: '#0f172a',
  mouseDown: false,

  actions: {
    setMouseDown: setMouseDown,
    setColor: setColor,
    setDrawTool: setDrawTool,
    draw: draw,
    clearBoard: clearBoard,
  },
};

export const actions = sketchStore.actions;

function setMouseDown(isMouseDown: boolean) {
  sketchStore.mouseDown = isMouseDown;
}

function setColor(color: string) {
  sketchStore.color = color;
}

function setDrawTool(drawTool: 'pencil' | 'eraser') {
  sketchStore.drawTool = drawTool;
}

function draw(e: Event) {
  const { mouseDown, drawTool, color } = sketchStore;
  const element = e.target as HTMLElement;
  if (!mouseDown) return;

  if (drawTool === 'pencil') {
    element.style.backgroundColor = color;
    return;
  }

  if (drawTool === 'eraser') {
    element.style.backgroundColor = 'white';
    return;
  }
}

function clearBoard() {
  const pixels: NodeListOf<HTMLElement> = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  });
}
