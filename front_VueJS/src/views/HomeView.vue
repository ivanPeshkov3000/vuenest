<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import Intro from '@/components/Intro.vue'
</script>

<template>
  <Intro>
    <template #links>
      <RouterLink to="/">На главную</RouterLink>
      <RouterLink to="/about">О проекте</RouterLink>
    </template>
    <template #main>
      <main>
        <TheWelcome />
      </main>
    </template>
  </Intro>
</template>
