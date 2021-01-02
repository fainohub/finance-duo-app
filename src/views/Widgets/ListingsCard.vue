<template>
  <div>
      <stats-card title="Artworks" type="gradient-red" :sub-title="listings" icon="ni ni-shop"> </stats-card>
  </div>
</template>
<script>

  import StatsCard from '@/components/Cards/StatsCard';
  import ListingService from '../../services/listing.service';

  export default {
    name: 'ListingsCard',
    components: {
      StatsCard,
    },
    data() {
      return {
        listings: '0',
      };
    },
    mounted() {
      ListingService.total().then(response => {
          this.listings = '' + response.data.total.value;
      });
    }
  };
</script>
<style></style>
