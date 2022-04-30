<template>
    <div id="app" class="app">
        <div class="header">
          
            <nav>
                <button v-if="!is_auth"   v-on:click="loadHome">
                    Inicio</button>
                <button v-if="!is_auth"   v-on:click="loadAccount">
                    Comp1</button>
                <button v-if="!is_auth"   v-on:click="loadTransaction">
                    Comp2</button>
                <button v-if="is_auth"   v-on:click="logOut">
                    Cerrar Sesión</button>
                <button v-if="!is_auth"  v-on:click="loadLogIn">
                    Iniciar Sesión</button>
                <button v-if="!is_auth"  v-on:click="loadSignUp">
                    Registrarse
                </button>
            </nav>
        </div>

        <div class="main-component">
            <router-view
                v-on:completedLogIn="completedLogIn"
                v-on:completedSignUp="completedSignUp"
                v-on:transactionCompleted="transactionCompleted"
                v-on:logOut="logOut"  
            >
            </router-view><!--cada_v-on_en_este_router_view_es_un_$emit_que_está_esperando_desde_los_componentes_hijos-->
        </div>

        <div class="footer">
            <h2>App footer 2022</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",

    data: function () {
        /*Variables o información que se cargarán desde el inicio */
        return {
            is_auth: false,
        };
    },

    components: {},

    methods: {
        /*métodos javaS del componente*/
        verifyAuth: function () {
            this.is_auth = localStorage.getItem("isAuth") || false;/*Si_isAuth_no_está_en_localStorage_lo_deja_siempre_false */

            if (this.is_auth == false) {
                this.$router.push({ name: "logIn" });/*Si_es_false_redirecciona_al_componente_login */
            } else 
                this.$router.push({ name: "home" });/*Si_es_true_carga_el_componente_home */
        },

        loadLogIn: function () {
            this.$router.push({ name: "logIn" });
        },

        loadSignUp: function () {
            this.$router.push({ name: "signUp" });
        },

        completedLogIn: function (data) {/*en_data_recibe_el_objeto_dataLogin_desde_el_componente_login */
            localStorage.setItem("isAuth", true);/*guarda_isAuth_en_el_localStorage_como_true_ahora_indica_que_el_usuario_está_autenticado */
            localStorage.setItem("username", data.username);/*guarda_username_y_los_token_en_el_localStorage_con_los_valores_en_dataLogin*/
            localStorage.setItem("token_access", data.token_access);
            localStorage.setItem("token_refresh", data.token_refresh);
            alert("Autenticación Exitosa");
            this.verifyAuth();/*verifica_que_el_usuario_se_encuentre_autenticado_y_redirecciona_al_home_o_al_login_según_sea_el_caso*/
        },

        completedSignUp: function (data) {
            alert("Registro Exitoso");
            this.completedLogIn(data);/*Reutiliza_la_función_completedLogIn_después_de_un_nuevo_registro_de_usuario */
        },

        transactionCompleted: function(data){/*alert_lanza_el_aviso_con_los_datos_que_llegan_del_proceso_de_transacción */
            alert(`Transacción exitosa.\n\nCantidad:${data.amount}\nFecha:${data.registerDate}\nNota:${data.note}`);
            this.$router.push({ name: "account"});
        },

        loadHome: function () {
            this.$router.push({ name: "home" });
        },

        loadAccount: function () {
            this.$router.push({ name: "account" });
        },

        loadTransaction: function () {
            this.$router.push({ name: "transactionCreate"});
        },

        logOut: function () {
            localStorage.clear();
            alert("Sesión Cerrada");
            this.verifyAuth();
        },
    },

    created: function () {
        /*Funciones que se ejecutan al cargar el componente*/
        this.verifyAuth();
    },
};
</script>

<style>
body {
    margin: 0 0 0 0;
}

.header {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 5vh;
    min-height: 50px;
    background-color: #3eda38;
    color: #e5e7e9;
}

.header nav {
    height: 100%;
    width: 99%;
    display: flex;
    justify-content:flex-end;
    align-items: center;
    font-size: 20px;
}

.header nav button {
    color: #e5e7e9;
    background: #0ea008;
    border: 1px hidden #0f200f;
    border-radius: 5px;
    padding: 10px 20px;
}

.header nav button:hover {
    color: #283747;
    background: #e5e7e9;
    border: 1px solid #e5e7e9;
    cursor: pointer;
}

.main-component {
    height: 87.59vh;
    margin: 0%;
    padding: 0%;
    background: #fdfefe;
}

.footer {
    margin: 0%;
    padding: 0%;
    width: 100%;
    height: 5vh;
    min-height: 50px;
    background-color: #3eda38;
    color: #e5e7e9;
}

.footer h2 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
