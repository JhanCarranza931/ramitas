<script setup>

    const formData = ref({
        nombre:"",
        correo:"",
        telefono:"",
        asunto:"",
        mensaje:"",
    })
    const isloading = ref(false)
    const sendEmail = async ()=>{
        
        isloading.value = true;
        const response = await fetch('/api/send',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData.value)
        })
        const result = await response.json();
        formData.value = {
            nombre:"",
            correo:"",
            telefono:"",
            asunto:"",
            mensaje:"",
        }
        isloading.value = false
        console.log(result)
    }
</script>
<template>
    <section class="flex justify-center gap-[100px] pb-24 items-start max-md:flex-wrap">
        <div class="w-[505px] flex flex-col gap-6 ">
            <div>
                <h3 class="text-sm font-medium">HABLEMOS</h3>
                <p>Déjanos tu mensaje y te respondemos pronto </p>
            </div>
            <form @submit.prevent="sendEmail" class="flex flex-col gap-4">
                <label for="" class="flex flex-col gap-2">Nombre (*)
                    <input type="text" v-model="formData.nombre" class="border border-[#D0D5DD] h-9 rounded-md pl-2">
                </label>
                <label for="" class="flex flex-col gap-2">Correo electronico (*)
                    <input type="email" v-model="formData.correo" class="border border-[#D0D5DD] h-9 rounded-md pl-2">
                </label>

                <label for="" class="flex flex-col gap-2">Telefono (*)
                    <input type="number"  v-model="formData.telefono" class="border border-[#D0D5DD] h-9 rounded-md pl-2">
                </label>

                <label for="" class="flex flex-col gap-2">Asunto (*)
                    <input type="text" v-model="formData.asunto" class="border border-[#D0D5DD] h-9 rounded-md pl-2">
                </label>
                <label for="" class="flex flex-col gap-2">Mensaje (*)</label>
                
                    <textarea type="text" v-model="formData.mensaje" class="border border-[#D0D5DD] h-[110px] rounded-md pl-2 "></textarea>
                
                    <button type="submit" class=" pt-2   font-medium  rounded-md relative  pb-1  group mt-5">
                        <span v-if="isloading"><Loading class="w-[20px] h-[20px]"></Loading></span>
                        <span v-else>Enviar</span>
                        <span class="absolute left-0 bottom-0 h-[1.5px] w-full bg-black scale-x-0 
                        transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span></button>
               


            </form>

        </div>
        <img src="../assets/img/contacto.webp" class="flex-1 max-w-[560px] h-auto object-cover max-md:w-full" alt="contacto">
    </section>
</template>