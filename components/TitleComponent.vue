<script setup>
const props = defineProps({
    title:String,
    content:String   
})

</script>

<template>
    <div class="flex flex-col gap-2 pt-3 pb-[50px] justify-center items-center">
        <h3 class="text-sm text-green-900 font-medium">{{title}}</h3>
        <p>{{ content }}</p>
    </div>
</template>