<template>
  <div class="payments p-md-5">
    <div class="p-3" >
        <div class="d-flex justify-content-between align-items-center my-3">
            <h5 class="">Payments</h5>
            <router-link class="btn btn-primary ms-2" :to="{ name: 'add-payment' }">Add Payment</router-link>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Student Name</th>
                <th>Amount Paid</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in visiblePayments" :key="payment.payment_id">
                <td>{{ payment.payment_id }}</td>
                <td>{{ payment.student.first_name }} {{ payment.student.last_name }}</td>
                <td>UGX {{ payment.amount.toLocaleString() }}</td>
                <td>{{ new Date(payment.createdAt).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
      
          <button class="btn btn-secondary w-100 mt-3" @click="loadMorePayments">Load More</button>
      </div>
    </div>
  </div>
</template>


<script>
  import ApiService from '../services/ApiService';

export default {
  name: 'PaymentsComponent',
  data() {
    return {
      payments: [],
      visiblePayments: [],
      itemsToLoad: 20,
      index: 0
    };
  },
  methods: {
    fetchPayments() {
      ApiService.getPaymentDetails().then(response => {
        this.payments = response.data;
        if (this.payments.length > 0) this.visiblePayments = this.payments.slice(0, this.itemsToLoad);
        console.log(this.visiblePayments[0]);
      }).catch(error => {
        console.error(error);
      });
    },
    loadMorePayments() {
      this.itemsToLoad += 20;
      this.visiblePayments = this.payments.slice(0, this.itemsToLoad);
    }
  },
  created() {
    this.fetchPayments();
    // document.title = 'Payments'
  }
};
</script>


<style scoped>
  .payments {
    width: 70%;
    margin-left: 15%;
  }
  @media screen and (max-width: 768px) {
    .payments {
      width: 100%;
      margin-left: auto;
    }
  }
</style>
