<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Outfit" />
  <div class="container">
    <div class="header-box">
      <h2 class="title-small">LIBRO DE RECLAMACIONES</h2>
      <h1 class="title-large">Registra una queja o reclamo</h1>
    </div>

    <div class="info-box">
      <div class="info-item">
        <span class="info-label">RAZÓN SOCIAL:</span> RAMITAS SELVATICAS EIRL
      </div>
      <div class="info-item">
        <span class="info-label">RUC:</span> 20619535421
      </div>
      <div class="info-text">
        Conforme a lo establecido en el Código de Protección y Defensa del
        Consumidor, este establecimiento cuenta con un Libro de Reclamaciones a
        tu disposición.
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-section">
        <h2 class="section-title" style="color: green">Datos del consumidor</h2>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tipo de documento (*)</label>
            <select v-model="form.tipoDocumento" class="form-select" required @change="onTipoDocumentoChange">
              <option value="" disabled>seleccionar</option>
              <option value="dni">DNI</option>
              <option value="ruc">RUC</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div class="form-group input-with-button">
            <label class="form-label">Número de documento (*)</label>
            <div class="input-button-container">
              <input
                type="text"
                v-model="form.numeroDocumento"
                placeholder="eje. 70000000"
                class="form-input"
                :maxlength="form.tipoDocumento === 'dni' ? 8 : form.tipoDocumento === 'ruc' ? 11 : 20"
                required
              />
              <button type="button" @click="consultarDocumento" class="btn btn-primary" :disabled="isLoading">
                {{ isLoading ? 'Buscando...' : 'Buscar' }}
              </button>
            </div>
            <div v-if="apiError" class="error-message">{{ apiError }}</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nombres o Razón Social(*)</label>
            <input
              type="text"
              v-model="form.nombres"
              placeholder="eje. Pedro Jose"
              class="form-input"
              :readonly="isReadOnly && !apiError"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Dirección (*)</label>
            <input
              type="text"
              v-model="form.direccion"
              placeholder="eje. Av ejemplo 233"
              class="form-input"
              :readonly="form.tipoDocumento === 'ruc' && isReadOnly && !apiError"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Teléfono (*)</label>
            <input
              type="tel"
              v-model="form.telefono"
              placeholder="eje. 900 000 000"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Correo Electrónico (*)</label>
            <input
              type="email"
              v-model="form.correo"
              placeholder="eje. ejemplo@gmail.com"
              class="form-input"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2 class="section-title" style="color: green">Datos del reclamo</h2>
        <div class="form-group">
          <label class="form-label">Fecha (*)</label>
          <input type="date" v-model="form.fecha" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label">Descripción del producto o servicio (*)</label>
          <textarea
            v-model="form.descripcionProducto"
            placeholder="eje. texto"
            class="form-textarea"
            required
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Monto pagado (si aplica)</label>
            <input
              type="text"
              v-model="form.montoPagado"
              placeholder="eje. 100.00"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Tipo</label>
            <select v-model="form.tipo" class="form-select">
              <option value="" disabled selected>seleccionar</option>
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Detalle del problema (*)</label>
          <textarea
            v-model="form.detalleProblema"
            placeholder="eje. texto"
            class="form-textarea"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Pedido del consumidor (*)</label>
          <textarea
            v-model="form.pedidoConsumidor"
            placeholder="eje. texto"
            class="form-textarea"
            required
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h2 class="section-title" style="color: green">Confirmación</h2>
        <div class="checkbox-container">
          <input
            type="checkbox"
            v-model="form.declaracionJurada"
            class="checkbox-input"
            required
          />
          <div class="checkbox-text">
            <div>Declaro que la información proporcionada es verdadera.</div>
            <div class="checkbox-subtext">
              Esta declaración tiene carácter de declaración jurada
            </div>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button type="button" @click="limpiarFormulario" class="button button-secondary">
          Limpiar
        </button>
        <button type="submit" class="button button-primary" :disabled="isSubmitting">
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
  // Reset fields when document type changes
  form.value.numeroDocumento = "";
  form.value.nombres = "";
  form.value.direccion = "";
  apiError.value = "";
  isReadOnly.value = false;
};

