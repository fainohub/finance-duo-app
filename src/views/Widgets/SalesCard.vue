<template>
  <div>
      <stats-card title="Sales" type="gradient-green" :sub-title="sales" icon="ni ni-chart-bar-32"> </stats-card>
  </div>
</template>
<script>

    import StatsCard from '@/components/Cards/StatsCard';
  import SalesService from '../../services/sales.service';

  export default {
    name: 'sales-card',
      components: {
          StatsCard,
      },
    data() {
      return {
          sales: '0',
      };
    },
    mounted() {
        SalesService.total().then(response => {
            this.sales = '' + response.data.total.value;
        });
    }
  };
</script>
<style></style>
