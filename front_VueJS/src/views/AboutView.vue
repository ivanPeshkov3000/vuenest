<script setup lang="ts">
  import Intro from '@/components/Intro.vue'
  import SimpleCard from '@/components/SimpleCard.vue'
</script>

<template>
  <Intro>
    <template #links>
      <RouterLink to="/">На главную</RouterLink>
      <RouterLink to="/about">О проекте</RouterLink>
    </template>
    <template #main>
      <div class="about">
        <h1>Обо всем и обо мне</h1>
        <SimpleCard
          title="О проекте"
          content="Это учебный проект монорепозитория на NestJS и VueJS"
        />
        <SimpleCard
          title="Обо мне"
          content="Пассивно, но тем не менее, обучаюсь веб-технологиям. Для собственного саморазвития, да и вообще."
        />
      </div>
    </template>
  </Intro>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
