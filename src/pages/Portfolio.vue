<template>
  <div class="page portfolio">
    <banner title="Portfolio" />
    <proficiencies-panel />
    <projects-panel />
  </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import ProficienciesPanel from '@/components/Portfolio/ProficienciesPanel';
  import ProjectsPanel from '@/components/Portfolio/ProjectsPanel';

  export default {
    name: 'portfolio',
    components: {
      Banner,
      ProficienciesPanel,
      ProjectsPanel,
    },
  };
</script>

<style lang="scss" scoped>
</style>
