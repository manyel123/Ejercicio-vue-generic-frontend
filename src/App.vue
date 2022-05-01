<template>
    <div id="app" class="app">
        <div class="header">
            <nav>
                <button v-on:click="loadHome">
                    Inicio</button>
                <button v-on:click="loadHome">
                    Comp1(NotLogInComp)</button>
                <button v-on:click="loadHome">
                    Comp2(NotLogInComp)</button>
                <button v-on:click="loadContactUs">
                    Contáctenos</button>
                <button v-if="is_auth"   v-on:click="loadUserHome">
                     UserHome</button>
                <button v-if="is_auth"   v-on:click="loadAccount">
                    Comp1(LogInComp)</button>
                <button v-if="is_auth"   v-on:click="loadTransaction">
                    Comp2(LogInComp)</button>
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
                v-on:logOut="logOut"  
            >
            </router-view>
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
        return {
            is_auth: false,
        };
    },

    components: {},

    methods: {
        verifyAuth: function () {
            this.is_auth = localStorage.getItem("isAuth") || false;

            if (this.is_auth == false) {
                this.$router.push({ name: "home" });
            } else 
                this.$router.push({ name: "account" });
        },

        loadLogIn: function () {
            this.$router.push({ name: "logIn" });
        },

        loadSignUp: function () {
            this.$router.push({ name: "signUp" });
        },

        completedLogIn: function (data) {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token_access", data.token_access);
            localStorage.setItem("token_refresh", data.token_refresh);
            alert("Autenticación Exitosa");
            this.verifyAuth();
        },

        completedSignUp: function (data) {
            alert("Registro Exitoso");
            this.completedLogIn(data);
        },

        transactionCompleted: function(data){
            alert(`Transacción exitosa.\n\nCantidad:${data.amount}\nFecha:${data.registerDate}\nNota:${data.note}`);
            this.$router.push({ name: "account"});
        },

        loadHome: function () {
            this.$router.push({ name: "home" });
        },

        loadUserHome: function () {
            this.$router.push({ name: "userHome"})
        },

        loadAccount: function () {
            this.$router.push({ name: "account" });
        },

        loadTransaction: function () {
            this.$router.push({ name: "transactionCreate"});
        },

        loadContactUs: function () {
            this.$router.push({ name: "contactus"})
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
    background: #3eda38;
}

.header {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 6vh;
    min-height: 50px;
    background-color: #3eda38;
    color: #e5e7e9;
}

.header nav {
    height: 100%;
    width: 99%;
    display: flex;
    justify-content: flex-end;
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
    transition: all 0.75s;
}

.main-component {
    height: 87.6vh;
    margin: 0%;
    padding: 0%;
    background: #fdfdfe;
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
    display:flex;
    justify-content: center;
    align-items:baseline;
}
</style>
