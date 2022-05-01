<template>
    <div class="contactUs">
        <div class="containerContactUs">
            <h2>Contáctenos</h2>
            <form v-on:submit.prevent="processContactForm">
                <input 
                    type="text"
                    v-model="contactForm.name"
                    placeholder="Nombre"
                    required
                />
                <br />
                <input 
                    type="text"
                    v-model="contactForm.company"
                    placeholder="Nombre de la compañía"
                    required
                />
                <br />
                <input 
                    type="number"
                    v-model="contactForm.phone"
                    placeholder="Teléfono"
                    required
                />
                <br />
                <input 
                    type="email"
                    v-model="contactForm.email"
                    placeholder="Email"
                    required
                />
                <br />
                <input 
                    type="text"
                    v-model="contactForm.question"
                    placeholder="Pregunta sobre nuestros productos"
                    required
                />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactUs",
    data: function () {
        return {
            contactForm: {
                name: "",
                company: "",
                phone: "",
                email: "",
                question: "",
            },
        };
    },
}
</script>

<style>
.contactUs {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.containerContactUs {
    border-radius: 10px;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.contactUs h2 {
    color: #303133;
}

.contactUs form {
    width: 70%;
}

.contactUs input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px dashed #303133;
}

.contactUs button {
    width: 100%;
    height: 40px;
    color: #080808;
    background: #3eda38;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}

.contactUs button:hover {
    color: #e5e7e9;
    background: 0ea008;
    border: 1px solid #283747;
    cursor: pointer;
    transition: all 0.5s;
}
</style>
