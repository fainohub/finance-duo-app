<template>
  <div>
     <stats-card title="Balance" type="gradient-orange" :sub-title="balance" icon="ni ni-money-coins"> </stats-card>
  </div>
</template>

<script>

  import BalanceService from '../../services/balance.service';
  import StatsCard from '@/components/Cards/StatsCard';

  export default {
    name: 'BalanceCard',
    
    components: {
        StatsCard,
    },
    
    data() {
      return {
        balance: '$ 0.00',
      };
    },
    
    mounted() {
      BalanceService.getBalance().then(response => {
          this.balance = '$ ' + response.data.balance.value;
      });
    }
  };
</script>

<style></style>
