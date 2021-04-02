<template>
  <q-page class="container" padding>
    <div class="row q-gutter-y-md">
      <div class="col-12 ">
        <nav-bar @pesquisar="pesquisar" @exportExcel="exportExcel" @exportCsv="exportCsv" @exportXml="exportXml"/>
      </div>
      <div class="col-12">
        <q-card class="my-card ">
      <q-card-section>
        <div v-if="load">
          <div class="row q-gutter-md justify-center" v-if="lisCountries.length" >
            <card-country class="col-12 col-md-2  " :country="country"  v-for="(country, index) in lisCountries" :key="index"/>
          </div>
          <div v-else class="text-h6 text-center">Não encontrado</div>
        </div>
          <div v-else class="row  q-gutter-md q-pa-md justify-center">
          <div class="col-md-2 col-12"  v-for="i in 30" :key="i">
            <skeleton/>
          </div>
       </div>
       <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="current"
      :max="totalPage"
      @input="loadPage()"
    />
  </div>
        </q-card-section>
      </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import NavBar from 'src/components/NavBar.vue'
import CardCountry from 'src/components/CardCountry.vue'
import Skeleton from 'src/components/Skeleton.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { NavBar, CardCountry, Skeleton },
  mounted () {
    this.loadCountries()
  },
  data () {
    return {
      current: 1,
      load: false,
      text: '',
      region: 'Todas',
      totalPage: 0,
      init: 0,
      end: 50
    }
  },
  computed: {
    ...mapState('country', ['countries']),
    lisCountries () {
      // if state equals All it will retun all, else it will filter
      console.log('ddd')
      if (this.text === '' && this.region === 'Todas') {
        return this.countries.slice(this.init, this.end)
      } else if (this.text === '' && this.region !== 'Todas') {
        return this.countries.filter(country => country.region === this.region)
      } else if (this.text !== '' && this.region === 'Todas') {
        return this.countries.filter(country => country.name.includes(this.text))
      } else {
        return this.countries.filter(country => country.name.includes(this.text) && country.region === this.region)
      }
    }
  },
  methods: {
    ...mapActions('country', ['setCountries']),
    exportExcel () {
      var csvContent = ''
      var data = []
      this.countries.forEach((res) => {
        data.push({ name: res.name, capital: res.capital, region: res.region, population: res.population })
      })
      data.forEach((infoArray, index) => {
        let dataString = infoArray.name + '\t'
        dataString += infoArray.capital + '\t'
        dataString += infoArray.region + '\t'
        dataString += infoArray.population
        csvContent += index < this.countries.length ? dataString + '\n' : dataString
      })
      const url = URL.createObjectURL(new Blob([csvContent], {
        type: 'application/vnd.ms-excel'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'paises')
      document.body.appendChild(link)
      link.click()
    },
    exportCsv () {
      var csvContent = ''
      var data = []
      this.countries.forEach((res) => {
        data.push({ name: res.name, capital: res.capital, region: res.region, population: res.population })
      })
      data.forEach((infoArray, index) => {
        let dataString = infoArray.name + ','
        dataString += infoArray.capital + ','
        dataString += infoArray.region + ','
        dataString += infoArray.population
        csvContent += index < this.countries.length ? dataString + '\n' : dataString
      })
      const url = URL.createObjectURL(new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'paises.csv')
      document.body.appendChild(link)
      link.click()
    },
    exportXml () {
      var csvContent = ''
      var data = []
      this.countries.forEach((res) => {
        data.push({ name: res.name, capital: res.capital, region: res.region, population: res.population })
      })
      data.forEach((infoArray, index) => {
        let dataString = '<pais>' + '\n<nome> ' + infoArray.name + '</nome>\n'
        dataString += '<capital>' + infoArray.capital + '</capital>\n'
        dataString += '<regiao>' + infoArray.region + '</regiao>\n'
        dataString += '<populacao>' + infoArray.population + '</populacao>'
        csvContent += index < this.countries.length ? dataString + '\n' : dataString
      })
      const url = URL.createObjectURL(new Blob([csvContent], {
        type: 'text/plain'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'paises.xml')
      document.body.appendChild(link)
      link.click()
    },
    loadPage () {
      this.init = (this.current - 1) * 50
      this.end = (this.current) * 50
    },
    pesquisar (data) {
      this.region = data.region
      this.text = data.text
    },
    loadCountries () {
      this.setCountries().then((response) => {
        this.totalPage = Math.ceil(response.length / 50)
        this.load = true
        this.$q.notify({
          message: 'Veja informações de varíos países',
          color: 'primary',
          multiLine: true,
          icon: 'sentiment_satisfied_alt',
          actions: [
            { label: 'fechar', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
      }).catch((error) => {
        this.$q.loading.hide()
        console.log(error)
      })
    }
  }

}
</script>

<style>

</style>
