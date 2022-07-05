<template>
  <div v-for="(i, index) in voos" :key="index" class="q-pt-lg q-mb-md ">
    <span><h5 class="row justify-center">Percurso {{index+1}}</h5></span>
    <div class="row q-gutter-md justify-center">
      <q-card class="my-card q-mt-md col-3" flat bordered v-for="(j, index) in i" :key="index">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="../../../public/icons/mundo.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Voo {{j.flight.number}}: {{j.departure.iata}} - {{j.arrival.iata}}</q-item-label>
            <q-item-label caption>
              <b>Companhia aérea: </b>{{j.airline.name}}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-separator vertical />

          <q-card-section class="col-8">
            <b>Saída</b> <br>
            Data do voo agendada: {{dateFormat(j.departure.scheduled)}} <br>
            Data do voo estimada: {{dateFormat(j.departure.estimated)}} <br>
            Terminal: {{j.departure.terminal}} <br>
            Portão: {{j.departure.gate}} <br>

            <b>Chegada</b> <br>
            Data do voo agendada: {{dateFormat(j.arrival.scheduled)}} <br>
            Data do voo estimada: {{dateFormat(j.arrival.estimated)}} <br>
            Terminal: {{j.arrival.terminal}} <br>
            Portão: {{j.arrival.gate}} <br>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CardFlight',
  props: {
    voos: {
      type: Array
    }
  },
  methods: {
    dateFormat(date) {
      return moment(date).format('DD/MM/YYYY, h:mm:ss a');
    }
  }
}
</script>
