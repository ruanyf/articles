# CSS 动画

## 隐入（fade in）

```css
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.fade-in {
  animation: fade-in 1s forwards linear;
}
```

## 上浮（fade up）

```css
@keyframes fade-up {
  0% {
    opacity: 0; transform: translateY(3em);
  }
  100% {
    opacity: 1; transform: translateY(none);
  }
}
.fade-up {
  animation: fade-up 3s cubic-bezier(.05,.98,.17,.97) forwards;
}
```

## 左右摆动（wiggle）

```css
@keyframes wiggle {
0%, 7% { transform: rotateZ(0); opacity: 0; }
15% { transform: rotateZ(-15deg); opacity: 1; }
20% { transform: rotateZ(10deg); }
25% { transform: rotateZ(-10deg); }
30% { transform: rotateZ(6deg); }
35% { transform: rotateZ(-4deg); }
40%, 100% { transform: rotateZ(0); }
}
```

## 上下弹跳（bounceAround）

```css
.animation {
	…
	animation: bounceAround 1.1s ease-in-out infinite;
}

@keyframes bounceAround {
	0% {transform:translateY(0);}
	20% {transform:translateY(-60px) rotate(0deg);}
	25%{transform:translateY(20px) rotate(0deg);}
	35%, 55%{transform:translateY(0px) rotate(0deg);}
	60% {transform: translateY(-20px) rotate(0deg);}
	100%{transform: translateY(-20px) rotate(360deg);}
}
```

