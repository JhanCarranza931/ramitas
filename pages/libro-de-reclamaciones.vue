<template>
    
    <div class=" max-w-[800px] mx-auto pb-28">
      <div class=" p-4 mb-4 rounded">
        <h2 class="text-center text-sm text-green-900 mb-">LIBRO DE RECLAMACIONES</h2>
        <h1 class="text-center text-2xl font-medium mb-2">Registra una queja o reclamo</h1>
      </div>
      <div class="p-4 mb-4 rounded">
        <p class="mb-2 title-small text-sm">RAZÓN SOCIAL: <b class="font-medium">RAMITAS SELVÁTICAS EIRL</b></p>
        <p class="mb-2 title-small text-sm">RUC: <b class="font-medium">20611935421</b></p>
        <p class="text-sm">
          Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, este establecimiento cuenta con un Libro de Reclamaciones a tu disposición.
        </p>
      </div>
      <form @submit.prevent="submitForm">

        <!-- Datos del consumidor -->

        <section class=" p-4 mb-4 rounded">
          <h2 class="text-lg font-semibold text-green-900 mb-4">Datos del consumidor</h2>
          <div class="flex flex-col gap-4 md:flex-row">
            <div class="w-full md:w-1/2">
              <label class="block text-sm mb-1">Tipo de documento (*)</label>
              <select v-model="form.tipoDocumento" class="w-full px-3 py-2 border border-gray-300 rounded" required @change="onTipoDocumentoChange">
                <option value="" disabled>seleccionar</option>
                <option value="dni">DNI</option>
                <option value="ruc">RUC</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div class="w-full md:w-1/2 relative">
              <label class="block text-sm mb-1">Número de documento (*)</label>
              <div class="flex items-center gap-2">
                <input
                  type="text"
                  v-model="form.numeroDocumento"
                  placeholder="eje. 70000000"
                  class="w-full px-3 py-2 border border-gray-300 rounded"
                  :maxlength="form.tipoDocumento === 'dni' ? 8 : form.tipoDocumento === 'ruc' ? 11 : 20"
                  required
                />
                <button type="button" @click="consultarDocumento" class="px-4 py-2 bg-green-800 text-white rounded disabled:bg-gray-400" :disabled="isLoading">
                  {{ isLoading ? 'Buscando...' : 'Buscar' }}
                </button>
              </div>
              <div v-if="apiError" class="absolute bottom-[-24px] left-0 text-xs text-red-500 bg-white px-2 py-1 border border-red-500 rounded shadow">
                {{ apiError }}
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 mt-4 md:flex-row">
            <div class="w-full md:w-1/2">
              <label class="block  text-sm mb-1">Nombres o Razón Social (*)</label>
              <input
                type="text"
                v-model="form.nombres"
                placeholder="eje. Pedro Jose"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                :readonly="isReadOnly && !apiError"
              />
            </div>
            <div class="w-full md:w-1/2">
              <label class="block  text-sm mb-1">Dirección (*)</label>
              <input
                type="text"
                v-model="form.direccion"
                placeholder="eje. Av ejemplo 233"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                :readonly="form.tipoDocumento === 'ruc' && isReadOnly && !apiError"
              />
            </div>
          </div>
          <div class="flex flex-col gap-4 mt-4 md:flex-row">
            <div class="w-full md:w-1/2">
              <label class="block  text-sm mb-1">Teléfono (*)</label>
              <input
                type="tel"
                v-model="form.telefono"
                placeholder="eje. 900 000 000"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div class="w-full md:w-1/2">
              <label class="block  text-sm mb-1">Correo Electrónico (*)</label>
              <input
                type="email"
                v-model="form.correo"
                placeholder="eje. ejemplo@gmail.com"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
        </section>

        <!-- Datos del reclamo -->
        <section class="] p-4 mb-4 rounded">
          <h2 class="text-lg font-semibold text-green-900 mb-4">Datos del reclamo</h2>
          <div class="w-full mb-4">
            <label class="block  text-sm mb-1">Fecha (*)</label>
            <input type="date" v-model="form.fecha" class="w-full px-3 py-2 border border-gray-300 rounded" required />
          </div>
          <div class="w-full mb-4">
            <label class="block text-sm mb-1">Descripción del producto o servicio (*)</label>
            <textarea
              v-model="form.descripcionProducto"
              placeholder="eje. texto"
              class="w-full px-3 py-2 border border-gray-300 rounded h-24 resize-y"
              required
            ></textarea>
          </div>
          <div class="flex flex-col gap-4 md:flex-row">
            <div class="w-full md:w-1/2">
              <label class="block  text-sm mb-1">Monto pagado (si aplica)</label>
              <input
                type="text"
                v-model="form.montoPagado"
                placeholder="eje. 100.00"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div class="w-full md:w-1/2">
              <label class="block  text-sm mb-1">Tipo</label>
              <select v-model="form.tipo" class="w-full px-3 py-2 border border-gray-300 rounded">
                <option value="" disabled selected>seleccionar</option>
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
              </select>
            </div>
          </div>
          <div class="w-full mb-4 mt-4">
            <label class="block  text-sm mb-1">Detalle del problema (*)</label>
            <textarea
              v-model="form.detalleProblema"
              placeholder="eje. texto"
              class="w-full px-3 py-2 border border-gray-300 rounded h-24 resize-y"
              required
            ></textarea>
          </div>
          <div class="w-full mb-4">
            <label class="block text-sm mb-1">Pedido del consumidor (*)</label>
            <textarea
              v-model="form.pedidoConsumidor"
              placeholder="eje. texto"
              class="w-full px-3 py-2 border border-gray-300 rounded h-24 resize-y"
              required
            ></textarea>
          </div>
        </section>

        <!-- Confirmación -->
        <section class=" p-4 mb-4 rounded">
          <h2 class="text-lg font-semibold text-green-900 mb-4">Confirmación</h2>
          <div class="flex items-start gap-2 mb-4">
            <input
              type="checkbox"
              v-model="form.declaracionJurada"
              class="mt-1"
              required
            />
            <div>
              <div>Declaro que la información proporcionada es verdadera.</div>
              <div class="text-sm text-gray-600">Esta declaración tiene carácter de declaración jurada</div>
            </div>
          </div>
        </section>

        <!-- Botones -->
        <div class="flex justify-between">
          <button type="button" @click="limpiarFormulario" class="px-4 py-2 bg-white text-green-900 border border-green-800 rounded">
            Limpiar
          </button>
          <button type="submit" class="px-4 py-2 bg-green-800 text-white rounded disabled:bg-gray-400" :disabled="isSubmitting">
            {{ isSubmitting ? 'Enviando...' : 'Enviar reclamo' }}
          </button>
        </div>
      </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isLoading = ref(false);
