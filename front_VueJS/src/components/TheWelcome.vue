<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Переводы документаций</template>

    <a href="/docs/nestjs">Документация NestJS</a><br />
    <a href="/docs/nestjs">Документация VueJS</a>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Инструментарий</template>

    <p>Гайды по использованию инструментов обязательно будут <a href="/tools">тут</a></p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Consensus</template>

    Это система голосования и принятия решений. <br />
    <sup>В глубокой разработке</sup>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Не с кем поговорить? Ничего, ты привыкнешь ;)
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support</template>

    По всем вопросам обращайтесь, вращайтесь, кружитесь!
  </WelcomeItem>
</template>
