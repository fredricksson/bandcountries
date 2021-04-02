<template>
  <div>
    <q-card class="my-card" flat bordered>
      <div class="col-12">
        <q-img :src="country.flag" style="height: 200px">
          <div class="absolute-top text-center text-subtitle1">
            {{country.name}}
          </div>
        </q-img>
      </div>
      <q-card-section >
        <div class="text-overline text-orange-9">{{country.region | isEmpty}}</div>
        <q-list>
        <q-item >
          <q-item-section avatar>
            <q-icon color="primary" name="flag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Capital</q-item-label>
            <q-item-label caption>{{country.capital | isEmpty}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="groups" />
          </q-item-section>

          <q-item-section>
            <q-item-label>População</q-item-label>
            <q-item-label caption>{{country.population | isEmpty}} </q-item-label>
          </q-item-section>
        </q-item>
          </q-list>
      </q-card-section>

      <q-card-actions style="background-color: black">
        <q-btn flat :loading="loading" @click="card = true" color="secondary" icon="info" label="Detalhes" />
        <q-space />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img :src="country.flag" style="width: 400px" />

        <q-card-section>
          <q-list>
        <q-item >
          <q-item-section avatar>
            <q-icon color="primary" name="flag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Nome nativo</q-item-label>
            <q-item-label caption>{{country.nativeName | isEmpty}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section avatar>
            <q-icon color="primary" name="flag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Sub-região</q-item-label>
            <q-item-label caption>{{country.subregion | isEmpty}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section avatar>
            <q-icon color="primary" name="flag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Aréa</q-item-label>
            <q-item-label caption>{{country.area | isEmpty}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section avatar>
            <q-icon color="primary" name="flag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Fuso horário</q-item-label>
            <q-item-label caption>{{country.timezones[0] | isEmpty}}</q-item-label>
          </q-item-section>
        </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Fechar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  // name: 'ComponentName',
  props: ['country'],
  data () {
    return {
      loading: false,
      card: false
    }
  },
  methods: {
    info () {
    }
  },
  filters: {
    isEmpty (value) {
      if (value === '' || value === 0) return 'Vazio'
      else return value
    }
  }
}
</script>
