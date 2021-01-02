<template>
  <div>
    <h2>Products</h2>

    <div class="form-row">
      <div v-for="product in products" v-bind:key="product.id" class="col-md-4">
        <product-card
          :art-source=artSource
          :product=product
          ref="productsRef"
        ></product-card>
      </div>
    </div>

  </div>
</template>

<script>
import ProductCard from "./ProductCard";

export default {
  name: 'product-grid',
  components: {ProductCard},
  props: {
    artSource: {
      type: String
    },
    products: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    getProducts: function () {
      let productList = [];

      this.$refs.productsRef.forEach((product) => {
        let productData = product.getProduct();

        if (productData.enabled) {
          productList.push(productData);
        }
      });

      return productList;
    }
  },
  mounted() {
  }
};
</script>
<style></style>
