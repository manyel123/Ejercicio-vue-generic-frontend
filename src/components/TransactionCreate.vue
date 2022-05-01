<template>
    <div class="transaction">
        <div class="containerTransaction">
            <h1>Transacciones</h1>
            <form v-on:submit.prevent="processTransaction">
                <select v-model="transaction.transaction_data.account_destiny">
                    <option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.user.name}}</option>
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
            transaction : {
                user_id : 0,
                transaction_data : {
                    account_origin  : 0,
                    account_destiny : 0,
                    amount          : 0,
                    register_date   : (new Date()).toJSON().toString(),
                    note            : ""
                }
            },

            accounts : [],

            accountId : 0,
        }
    },

    methods:{

        getUserAccountData: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {
                this.$emit("logOut");
                return;
            }

            await this.verifyToken();

            let token  = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
                        
            axios
                .get(
                    `http://localhost:8000/user/${userId}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                    this.accountId = result.data.account.id;
                })
                .catch(() => {
                    this.$emit("logOut");
                });
        },

        processTransaction: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {
                this.$emit("logOut");
                return;
            }

            await this.verifyToken();

            let token  = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;

            this.transaction.user_id = userId;
            this.transaction.transaction_data.account_origin = this.accountId;

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
                        let dataTransaction = {
                            amount         : this.transaction.transaction_data.amount,
                            registerDate   : this.transaction.transaction_data.register_date,
                            note           : this.transaction.transaction_data.note,
                        }
                        this.$emit('transactionCompleted', dataTransaction)
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
            ) {
                this.$emit("logOut");
                return;
            }

            await this.verifyToken();

            let token  = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();

            axios
                .get(
                    `http://localhost:8000/accounts/list/${userId}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                    this.accounts = result.data;
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

        verifyToken: function () {
            return axios
                .post(
                    "http://localhost:8000/refresh/",
                    { refresh: localStorage.getItem("token_refresh") },
                    { headers: {} }
                )
                .then((result) => {
                    localStorage.setItem("token_access", result.data.access);
                })
                .catch(() => {
                    this.$emit("logOut");
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