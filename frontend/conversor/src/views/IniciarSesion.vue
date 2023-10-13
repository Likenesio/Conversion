<template>
  <div>
    <form @submit="handleSubmit">
      <input type="text" v-model="correo" placeholder="Correo">
      <input type="password" v-model="contrasenia" placeholder="Contraseña">
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      correo: '',
      contrasenia: '',
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();

      // Datos para enviar al servidor
      const data = {
        correo: this.correo,
        contrasenia: this.contrasenia,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/usuario/login', data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token); 
        const rol = decodedToken.rol;      
        //console.log(decodedToken)
        //console.log('Inicio de sesión exitoso');

        if (rol === 'admin') {
        this.$router.push('/home');
      } else if (rol === 'user') {
        this.$router.push('/home');
      } else {
        console.error('Rol desconocido:', rol);
        alert("error")
      }

      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    },
  },
};
</script>
