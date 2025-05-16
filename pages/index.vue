<template>
    <HeroComponent></HeroComponent>
    <MisionVision id="nosotros"></MisionVision>
    <article >
        <TitleComponent title="NOSOTROS" content="Nuestra Historia"></TitleComponent>
        <HistoriaComponent></HistoriaComponent>
    </article>
    
    <article id="marcas">
        <TitleComponent title="MARCAS DERIVADAS" content="Conoce nuestras marcas, cada una diseñada para atender sectores específicos y ofrecer soluciones personalizadas a nuestros clientes."></TitleComponent>
        <MarcasComponent></MarcasComponent>
    </article>
    <ContactoComponent id="contacto"></ContactoComponent>
    

</template>
<script setup>

    useHead({
        title:'Ramitas Selvaticas',
        meta :[{name:'description',content:'Ramitas selvaticas como es un holding empresarial, gestionamos y desarrollamos marcas con identidad propia, brindando soluciones innovadoras'} ]
    })
</script>