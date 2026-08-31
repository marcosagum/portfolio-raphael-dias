const COLORS = ['var(--gooey-color-1)', 'var(--gooey-color-2)', 'var(--gooey-color-3)', 'var(--gooey-color-4)'];

function noise(n = 1) {
  return n / 2 - Math.random() * n;
}

function getXY(distance: number, index: number, total: number): [number, number] {
  const angle = ((360 + noise(8)) / total) * index * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
}

type GooeyBurstOptions = {
  count?: number;
  distance?: number;
};

export function spawnGooeyBurst(container: HTMLElement, { count = 10, distance = 46 }: GooeyBurstOptions = {}) {
  for (let i = 0; i < count; i++) {
    const [endX, endY] = getXY(distance + noise(14), count - i, count);
    const time = 500 + noise(300);
    const rotate = noise(60);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    const particle = document.createElement('span');
    particle.className = 'gooey-particle';
    particle.style.setProperty('--end-x', `${endX}px`);
    particle.style.setProperty('--end-y', `${endY}px`);
    particle.style.setProperty('--rotate', `${rotate}deg`);
    particle.style.setProperty('--time', `${time}ms`);

    const dot = document.createElement('span');
    dot.className = 'gooey-particle-dot';
    dot.style.setProperty('--gooey-dot-color', color);

    particle.appendChild(dot);
    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, time);
  }
}
