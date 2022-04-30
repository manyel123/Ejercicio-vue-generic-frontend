<template>
    <div class="transaction">
        <div class="containerTransaction">
            <h1>Transacciones</h1>
            <form v-on:submit.prevent="processTransaction"><!--Formulario_de_transacción-->
                <select v-model="transaction.transaction_data.account_destiny"><!--Select_del_comboBox-->
                    <option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.user.name}}</option><!--carga_de_información_del_comboBox_desde_la_db-->
                </select>
                <input type="number" placeholder="Cantidad" v-model="transaction.transaction_data.amount">
                <input type="text" placeholder="Nota" v-model="transaction.transaction_data.note">
                <button type="submit">Transferir</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios      from 'axios';
import jwt_decode from 'jwt-decode';

export default{
    name: "TransactionCreate",

    data: function() {
        return {
            transaction : {/*Datos_para_la_transferencia */
                user_id : 0,
                transaction_data : {
                    account_origin  : 0,
                    account_destiny : 0,
                    amount          : 0,
                    register_date   : (new Date()).toJSON().toString(),
                    note            : ""
                }
            },

            accounts : [],/*Lista_de_cuentas_para_el_comboBox */

            accountId : 0,/*id_de_la_cuenta_asociada_al_id_del_usuario_obtenido_del_token */
        }
    },

    methods:{

        getUserAccountData: async function () {/*Esta_función_trae_el_accountId_desde_la_base_de_datos */
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
                    this.accountId = result.data.account.id;/*Asigna_el_account.id_en_la_base_de_datos_al_accountId_local_basado_en_el_user_id_del_token*/
                })
                .catch(() => {
                    this.$emit("logOut");
                });
        },

        processTransaction: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {/*Si_no_hay_tokens_en_el_localStorage_cerrará_la_sesión_del_usuario*/
                this.$emit("logOut");
                return;
            }

            await this.verifyToken();/*genera_un_nuevo_token_de_acceso_a_partir_del_token_refresh */

            let token  = localStorage.getItem("token_access");/*asigna_el_token_access_guardado_a_token */
            let userId = jwt_decode(token).user_id;/*Saca_el_user_id_del_token */

            this.transaction.user_id = userId;/*Asigna_el_user_id_del_token_al_user_id_de_la_transacción*/
            this.transaction.transaction_data.account_origin = this.accountId;/*Asigna_el_id_de_la_cuenta_al_accountId_local */

            if (
                this.transaction.transaction_data.account_origin === this.accountId
            ) {
                axios
                    .post(
                        "http://localhost:8000/transaction/create/",
                        this.transaction,
                        { headers: { Authorization: `Bearer ${token}` } },
                    )
                    .then((result) => {                             
                        let dataTransaction = {/*Datos_para_enviar_a_la_alerta_después_del_proceso_de_transacción */
                            amount         : this.transaction.transaction_data.amount,
                            registerDate   : this.transaction.transaction_data.register_date,
                            note           : this.transaction.transaction_data.note,
                        }
                        this.$emit('transactionCompleted', dataTransaction)/*Envío_de_la_confirmación_con_los_datos_para_mostrar */
                    })
                    .catch((error) => {
                        /*console.log(error);*/
                        if (error.response.status == "401"){
                            alert("No está autorizado para realizar esta operación.")
                        }
                        else if (error.response.status == "400"){
                            alert("La transacción no se ha procesado correctamente.\nRevise los datos e intente de nuevo.")
                        }
                    })
                }
        },

        getAccounts: async function () {
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

            axios
                .get(/*Petición_para_obtener_las_cuentas */
                    `http://localhost:8000/accounts/list/${userId}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                    this.accounts = result.data;/*Asigna_la_lista_de_cuenteas_obtenidas_al_accounts[]_local */
                })
                .catch((error) => {
                    if (error.response.status == "401"){
                        alert("No está autorizado para realizar esta operación.")
                    }
                    else if (error.response.status == "500"){
                        alert("Problema en la plataforma.\nIntente de nuevo más tarde.")
                    }
                })
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
        this.getAccounts();
        this.getUserAccountData();
    }
}
</script>

<style>
.transaction {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.containerTransaction {
    border: 3px solid #af486a;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.transaction h2 {
    color: #2d649e;
}

.transaction form {
    width: 70%;
}

.transaction input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #af486a;
}

.transaction select {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #af486a;
}

.transaction button {
    width: 100%;
    height: 40px;
    color: #e5e7e9;
    background: #2d649e;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}

.transaction button:hover {
    color: #e5e7e9;
    background: crimson;
    border: 1px solid #283747;
}

.transaction h1{
    color: #283747;
}
</style>