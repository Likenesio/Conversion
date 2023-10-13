<template>
    <div>
      <h2>Historial de Conversiones</h2>
      <ul>
        <li v-for="conversion in conversiones" :key="conversion._id">
          {{ conversion.fieldName }}: {{ conversion.fieldValue }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        conversiones: []
      };
    },
    mounted() {
      this.getHistorialConversion();
    },
    methods: {
      async getHistorialConversion() {
        try {
          const response = await axios.get('/api/conversiones');
          this.conversiones = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  