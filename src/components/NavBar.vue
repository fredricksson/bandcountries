<template>
 <div >
   <div class="q-gutter-md q-mb-md ">
     <q-card class="my-card bg-grey-3">
      <q-card-section class="row q-gutter-md justify-center">
        <div class="col-12 col-md-2 col-sm-12">
       <q-btn color="teal" class="full-width " @click="show(true)">
      <q-icon left size="3.4em" name="file_upload" />
      <div>Exportar</div>
    </q-btn>
     </div>
     <div class="col-12 col-md-6 col-sm-12 ">
        <q-input filled   bottom-slots v-model="text" label="pesquisar" counter maxlength="24" @input="search()" :dense="dense" @keyup.enter="pesquisar">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" @click="pesquisar" />
        </template>

        <template v-slot:hint>
          pesquisar por name, capital
        </template>
      </q-input>
     </div>
     <div class="col-12 col-md-3  col-sm-12">
       <q-select color="secondary" @input="seachByRegion" outlined v-model="region" :options="options" label="Região"/>
     </div>
      </q-card-section>
    </q-card>
   </div>
  </div>
</template>

<script>
import JsonExcel from 'vue-json-excel'
export default {
  components: [JsonExcel],
  data () {
    return {
      text: '',
      region: 'Todas',
      dense: false,
      options: ['Todas', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
    }
  },
  methods: {
    pesquisar () {
      this.$emit('pesquisar', { text: this.text, region: this.region })
    },
    search () {
      if (this.text === '' || this.text === ' ') this.pesquisar()
    },
    seachByRegion () {
      this.$emit('pesquisar', { text: this.text, region: this.region })
    },
    show (grid) {
      this.$q.bottomSheet({
        message: 'Exportar para',
        dark: true,
        grid,
        actions: [
          {
            label: 'XLS',
            img: 'https://firebasestorage.googleapis.com/v0/b/bandbook-fc051.appspot.com/o/xls.jpg?alt=media&token=12626c2d-dac1-405e-850b-fe61efe1f32c',
            id: 'xls'
          },
          {
            label: 'CSV',
            img: 'https://firebasestorage.googleapis.com/v0/b/bandbook-fc051.appspot.com/o/transferir.jpg?alt=media&token=6d01c1c8-ceb4-420b-8300-9eb27397ff1f',
            id: 'csv'
          },
          {
            label: 'XML',
            img: 'https://firebasestorage.googleapis.com/v0/b/bandbook-fc051.appspot.com/o/xml.png?alt=media&token=836d9aea-6ac7-4844-91cd-7804b7726b3c',
            id: 'xml'
          },
          {}
        ]
      }).onOk(action => {
        // console.log('Action chosen:', action.id)
        if (action.id === 'xls') {
          this.$emit('exportExcel')
        } else if (action.id === 'csv') {
          this.$emit('exportCsv')
        } else {
          this.$emit('exportXml')
        }
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style>

</style>
