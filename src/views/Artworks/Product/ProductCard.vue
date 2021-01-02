<template>
  <div>

    <card class="text-center">
      <product-designer
        :art-source=artSource
        :print-file=product.printFile
        :template=product.template
        :product-type-id="product.id"
        ref="productRef"
      ></product-designer>
      <h2>{{ product.title }}</h2>
      <base-switch v-model="enabled"></base-switch>
    </card>

  </div>
</template>

<script>

import ProductDesigner from "../../../components/ProductDesigner/ProductDesigner";

export default {
  name: 'product-card',
  components: {ProductDesigner},
  props: {
    artSource: {
      type: String
    },
    product: {
      type: Object
    }
  },
  data() {
    return {
      enabled: true
    }
  },
  methods: {
    getProduct: function () {
      let product = this.$refs.productRef.getProduct();

      product.enabled = this.enabled;

      return product;
    }
  },
  mounted() {
  }
};
</script>
<style></style>
