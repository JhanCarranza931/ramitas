
<template>
    <main class="max-w-[1220px] pl-10 pr-10 m-auto ">
        
        <header class="flex justify-between h-[64px] items-center fixed top-0 max-w-[1140px] w-full z-50 bg-[#FBFBFB] max-md:pr-20">
  <a href="/#">
    <img class="h-9" src="../assets/img/ramitas-logo.svg" alt="logo">
  </a>

  <!-- Botón hamburguesa -->
  <button @click="isMenuOpen = !isMenuOpen" class="md:hidden z-50">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Menú de navegación -->
  <nav :class="['flex gap-4 text-sm max-md:flex-col max-md:bg-white max-md:fixed max-md:top-0 max-md:right-0 max-md:h-screen max-md:w-[75%] max-md:pt-20 max-md:pl-6 transition-transform duration-300 ease-in-out', isMenuOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full']">
    <a href="/#" class="relative px-4 py-1 group">Inicio
      <span class="absolute left-0 bottom-0 h-[1.7px] w-full bg-black scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
    </a>
    <a href="#" @click.prevent="scrollTo('nosotros')" class="relative px-4 py-1 group">Nosotros
      <span class="absolute left-0 bottom-0 h-[1.7px] w-full bg-black scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
    </a>
    <a href="#marcas" @click.prevent="scrollTo('marcas')" class="relative px-4 py-1 group">Marcas
      <span class="absolute left-0 bottom-0 h-[1.7px] w-full bg-black scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
    </a>
    <a href="#contacto" @click.prevent="scrollTo('contacto')" class="relative px-4 py-1 group">Contacto
      <span class="absolute left-0 bottom-0 h-[1.7px] w-full bg-black scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
    </a>
  </nav>
</header>

        <main class="mt-24 flex flex-col gap-24"> 
            <slot />
        </main>
        <footer class="flex flex-col gap-10 pt-8 pb-8 border-t border-[#EEEEEE] text-sm">
            <section class="flex justify-between items-end">
                <div>
                    <img src="../assets/img/ramitas-logo.svg" class="h-[43px]" alt="Logo">
                    <p class="pt-3">RUC:938438424</p>
                    <p>RAMITAS SELVÁTICAS E.I.R.L</p>
                </div>

                <NuxtLink to="/libro-de-reclamaciones" class="flex items-center gap-2 relative  pb-1  group"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M7.99998 13.9633C7.09931 13.3293 6.05665 12.9253 4.96331 12.7893C4.18788 12.6318 3.39786 12.5573 2.60665 12.5673C2.50541 12.5682 2.405 12.549 2.31121 12.5109C2.21742 12.4727 2.13212 12.4164 2.06022 12.3451C1.98832 12.2738 1.93125 12.189 1.8923 12.0956C1.85336 12.0021 1.83331 11.9019 1.83331 11.8006L1.84731 4.53863C1.84689 4.34378 1.92067 4.15607 2.05366 4.01367C2.18666 3.87126 2.36889 3.78484 2.56331 3.77196C3.36874 3.75595 4.17351 3.82793 4.96331 3.98663C6.05546 4.12753 7.09731 4.53055 7.99998 5.16129M7.99998 13.9633V5.16129M7.99998 13.9633C8.90065 13.3293 9.94331 12.9253 11.0366 12.7893C11.8121 12.6318 12.6021 12.5573 13.3933 12.5673C13.4946 12.5682 13.595 12.549 13.6888 12.5109C13.7825 12.4727 13.8678 12.4164 13.9397 12.3451C14.0116 12.2738 14.0687 12.189 14.1077 12.0956C14.1466 12.0021 14.1667 11.9019 14.1666 11.8006L14.152 4.53863C14.1524 4.34388 14.0787 4.15627 13.9459 4.01388C13.813 3.87149 13.631 3.785 13.4366 3.77196C12.6312 3.75595 11.8264 3.82793 11.0366 3.98663C9.9445 4.12753 8.90264 4.53055 7.99998 5.16129" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>Libro de reclamaciones <span class="absolute left-0 bottom-0 h-[1.5px] w-full bg-black scale-x-0 
                transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span></NuxtLink>
          
            </section>
            <section class="flex justify-between border-t border-[#EEEEEE] pt-5 max-md:flex-wrap max-md:items-center max-md:flex-col-reverse">
                <span>© 2025 Ramitas Selvaticas. Todos los derechos reservados.</span>
                <nav class="flex gap-5">
                    <NuxtLink to="/terminos-y-condiciones" class="relative  pb-1  group">Términos y condiciones <span class="absolute left-0 bottom-0 h-[1.5px] w-full bg-black scale-x-0 
                        transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span> </NuxtLink>
                    <NuxtLink to="/politicas-de-privacidad" class="relative  pb-1  group">Políticas de privacidad <span class="absolute left-0 bottom-0 h-[1.5px] w-full bg-black scale-x-0 
                        transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span></NuxtLink>
                    <NuxtLink to="/cookies" class="relative  pb-1  group">Cookies <span class="absolute left-0 bottom-0 h-[1.5px] w-full bg-black scale-x-0 
                        transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span></NuxtLink>
                </nav>
            </section>
        </footer>
        
    </main>
</template>

<script setup>
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false)
const router = useRouter();

const scrollTo = async (id) => {
  if (window.location.pathname !== '/') {
    await router.push({ path: '/', hash: `#${id}` });
    isMenuOpen.value = false

  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    isMenuOpen.value = false
  }
};
</script>
