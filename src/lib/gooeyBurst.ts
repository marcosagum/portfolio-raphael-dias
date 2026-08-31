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

export function spawnGooeyBurst(container: HTMLElement, { count = 10, distance = 56 }: GooeyBurstOptions = {}) {
  for (let i = 0; i < count; i++) {
    const [startX, startY] = getXY(distance + noise(16), count - i, count);
    const time = 550 + noise(250);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    const particle = document.createElement('span');
    particle.className = 'gooey-particle';
    particle.style.setProperty('--start-x', `${startX}px`);
    particle.style.setProperty('--start-y', `${startY}px`);
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
