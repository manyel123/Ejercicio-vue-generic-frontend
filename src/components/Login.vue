<template>
    <div class="logInUser">
        <div class="containerLogInUser">
            <h2>Iniciar Sesión</h2>
            <!--Manejador_del_evento_submit_del_botón_del_formulario-->
            <form v-on:submit.prevent="processLoginUser">
                <input
                    type="text"
                    placeholder="username"
                    v-model="user.username"
                    required
                />
                <br /><!--v_model_user.username_debe_ser_el_mismo_establecido_en_el_serializer-->
                <input
                    type="password"
                    placeholder="password"
                    v-model="user.password"
                    required
                />
                <br /><!--v_model_user.password_debe_ser_el_mismo_establecido_en_el_serializer-->
                <!--Los_v_model_deben_empatar_con_los_datos_que_el_serializer_está_esperando_recibir-->
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
            axios.post(/*Conexión_al_endpoint */
                "http://localhost:8000/login/",
                this.user,
                { headers: {} }
            ) /*=> función_fecla,_es_una_función_que_está_dentro_del_código */
            .then((result) => { /*.then_Acciones_que_se_ejecutarán_a_partir_de_lo_que_está_en_el_endpoint */
                let dataLogin = { /*Crea_el_objeto_dataLogin */
                    username     : this.user.username /*asigna_el_username_ingresado_por_el_usuario_a_username */,
                    token_access : result.data.access /*De_la_respuesta_del_login_trae_el_token_de_acceso_y_lo_guarda_en_este_atributo */,
                    token_refresh: result.data.refresh /*De_la_respuesta_del_login_trae_el_token_de_refresh_y_lo_guarda_en_este_atributo */,
                };
                /*emit_es_el_proceso_para_enviar_datos_del_hijo_al_padre*/
                /*$emit_envia_al_componente_padre_App_la_confirmación_del_login_con_completedLogIn_y_dataLogin_los_datos_producto_del_proceso */
                this.$emit("completedLogIn", dataLogin); /*dataLogin_es_la_data_con_la_cual_el_completedLogIn_se_logró*/
            }) /*Ahora_el_componente_padre_App_tendrá_la_información_del_login_con_dataLogin */
            .catch((error) => {/*En_caso_de_que_el_user_o_password_sean_incorrectos */
                if (error.response.status == "401")/*El_backend_retorna_el_error_401 */
                    alert("Las credenciales son incorrectas"); /*Se_emite_esta_alerta_al_usuario */
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
    border: 3px solid #283747;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.logInUser h2 {
    color: #283747;
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
    border: 1px solid #af486a;
}

.logInUser button {
    width: 100%;
    height: 40px;
    color: #e5e7e9;
    background: #2d649e;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0;
}

.logInUser button:hover {
    color: #e5e7e9;
    background: crimson;
    border: 1px solid #283747;
}
</style>