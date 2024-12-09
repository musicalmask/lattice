
const colors = [
    ['#ff6a6a', '#6aafff'],
    ['#6aff6a', '#ffcc6a'],
    ['#6a6aff', '#ff6a6a'],
    ['#ff6a6a', '#6aff6a']
];

let currentColorIndex = 0;
let nextColorIndex = 1;

function animateGradient() {
    const body = document.body;
    const gradient = `linear-gradient(45deg, ${colors[currentColorIndex][0]}, ${colors[currentColorIndex][1]})`;
    body.style.background = gradient;

    currentColorIndex = (currentColorIndex + 1) % colors.length;
    nextColorIndex = (nextColorIndex + 1) % colors.length;

    setTimeout(animateGradient, 5000); // Change colors every 5 seconds
}

animateGradient();