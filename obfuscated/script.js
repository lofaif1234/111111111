/* NOKA_SECURITY */ document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height, elements = [];
const init = () => {
width = window.innerWidth;
height = window.innerHeight;
canvas.width = width;
canvas.height = height;
elements = [];
for (let i = 0; i < 30; i++) {
elements.push({
type: 'line',
x: Math.random() * width,
y: Math.random() * height,
speed: Math.random() * 2 + 1,
length: Math.random() * 100 + 50,
opacity: Math.random() * 0.3
});
}
for (let i = 0; i < 15; i++) {
elements.push({
type: 'square',
x: Math.random() * width,
y: Math.random() * height,
size: Math.random() * 40 + 20,
speedX: Math.random() * 0.5 - 0.25,
speedY: Math.random() * 0.5 - 0.25,
opacity: Math.random() * 0.1,
rotation: Math.random() * Math.PI * 2,
rotSpeed: (Math.random() - 0.5) * 0.02
});
}
};
const animate = () => {
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, width, height);
elements.forEach(el => {
if (el.type === 'line') {
ctx.strokeStyle = `rgba(255, 255, 255, ${el.opacity})`;
ctx.beginPath();
ctx.moveTo(el.x, el.y);
ctx.lineTo(el.x, el.y + el.length);
ctx.stroke();
el.y += el.speed;
if (el.y > height) {
el.y = -el.length;
el.x = Math.random() * width;
}
} else if (el.type === 'square') {
ctx.save();
ctx.translate(el.x + el.size / 2, el.y + el.size / 2);
el.rotation += el.rotSpeed;
ctx.rotate(el.rotation);
const outer = el.size;
const inner = el.size * 0.4;
ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity * 2})`;
ctx.beginPath();
ctx.rect(-outer / 2, -outer / 2, outer, outer);
ctx.rect(inner / 2, -inner / 2, -inner, inner);
ctx.fill();
ctx.restore();
el.x += el.speedX;
el.y += el.speedY;
if (el.x > width) el.x = -el.size;
if (el.x < -el.size) el.x = width;
if (el.y > height) el.y = -el.size;
if (el.y < -el.size) el.y = height;
}
});
const time = Date.now() * 0.001;
const sweepY = (time * 150) % (height + 200) - 100;
const gradient = ctx.createLinearGradient(0, sweepY, 0, sweepY + 100);
gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
ctx.fillStyle = gradient;
ctx.fillRect(0, sweepY, width, 100);
requestAnimationFrame(animate);
};
init();
animate();
window.addEventListener('resize', init);
const tiltElements = document.querySelectorAll('.tilt-element');
tiltElements.forEach(el => {
el.addEventListener('mousemove', (e) => {
const { offsetWidth: width, offsetHeight: height } = el;
const { offsetX: x, offsetY: y } = e;
const rotateX = ((y / height) - 0.5) * 10;
const rotateY = ((x / width) - 0.5) * -10;
el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
});
el.addEventListener('mouseleave', () => {
el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
});
});
const purchaseModal = document.getElementById('purchase-modal');
const accessModal = document.getElementById('access-modal');
const buyBtns = document.querySelectorAll('.btn-buy:not(a)');
const accessBtn = document.querySelector('.nav-btn');
const closeButtons = document.querySelectorAll('.modal-close');
buyBtns.forEach(btn => {
btn.onclick = () => {
purchaseModal.style.display = "block";
}
});
accessBtn.onclick = (e) => {
e.preventDefault();
accessModal.style.display = "block";
}
closeButtons.forEach(btn => {
btn.onclick = () => {
if (purchaseModal) purchaseModal.style.display = "none";
if (accessModal) accessModal.style.display = "none";
}
});
window.onclick = (event) => {
if (event.target == purchaseModal) purchaseModal.style.display = "none";
if (event.target == accessModal) accessModal.style.display = "none";
}
window.onclick = (event) => {
if (event.target == purchaseModal) {
purchaseModal.style.display = "none";
}
if (event.target == accessModal) {
accessModal.style.display = "none";
}
}
});