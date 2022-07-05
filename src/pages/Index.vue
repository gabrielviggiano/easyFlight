<template>
  <q-page class="flex flex-center">

    <div class="q-mt-sm" v-show="flagMap == false">
      <q-img src="../../public/easy_logo.jpg" class="q-mb-lg" style="height: 200px; max-width: 350px"></q-img>
      <q-select
          filled
          label="Origem"
          style="width: 300px"
          behavior="menu"
          v-model="origem"
          :options="cidades"
          :display-value="origem.City"
          :option-value="origem.ICAO"
          class="q-pb-lg"
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
          style="width: 300px"
          behavior="menu"
          v-model="destino"
          :options="cidades"
          :display-value="destino.City"
          :option-value="destino.ICAO"
          class="q-pb-lg"
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

      </div>
      <div class="q-mt-xl" v-show="flagMap == true">
        <leaflet :pontos="mapPoint" :latLang="points" :key="key"></leaflet>
      </div>

      <div class="q-mt-xl justify-center" v-show="flagMap == true">
        <h2 class="row justify-center">Passagens encontradas para os destinos</h2>
        <card-flight :voos="lst_voos"></card-flight>
        <q-btn label="Voltar" type="submit" class="q-mt-lg q-mb-xl" @click="back()" color="primary"/>
      </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios'

import {data_flights, local_data} from '../services/dados'
import {dijkstra} from '../utils/dijkstra'

import Leaflet from '../components/Leaflet/Leaflet.vue'
import CardFlight from '../components/Cards/cardFlight.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Leaflet,
    CardFlight
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
      points: [],
      key: 0,
      lst_voos: []

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
      return res
    },

    async getResult(airports, start, end) {
      const response = dijkstra(airports, start, end)
      this.flagMap = true
      console.log("Response***",response)

      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        const element2 = response[index+1]

        const lst = []
         for (let j = 0; j < airports.length; j++) {
          if(element == airports[j]["Airport ID"]) {
            lst.push(parseInt(airports[j].Latitude))
            lst.push(parseInt(airports[j].Longitude))
            //let voo = await this.getFlights(airports[j].ICAO, airports[j+1].ICAO)
            console.log("Aiport:", airports[j])
            //console.log("Voo*******",voo)
            this.points.push(lst)
            const object = {pontos: lst, cidade: airports[j].City, voo: airports[j]}
            this.mapPoint.push(object)

          }
         }
      }
      console.log(this.mapPoint)
      this.key++
      this.teste()
    },

    back() {
      this.flagMap = false;
    },

    async teste (airports) {
      for (let index = 0; index < this.mapPoint.length; index++) {
        const element = this.mapPoint[index].voo;
        const element2 = this.mapPoint[index+1].voo;
        const result = await this.getFlights(element.ICAO, element2.ICAO)
        console.log("ELEMENTO2", result)
        this.lst_voos.push(result.data.data)
      }
    }
  }

})
</script>
