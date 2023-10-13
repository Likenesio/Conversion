<template>
  <div class ="login">
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit="login">
      <div class="form-group">
        <label for="correo">Correo Electrónico</label>
        <input type="email" id="correo" v-model="correo" required>
      </div>
      <div class="form-group">
        <label for="contrasenia">Contraseña</label>
        <input type="password" id="contrasenia" v-model="contrasenia" required>
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
data() {
  return {
    correo: "",
    contrasenia: ""
  };
},
methods: {
  login() {
    // Realiza la solicitud de inicio de sesión al servidor
    const data = {
      correo: this.correo,
      contrasenia: this.contrasenia
    };

    // Realiza la solicitud POST al endpoint de inicio de sesión en tu servidor
    axios
      .post("/api/login", data)
      .then(response => {
        const token = response.data.token;

        // Guarda el token en el almacenamiento local para su uso posterior
        localStorage.setItem("token", token);

        // Redirige al usuario a la página de inicio después de iniciar sesión
        this.$router.push("/conversion");
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
        // Puedes mostrar un mensaje de error en tu formulario
      });
      this.$router.push('/converseion');
  }
}
};
</script>
