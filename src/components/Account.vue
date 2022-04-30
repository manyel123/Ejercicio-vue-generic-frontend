<template>
    <div v-if="loaded" class="information"><!--Renderización_condicional-->
        <h1>Información de su cuenta</h1><!--solo_renderiza_la_información_si_loaded_es_true-->
        <h2>
            Nombre: <span>{{ name }}</span>
        </h2>
        <h2>
            Saldo: <span>{{ balance }} COP </span>
        </h2>
        <h2>
            Correo electrónico: <span>{{ email }}</span>
        </h2>
    </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import axios      from "axios";

export default {
    name: "Account",

    data: function () {
        return {
            name   : "",
            email  : "",
            balance: 0,
            loaded : false,
        };
    },

    methods: {
        getData: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {/*Si_no_hay_tokens_en_el_localStorage_cerrará_la_sesión_del_usuario*/
                this.$emit("logOut");
                return;
            }

            await this.verifyToken();/*genera_un_nuevo_token_de_acceso_a_partir_del_token_refresh */

            let token  = localStorage.getItem("token_access");/*asigna_el_token_access_guardado_a_token */
            let userId = jwt_decode(token).user_id.toString();
                        /*Pasa_el_token_por_el_jwt_decode_saca_el_user_id_del_token_y_lo_convierte_en_string*/
            axios
                .get(
                    `http://localhost:8000/user/${userId}/`,/*Este_userId_viene_del_token*/
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                    this.name    = result.data.name;
                    this.email   = result.data.email;
                    this.balance = result.data.account.balance;
                    this.loaded  = true;
                })
                .catch(() => {
                    this.$emit("logOut");
                });
        },

        verifyToken: function () {/*Genera_un_nuevo_token_de_acceso_con_el_token_de_refresh*/
            return axios
                .post(
                    "http://localhost:8000/refresh/",/*Endpoint_del_refresh_token */
                    { refresh: localStorage.getItem("token_refresh") },/*info_que_se_envía_al_enpoint_para_el_refresh_del_token */
                    { headers: {} }
                )
                .then((result) => {
                    localStorage.setItem("token_access", result.data.access);/*Guarda_el_nuevo_token_de_acceso_en_el_localStorage */
                })
                .catch(() => {
                    this.$emit("logOut");/*En_caso_de_error_redirecciona_al_logOut */
                });
        },
    },

    created: async function () {
        this.getData();/*estas_funciones_se_ejecutan_al_cargar_este_componente */
    },
};
</script>


<style>
.information {
    margin: 0;
    padding: 0%;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.information h1 {
    font-size: 60px;
    color: #0f1316;
}

.information h2 {
    font-size: 40px;
    color: #283747;
}

.information span {
    color: crimson;
    font-weight: bold;
}
</style>