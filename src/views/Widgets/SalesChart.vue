<template>
  <div>
      <card type="white" header-classes="bg-transparent">
          <div slot="header" class="row align-items-center">
              <div class="col">
                  <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 class="h3 text-dark mb-0">Sales</h5>
              </div>
              <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                      <li class="nav-item mr-2 mr-md-0">
                          <!--  -->
                      </li>
                  </ul>
              </div>
          </div>

        <div class="container-fluid"
             v-if="showEmptyChart">
                <div class="text-center mt-5 mb-5">
                  <div class="row b-3">
                    <div class="col">
                      <h3 class="mb-4">Oops, you don't have sales yet...</h3>

                      <img src="img/sales/empty-state.png"
                           class="img-center img-empty-state"
                           alt="Oops, you have not added any artwork...">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <h2 class="mb-4">Upload more cool artworks to increase your chances of selling</h2>

                      <router-link to="/artworks/create">
                        <base-button icon type="secondary">
                          <span class="btn-inner--icon"><i class="ni ni-cloud-upload-96"></i></span>
                          <span class="btn-inner--text">Upload Artwork</span>
                        </base-button>
                      </router-link>
                    </div>
                  </div>
                </div>
        </div>

          <line-chart
              v-if="!showEmptyChart"
              :height="350"
              ref="bigChart"
              :chart-data="chart.chartData"
              :extra-options="chart.extraOptions"
          >
          </line-chart>
      </card>
  </div>
</template>
<script>

    // Charts
    import * as chartConfigs from '@/components/Charts/config';
    import LineChart from '@/components/Charts/LineChart';

  import SalesService from '../../services/sales.service';

  export default {
    name: 'sales-chart',
      components: {
          LineChart,
      },
    data() {
      return {
          showEmptyChart: true,
          chart: {
              chartData: {
                  datasets: [
                      {
                          label: 'Sales',
                          data: [],
                      }
                  ],
                  labels: [],
              },
              extraOptions: chartConfigs.blueChartOptions,
          }
      };
    },
    mounted() {
        SalesService.chart().then(response => {
            let sales = response.data.sales;

            let dataset = [];
            let labels = [];

            for (let i in sales) {
                dataset.push(sales[i].qty);
                labels.push(sales[i].date_formated);
            }

            this.chart.chartData = {
                datasets: [
                    {
                        label: 'Sales',
                        data: dataset
                    }
                ],
                labels: labels,
            };

            this.showEmptyChart = this.chart.chartData.datasets[0].data.length === 0
        });
    }
  };
</script>
<style></style>
