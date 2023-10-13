<template>
    <div class="currency-converter">
      <h2>Convertir Moneda</h2>
      <form @submit.prevent="convertCurrency" class="form">
        <div class="form-group">
          <label for="monto_origen">Monto origen:</label>
          <input type="number" step = "any" id="monto_origen" v-model="conversion.monto_origen" required>
        </div>
        <div class="form-group">
          <label for="fecha_conversion">Fecha de Conversión:</label>
          <input type="date" id="fecha_conversion" v-model="conversion.fecha_conversion" required>
        </div>
        <button type="submit" class="submit-button">Convertir</button>
      </form>
      <div class="result">
        <p>El monto es: ${{ conversion.monto_conversion }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
  data() {
    return {
      conversion: {
        fecha_actividad: '',
        usuario: '',
        monto_origen: null,
        fecha_conversion: '',
        valor_moneda: null,
        monto_conversion: null
      }
    };
  },
  methods: {
    async convertCurrency() {
      try {
        const tipoIndicador = 'uf'; //indicador a utilizar
  
        const fechaConversion = this.conversion.fecha_conversion;
      
        const formatoFecha = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
  };
        const fechaFormateada = new Date(fechaConversion).toLocaleDateString('es-ES', formatoFecha).replace(/\//g, '-');
  
        console.log(fechaFormateada)
         const response = await axios.get(`https://mindicador.cl/api/${tipoIndicador}/${fechaFormateada}`);
         let valorMoneda = response.data.serie[0].valor;
         console.log("El valor de la moneda es: ", valorMoneda)
  
         this.conversion.monto_conversion = Math.round(this.conversion.monto_origen * valorMoneda);
         
         console.log("El monto es: $", this.conversion.monto_conversion)
  
       } catch (error) { 
          console.error('Error al obtener los datos de conversión:', error);
       }
     },
     async saveConversion(conversion) {
        
        const conversionResponsive = await axios.post("http://localhost:3000/api/conversion", conversion);   
     }
   }
  }
  </script>
  