<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h1 text-default d-inline-block mb-0">Balance</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="md" type="neutral" @click="modals.withdrawAlert = true">
            <i class="fas fa-hand-holding-usd"></i> Withdraw
          </base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-12">
  
          <!-- Card stats -->
          <div class="row">
            <div class="col-xl-4 col-md-4 col-sm-12">
              <balance-card></balance-card>
            </div>
          </div>
          
          <commissions-table></commissions-table>
        </div>
      </div>
    </div>

    <modal :show.sync="modals.withdrawAlert"
           gradient="warning"
           modal-classes="modal-info modal-dialog-centered">
      <h6 slot="header" class="modal-title" id="modal-title-notification">Your attention is required</h6>

      <div class="py-3 text-center">
        <i class="fas fa-hand-holding-usd fa-4x"></i>
        <br><br>
        <p>To withdraw your balance please send an email to
          <a href="mailto:contact@artishup.com" class="contact-link">contact@artishup.com</a>
          with your paypal email and desired amount. Thank you!</p>
      </div>

      <template slot="footer">
        <base-button type="white" @click="modals.withdrawAlert = false">Ok, Got it</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
  import CommissionsTable from "./CommissionsTable";
  import BalanceCard from "./../Widgets/BalanceCard";

  export default {
    name: 'BalanceIndex',
    components: {
      CommissionsTable,
      BalanceCard
    },
    data() {
      return {
        modals: {
          withdrawAlert: false
        }
      };
    }
  };
</script>

<style scoped>
  .starter-page {
    min-height: calc(100vh - 380px);
  }

  .contact-link {
    color: #ffffff;

    &:hover {
      text-decoration: none !important;
    }
  }
</style>
