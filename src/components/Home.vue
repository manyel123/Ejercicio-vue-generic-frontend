<template>
    <div class="homeSlide">
        <vue-displacement-slideshow class="slideS"
                                    :images="images"
                                    :displacement="displacement"
                                    :intensity="0.2"
                                    :speedIn="1.4"
                                    :speedOut="1.4"
                                    ease="expo.inOut"
                                    ref="slideshow"
                                    :is-interactive="false"
                                    :interactionVelocity="{ x : 15, y : 5 }"
                                    :angle="1.2"/>
    </div>
    
</template>


<script>
import VueDisplacementSlideshow from "vue-displacement-slideshow";
export default {
    name: "Home",

    components: {
            VueDisplacementSlideshow,
        },
        computed: {
            images() {
                return [
                    require("../assets/anterne.jpg"),
                    require("../assets/dolomites.jpg"),
                    require("../assets/glencoe.jpg")
                ];
            }
        },
        methods: {
            init() {
                //We loop through all our images by calling the 'next' method of our component every 2 seconds
                setInterval(() => {
                    this.$refs.slideshow.next();
                }, 3000);
            }
        },
        mounted() {
            this.init();
        }
};

</script>


<style>
.homeSlide {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
}
</style>