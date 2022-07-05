<script setup lang="ts">
defineProps<{
  title: string;
  content: string;
}>();
</script>
<template>
  <div class="item">
    <h2>{{ title }}</h2>
    <div class="details">
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  margin-left: 1rem;
}

h2 {
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
