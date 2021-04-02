<template>
  <div class="q-pa-md">
    <q-card >
      <q-skeleton height="200px" square />
    <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-actions align="left" class="q-gutter-md">
        <q-skeleton type="QRadio" />
        <q-skeleton type="QRadio" />
        <q-skeleton type="QRadio" />
      </q-card-actions>
    </q-card>
  </div>
</template>