const isSubmitting = ref(false);
const apiError = ref("");
const isReadOnly = ref(false);

const form = ref({
  tipoDocumento: "",
  numeroDocumento: "",
  nombres: "",
  direccion: "",
  telefono: "",
  correo: "",
  fecha: "",
  descripcionProducto: "",
  montoPagado: "",
  tipo: "",
  detalleProblema: "",
  pedidoConsumidor: "",
  declaracionJurada: false,
});

const limpiarFormulario = () => {
  form.value = {
    tipoDocumento: "",
    numeroDocumento: "",
    nombres: "",
    direccion: "",
    telefono: "",
    correo: "",
    fecha: "",
    descripcionProducto: "",
    montoPagado: "",
    tipo: "",
    detalleProblema: "",
    pedidoConsumidor: "",
    declaracionJurada: false,
  };
  apiError.value = "";
  isReadOnly.value = false;
};

const onTipoDocumentoChange = () => {

  form.value.numeroDocumento = "";
  form.value.nombres = "";
  form.value.direccion = "";
  apiError.value = "";
  isReadOnly.value = false;
};

const submitForm = async () => {
  const response = await fetch('/api/reclamo',{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body : JSON.stringify(form.value)
  })
  const result = await response.json()
  console.log(result)
};

const consultarDocumento = async () => {
  const { tipoDocumento, numeroDocumento } = form.value;
  apiError.value = ""; // Limpiar mensaje de error previo
  if (!tipoDocumento) {
    apiError.value = "Por favor, selecciona un tipo de documento.";
    setTimeout(() => (apiError.value = ""), 5000); // Ocultar mensaje después de 5 segundos
    return;
  }
  if (!numeroDocumento) {
    apiError.value = "Por favor, ingresa un número de documento.";
    setTimeout(() => (apiError.value = ""), 5000); // Ocultar mensaje después de 5 segundos
    return;
  }
  if (tipoDocumento === "dni" && numeroDocumento.length !== 8) {
    apiError.value = "El DNI debe tener 8 dígitos.";
    setTimeout(() => (apiError.value = ""), 5000); // Ocultar mensaje después de 5 segundos
    return;
  }
  if (tipoDocumento === "ruc" && numeroDocumento.length !== 11) {
    apiError.value = "El RUC debe tener 11 dígitos.";
    setTimeout(() => (apiError.value = ""), 5000); // Ocultar mensaje después de 5 segundos
    return;
  }


  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJtYWtlcmFuZHJlQGdtYWlsLmNvbSJ9.3kHO2Sr0qAtysPi9QnUmova5RMkkuMVSUZK6vYMqGSI";
  let url = "";
  if (tipoDocumento === "dni") {
    url = `https://dniruc.apisperu.com/api/v1/dni/${numeroDocumento}?token=${token}`;
  } else if (tipoDocumento === "ruc") {
    url = `https://dniruc.apisperu.com/api/v1/ruc/${numeroDocumento}?token=${token}`;
  } else {
    isReadOnly.value = false;
    return;
  }
  isLoading.value = true;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    if (data.success === false || data.error) {
      throw new Error(data.message || "No se encontraron datos");
    }
    if (tipoDocumento === "dni") {
      if (data.nombres) {
        form.value.nombres = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`.trim();
        isReadOnly.value = true;
      } else {
        throw new Error("No se encontraron datos para este DNI");
      }
    } else if (tipoDocumento === "ruc") {
      if (data.razonSocial) {
        form.value.nombres = data.razonSocial;
        form.value.direccion = data.direccion || "";
        isReadOnly.value = true;
      } else {
        throw new Error("No se encontraron datos para este RUC");
      }
    }
  } catch (error) {
    console.error("Error al consultar el documento:", error);
    apiError.value = `No se encontraron datos. ${error.message}. Puedes ingresar los datos manualmente.`;
    setTimeout(() => (apiError.value = ""), 5000); // Ocultar mensaje después de 5 segundos
    isReadOnly.value = false;
  } finally {
    isLoading.value = false;
  }
}

</script>

