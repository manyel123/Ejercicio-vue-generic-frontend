<template>
    <div class="signUpUser">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <!--Manejador_del_evento_submit_del_botón_del_formulario-->
            <form v-on:submit.prevent="processSignUp">
                <!--para_userSerializer_user.atributo-->
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
                <!--para_accountSerializer_user.account.atributo-->
                <input
                    type="number"
                    v-model="user.account.balance"
                    placeholder="Initial Balance"
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
                account : {
                    lastChangeDate: new Date().toJSON().toString(),
                    balance       : 0,
                    isActive      : true,
                },
            },
        };
    },
    methods: {
        processSignUp: function () {
            axios.post(/*Conexión_al_endpoint */
                "http://localhost:8000/user/",
                this.user,
                { headers: {} },
            )
            .then((result) => {/*.then_Acciones_que_se_ejecutarán_a_partir_de_lo_que_está_en_el_endpoint */
                let dataSignUp = {
                    username      : this.user.username,
                    token_access  : result.data.access,
                    token_refresh : result.data.refresh,
                };
                /*$emit_es_el_proceso_para_enviar_datos_del_hijo_al_padre*/
                this.$emit("completedSignUp", dataSignUp);
            })      
            .catch((error) => {
                console.log(error);/*imprime_el_error_en_la_consola_del_navegador*/
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
    border: 3px solid #af486a;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.signUpUser h2 {
    color: #2d649e;
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
    border: 1px solid #af486a;
}

.signUpUser button {
    width: 100%;
    height: 40px;
    color: #e5e7e9;
    background: #2d649e;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}

.signUpUser button:hover {
    color: #e5e7e9;
    background: crimson;
    border: 1px solid #283747;
}
</style>