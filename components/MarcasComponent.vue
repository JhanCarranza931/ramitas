<script setup>
import logoGrace from '@/assets/img/logo-grace.webp';
import logoDigital from '@/assets/img/logo-digital.webp';
import logoRamitas from '@/assets/img/logo-ramitas.webp';
</script>

<template>
    <section class="flex gap-10 m-auto justify-center max-lg:flex-wrap">
        <Card 
        :logo="logoGrace"
        marca="Grace Natural Beauty"
        texto="Marca dedicada al cuidado personal y el bienestar, inspirada en la riqueza natural de la Amazonía."
        industria="Cosmética"
        web="www.gracenaturalbeauty.com"
        link="https://gracenaturalbeauty.com/"
        ></Card>
        <Card 
        :logo="logoDigital"
        marca="Digital Tangarana"
        texto="Empresa de servicios digitales,desarrolla soluciones que destacan por su creatividad y efectividad. "
        industria="Servicios Digitales"
        web="www.digitaltangarana.com"
        link="https://digitaltangarana.com/"
        ></Card>
        <Card
        :logo="logoRamitas"
        marca="Ramita Eventos"
        texto="Alquiler de muebles vanguardistas, transformando espacios únicos para cada ocasión."
        industria="Alquiler de mobiliario"
        web="www.ramitaeventos.com"
        link="https://ramitaeventos.com/"
        ></Card>
    </section>
</template>