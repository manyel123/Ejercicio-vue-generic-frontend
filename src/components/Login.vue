<template>
    <div class="logInUser">
        <div class="containerLogInUser">
            <h2>Iniciar Sesión</h2>
            <form v-on:submit.prevent="processLoginUser">
                <input
                    type="text"
                    placeholder="username"
                    v-model="user.username"
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="password"
                    v-model="user.password"
                    required
                />
                <br />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "LogIn",

    data: function () {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },

    methods: {
        processLoginUser: function () {
            axios.post(
                "http://localhost:8000/login/",
                this.user,
                { headers: {} }
            ) 
            .then((result) => { 
                let dataLogin = { 
                    username     : this.user.username ,
                    token_access : result.data.access ,
                    token_refresh: result.data.refresh,
                };
                this.$emit("completedLogIn", dataLogin); 
            }) 
            .catch((error) => {
                if (error.response.status == "401")
                    alert("Las credenciales son incorrectas"); 
            });
        },
    },
};
</script>

<style>
.logInUser {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.containerLogInUser {
    border-radius: 10px;
    width: 25%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.logInUser h2 {
    color: #303133;
}

.logInUser form {
    width: 70%;
}

.logInUser input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px dashed #303133;
}

.logInUser button {
    width: 100%;
    height: 40px;
    color: #080808;
    background: #3eda38;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0;
    
}

.logInUser button:hover {
    color: #e5e7e9;
    background: #0ea008;
    border: 1px solid #283747;
    cursor: pointer;
    transition: all 0.5s;
}
</style>