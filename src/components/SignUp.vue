<template>
    <div class="signUpUser">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processSignUp">
                <input
                    type="text"
                    v-model="user.username"
                    placeholder="Username"
                    required
                />
                <br />
                <input
                    type="password"
                    v-model="user.password"
                    placeholder="Password"
                    required
                />
                <br />
                <input 
                    type="text" 
                    v-model="user.name" 
                    placeholder="Name" 
                    required
                />
                <br />
                <input 
                    type="email" 
                    v-model="user.email" 
                    placeholder="Email" 
                    required
                />
                <br />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "SignUp",
    data: function () {
        return {
            user: {
                username: "",
                password: "",
                name    : "",
                email   : "",
            },
        };
    },
    methods: {
        processSignUp: function () {
            axios.post(
                "http://localhost:8000/user/",
                this.user,
                { headers: {} },
            )
            .then((result) => {
                let dataSignUp = {
                    username      : this.user.username,
                    token_access  : result.data.access,
                    token_refresh : result.data.refresh,
                };
                this.$emit("completedSignUp", dataSignUp);
            })      
            .catch((error) => {
                console.log(error);
                alert("ERROR: Fallo en el registro de usuario.");
            });
        },
    },
};
</script>

<style>
.signUpUser {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.containerSignUpUser {
    border-radius: 10px;
    width: 25%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.signUpUser h2 {
    color: #303133;
}

.signUpUser form {
    width: 70%;
}

.signUpUser input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px dashed #303133;
}

.signUpUser button {
    width: 100%;
    height: 40px;
    color: #080808;
    background: #3eda38;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}

.signUpUser button:hover {
    color: #e5e7e9;
    background: 0ea008;
    border: 1px solid #283747;
    cursor: pointer;
    transition: all 0.5s;
}
</style>