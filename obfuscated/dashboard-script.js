/* NOKA_SECURITY */ document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('canvas');
if (!canvas) return;
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
ctx.lineWidth = 1;
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
ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity * 2.5})`;
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
window.addEventListener('resize', init);
init();
animate();
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const tabTitle = document.getElementById('tab-title');
const themeMap = {
'overview': 'Dashboard Overview',
'accounts': 'Active Accounts',
'settings': 'System Settings'
};
tabBtns.forEach(btn => {
btn.addEventListener('click', () => {
const target = btn.getAttribute('data-tab');
tabBtns.forEach(b => b.classList.remove('active'));
tabContents.forEach(c => c.classList.remove('active'));
btn.classList.add('active');
document.getElementById(target).classList.add('active');
if (tabTitle && themeMap[target]) {
tabTitle.innerText = themeMap[target];
}
});
});
const fetchUserData = async () => {
const userDisplay = document.getElementById('username-display');
const licenseDisplay = document.getElementById('license-display');
try {
const res = await fetch('/api/user-info');
if (res.status === 401) {
if (userDisplay) userDisplay.innerText = "SESSION_EXPIRED";
return;
}
const data = await res.json();
if (res.status === 404) {
if (userDisplay) userDisplay.innerText = "RE-LOGIN_REQUIRED";
if (licenseDisplay) licenseDisplay.innerText = "PLEASE_LOGOUT_AND_IN";
return;
}
if (data.username && data.license) {
if (userDisplay) userDisplay.innerText = `@${data.username.toUpperCase()}`;
if (licenseDisplay) licenseDisplay.innerText = data.license;
}
} catch (err) {
console.error("Failed to fetch user data:", err);
if (userDisplay) userDisplay.innerText = "CONNECTION_OFFLINE";
}
};
fetchUserData();
});