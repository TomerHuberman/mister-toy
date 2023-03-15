
<script lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { util } from 'chai';
import { utilService } from '../services/util.service.js';

Chart.register(...registerables);

export default {
    name: 'dash',
    components: { DoughnutChart },
    data() {
        return {
        }
    },
    created() {

    },
    methods: {
        getToysByLabel(label) {
            return this.toys.filter(toy => toy.labels.includes(label));
        }
    },
    computed: {
        toys() {
            return this.$store.getters.toysToDisplay;
        },
        labels() {
            return this.$store.getters.labels;
        },
        getDataAvgPrice() {
            const data = this.labels.map(label => {

                // Getting an array of toys with that label
                const filteredToys = this.getToysByLabel(label);

                // returning the average price for that label 
                return filteredToys.reduce(
                    (avgPrice, toy) => avgPrice + toy.price / filteredToys.length,
                    0
                );
            });
            const backgroundColor = this.labels.map(() => utilService.getRandomColor())
            console.log("backgroundColor: ", backgroundColor);
            return {
                labels: this.labels,
                datasets: [
                    {
                        borderRadius: 6,
                        data,
                        backgroundColor
                    }
                ]
            };
        },
    },
}
</script>

<template>
    <DoughnutChart :chartData="getDataAvgPrice" />
</template>
  