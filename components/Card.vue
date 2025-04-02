<script setup>
const props = defineProps({
    logo:String,
    marca:String,
    texto:String,
    industria:String,
    web:String,
    link:String
})
</script>
<template>


    <article class="w-[400px] bg-white pr-6 pl-6 pb-6 max-md:w-full">
        <div class="h-24 flex items-center border-b border-[#F3F3F3]">
            <img :src="props.logo" alt="gracenaturalbeauty" class="">
        </div>
        <div class="flex flex-col pt-9 pb-24 gap-6 border-b border-[#F3F3F3]">
            <h3 class="font-medium">{{ marca }}</h3>
            <p>{{ texto }}</p>
        </div>
        <div class="flex justify-between pt-2 pb-3 border-b border-[#F3F3F3] font-medium">
            Industria
            <span class="font-light">{{ industria }}</span>
        </div>
        <div class="flex justify-between pt-2 pb-3 border-b border-[#F3F3F3] font-medium">
            Web
            <span class="font-light">{{ web }}</span>
        </div>
        <div class="flex justify-between  pt-2 pb-3 border-b border-[#F3F3F3] font-medium ">
            <a :href="link" target="_blank" class="w-full flex justify-between">
            Visitar
            <div :href=" link " target="_blank" class="font-light relative  pb-1  group w-full"><span class="
                absolute left-0 bottom-2 h-[1.5px] w-full bg-black scale-x-0 origin-left 
                transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="25" viewBox="0 0 12 25" fill="none" class="relative top-[3px]">
  <path d="M2.45199 6.69522L3.51299 5.63523L9.29199 11.4122C9.38514 11.5048 9.45907 11.6149 9.50952 11.7361C9.55997 11.8574 
  9.58594 11.9874 9.58594 12.1187C9.58594 12.2501 9.55997 12.3801 9.50952 12.5013C9.45907 12.6226 9.38514 12.7327 9.29199 
  12.8252L3.51299 18.6052L2.45299 17.5452L7.87699 12.1202L2.45199 6.69522Z" fill="black"/>
</svg>
</a>
        </div>
        

    </article>
</template>