<template>
  <div class="app">
    <!-- 粒子背景 -->
    <canvas ref="canvas" class="background" />

    <!-- 主内容 -->
    <div class="container">
      <h1 class="title">年龄计算器</h1>
      <div class="form">
        <label>出生日期：</label>
        <input v-model="birth" type="date" />

        <label>目标日期（可选）：</label>
        <input v-model="target" type="date" />

        <button @click="calcAge">计算</button>
      </div>

      <div v-if="result" class="result">
        <p>年龄: {{ result.years }} 年 {{ result.months }} 月 {{ result.days }} 天</p>
        <p>一共: {{ result.totalDays }} 天</p>
        <p v-if="result.leftDays !== null">距离目标日: {{ result.leftDays }} 天</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const birth = ref('2025-07-06');
const target = ref('');
const result = reactive({ years: 0, months: 0, days: 0, totalDays: 0, leftDays: null });

function calcAge() {
  const birthDate = new Date(birth.value);
  const today = target.value ? new Date(target.value) : new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = today - birthDate;
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  result.years = years;
  result.months = months;
  result.days = days;
  result.totalDays = totalDays;

  if (target.value) {
    const now = new Date();
    result.leftDays = Math.floor((new Date(target.value) - now) / (1000 * 60 * 60 * 24));
  } else {
    result.leftDays = null;
  }

  target.value = '';
}

// 粒子背景
const canvas = ref(null);
let ctx;
const particles = [];
const mouse = { x: null, y: null, radius: 120 }; // 鼠标交互半径

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    this.size = 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // 边界反弹
    if (this.x < 0 || this.x > canvas.value.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.value.height) this.vy *= -1;

    // 鼠标交互
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      // 吸引/排斥（可调节）
      const force = (mouse.radius - dist) / mouse.radius;
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * force * 3; // 排斥
      this.y += Math.sin(angle) * force * 3;
    }

    this.draw();
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = dx * dx + dy * dy;
      if (dist < 120 * 120) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  particles.forEach((p) => p.update());
  connectParticles();
  requestAnimationFrame(animate);
}

onMounted(() => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  ctx = canvas.value.getContext('2d');

  // 初始化粒子
  const count = Math.floor((canvas.value.width * canvas.value.height) / 15000);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * canvas.value.width;
    const y = Math.random() * canvas.value.height;
    particles.push(new Particle(x, y));
  }

  // 鼠标监听
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  animate();
  window.addEventListener('resize', () => {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  });

  calcAge(); // 初始计算
});
</script>

<style scoped>
.app {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: black;
}

.container {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white;
  text-align: center;
}

.title {
  margin-bottom: 20px;
  font-size: 2em;
  text-shadow: 0 0 15px #0ff;
}

.form {
  margin-bottom: 20px;
}

input,
button {
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 6px;
}

button {
  color: white;
  cursor: pointer;
  background: linear-gradient(45deg, #00f, #0ff);
  transition: 0.3s;
}

button:hover {
  box-shadow: 0 0 10px #0ff;
  transform: scale(1.1);
}

.result {
  margin-top: 15px;
  font-size: 1.2em;
  text-shadow: 0 0 10px #fff;
}
</style>
