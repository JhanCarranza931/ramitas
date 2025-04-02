<template>
  <div class="loadingio-spinner-eclipse">
    <div class="ldio">
      <div></div>
    </div>
  </div>
</template>

<style type="text/css">
@keyframes ldio-animation {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

.loadingio-spinner-eclipse {
  width: 32px;
  height: 32px;
  display: inline-block;
  overflow: hidden;
  background: none;
}

.ldio {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.ldio div {
  position: absolute;
  animation: ldio-animation 1s linear infinite;
  width: 24px; /* Reducido para que no se corte */
  height: 24px; /* Reducido para que no se corte */
  top: 4px; /* Ajuste para mantener la animación centrada */
  left: 4px; /* Ajuste para mantener la animación centrada */
  border-radius: 50%;
  box-shadow: 0 2px 0 0 #000000; /* Sombra reducida */
  transform-origin: 12px 12px; /* Centrado del círculo */
}
</style>
