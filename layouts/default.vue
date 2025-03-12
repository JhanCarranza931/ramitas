
<template>
    <main class="max-w-[1440px] pl-10 pr-10 m-auto h-[10000px]">
        
        <header class="flex gap-[500px] h-[54px] 0 items-center fixed top-0 w-[1440px] z-50 bg-white">
            <img class="float-left" src="" alt="logo">
            <nav class="flex gap-4 text-sm">
                <a href="">Inicio</a>
                <a href="">Historia</a>
                <a href="">Marcas</a>
                <a href="">Contacto</a>
            </nav>
        </header>
        <main class="mt-24"> 
            <slot />
        </main>
    </main>
</template>
