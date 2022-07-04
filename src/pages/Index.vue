<template>
  <q-page class="flex flex-center">
    <q-select
        filled
        label="Origem"
        style="width: 250px"
        behavior="menu"
        v-model="origem"
        :options="cidades"
        :display-value="origem.City"
        :option-value="origem.ICAO"
        class="q-pr-lg"
      >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.City }} - {{scope.opt.Name}}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

      <q-select
        filled
        label="Destino"
        style="width: 250px"
        behavior="menu"
        v-model="destino"
        :options="cidades"
        :display-value="destino.City"
        :option-value="destino.ICAO"
        class="q-pr-lg"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.City }} - {{scope.opt.Name}}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-btn label="Buscar"  type="submit" @click="getResult(this.cidades, origem['Airport ID'], destino['Airport ID'])" color="primary"/>

      

      <div class="q-mt-xl" v-show="flagMap == true">
        <leaflet :pontos="mapPoint" :latLang="points"></leaflet>
      </div>
      
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios'

import {data_flights, local_data} from '../services/dados'
import {dijkstra} from '../utils/dijkstra'

import Leaflet from '../components/Leaflet/Leaflet.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Leaflet
  },
    
  data () {
    return {
      info: [],
      aux: [],
      cidades: [],
      flights: [],
      voos: [],
      origem: ref(''),
      destino: ref(''),
      flag: '',
      res_voos: [],
      flagMap: false,
      center: { lat: -23.626692, lng: -46.655375 },
      mapPoint:[],
      points: []
      
    }
  },

  mounted () {
    axios.get(local_data).then(response => {
      this.info = response.data
      for (let index = 0; index < this.info.length; index++) {
        const Country = this.info[index].Country;
        const element = this.info[index]
        if(Country == 'Brazil') {
          this.aux.push(element)
        }
      }

      this.cidades = this.aux.sort(function(a,b) {
        return a.City < b.City ? -1 : a.City > b.City ? 1 : 0;
      })
    })
  },

  methods: {
    async getFlights(start, end)  {
      const res = await axios.get(`${data_flights}&dep_icao=${start}&arr_icao=${end}&limit=10`);
      this.res_voos = res.data
      console.log(res)
    },

    async getResult(airports, start, end) {
      const response = dijkstra(airports, start, end)
      this.flagMap = true
      console.log("Response***",response)

      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        console.log("Elemento:", element)
        const lst = []
         for (let j = 0; j < airports.length; j++) {
          if(element == airports[j]["Airport ID"]) {
            lst.push(parseInt(airports[j].Latitude))
            lst.push(parseInt(airports[j].Longitude))
            this.points.push(lst)
            const object = {pontos: lst, cidade: airports[j].City}
            this.mapPoint.push(object)
          }
         }
      }
      console.log(this.mapPoint)

    }
    
  }

})
</script>