const submitForm = () => {
  isSubmitting.value = true;
  
  try {
    console.log("Formulario enviado:", form.value);
    alert("Reclamo enviado correctamente");
    limpiarFormulario();
  } catch (error) {
    console.error("Error al enviar formulario:", error);
    alert("Ocurrió un error al enviar el reclamo");
  } finally {
    isSubmitting.value = false;
  }
};

const consultarDocumento = async () => {
  const { tipoDocumento, numeroDocumento } = form.value;
  
  // Validate input before making API call
  apiError.value = "";
  
  if (!tipoDocumento) {
    apiError.value = "Por favor, selecciona un tipo de documento.";
    return;
  }
  
  if (!numeroDocumento) {
    apiError.value = "Por favor, ingresa un número de documento.";
    return;
  }
  
  if (tipoDocumento === "dni" && numeroDocumento.length !== 8) {
    apiError.value = "El DNI debe tener 8 dígitos.";
    return;
  }
  
  if (tipoDocumento === "ruc" && numeroDocumento.length !== 11) {
    apiError.value = "El RUC debe tener 11 dígitos.";
    return;
  }
  
  // Prepare API URL
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJtYWtlcmFuZHJlQGdtYWlsLmNvbSJ9.3kHO2Sr0qAtysPi9QnUmova5RMkkuMVSUZK6vYMqGSI";
  let url = "";
  
  if (tipoDocumento === "dni") {
    url = `https://dniruc.apisperu.com/api/v1/dni/${numeroDocumento}?token=${token}`;
  } else if (tipoDocumento === "ruc") {
    url = `https://dniruc.apisperu.com/api/v1/ruc/${numeroDocumento}?token=${token}`;
  } else {
    // For "otro" type, allow manual input
    isReadOnly.value = false;
    return;
  }
  
  // Make API request
  isLoading.value = true;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the API returned an error
    if (data.success === false || data.error) {
      throw new Error(data.message || "No se encontraron datos");
    }
    
    // Process data based on document type
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
    isReadOnly.value = false;
  } finally {
    isLoading.value = false;
  }
};

// Función para compartir el reclamo por WhatsApp
const compartirWhatsApp = () => {
  const mensaje = `*Reclamo de ${form.value.nombres}*\n` +
    `Documento: ${form.value.tipoDocumento.toUpperCase()} ${form.value.numeroDocumento}\n` +
    `Detalle: ${form.value.detalleProblema}\n` +
    `Pedido: ${form.value.pedidoConsumidor}`;
    
  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header-box,
.info-box,
.form-section {
  border: 1px dotted #a0c0e0;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.title-small {
  color: #165819;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  font-family: Outfit;
}

.title-large {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  font-family: Outfit;
}

.info-item {
  margin-bottom: 8px;
  font-family: Outfit;
}

.info-label {
  font-weight: bold;
  font-family: Outfit;
}

.info-text {
  font-size: 14px;
  font-family: Outfit;
}

.section-title {
  font-weight: bold;
  margin-bottom: 15px;
  font-family: Outfit;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
  font-family: Outfit;
}

@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
  }

  .form-row .form-group {
    width: 50%;
  }
}

.form-group {
  margin-bottom: 15px;
}

.input-with-button {
  position: relative;
}

.input-button-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: Outfit;
}

.form-textarea {
  height: 100px;
  resize: vertical;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.checkbox-input {
  margin-top: 4px;
  margin-right: 10px;
}

.checkbox-subtext {
  font-size: 15px;
  color: #666;
  font-family: Outfit;
}

.checkbox-text {
  font-family: Outfit;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  border: none;
}

.button-primary {
  background-color: #0a5029;
  color: white;
}

.button-secondary {
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
}
</style>