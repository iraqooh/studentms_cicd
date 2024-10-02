<template>
  <div class="container mt-5">
    <h2 class="h2 text-center">Add Payment</h2>
    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      <div class="d-flex justify-content-evenly">
        <strong>Success!</strong> {{ successMessage }}
        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show d-flex justify-content-around" role="alert">
      <div>
        <strong>Error!</strong> {{ `\t${errorMessage}` }}
        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="mt-4">
      <form @submit.prevent="addPayment" class="form-container">
        <div class="form-group">
          <label for="student_id">Student ID</label>
          <input type="number" id="student_id" @input="getBalance" v-model="payment.student_id" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="amount">Amount to be Paid</label>
          <input type="number" id="amount" v-model="payment.amount" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100 my-3">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
  import ApiService from '../services/ApiService';
  
  export default {
    name: 'AddPayment',
    data() {
      return {
        payment: {
          student_id: 0,
          amount: 0
        },
        outstanding_fees: 0,
        successMessage: '',
        errorMessage: '',
        notFound: false
      };
    },
    methods: {
      getBalance() {
        if (this.payment.student_id == 0) this.payment.amount = 0
        ApiService.getStudentFinancialDetails()
          .then(response => {
            const data = response.data;
            const student = data.find(item => item.student_id === this.payment.student_id)
            if (student) {
                this.payment.amount = student.outstanding_fees;
                this.outstanding_fees = student.outstanding_fees;
                this.notFound = false;
            } else {
                this.notFound = true;
            }
          })
          .catch(error => {
            console.error('Error fetching student details:', error);
            this.errorMessage = 'Failed to fetch student details';
          });
      },

      addPayment() {

        if (this.notFound) {
            this.errorMessage = `Student not found`;
            return;
        }

        if (this.payment.amount > this.outstanding_fees) {
          this.errorMessage = `Amount exceeds outstanding fees of UGX ${this.outstanding_fees.toLocaleString('en-US')}`;
          return;
        }
  
        ApiService.makePayment(this.payment)
          .then(response => {
            if (response.data) {
                this.successMessage = 'Payment added successfully';
                this.clearForm();
            }
          })
          .catch(error => {
            console.error('Error adding payment:', error);
            this.errorMessage = 'Failed to add payment';
          });
      },
      clearForm() {
        this.payment.student_id = '';
        this.payment.amount = 0;
        this.payment.amount = 0;
        this.errorMessage = '';
      }
    },
    watch: {
      'payment.student_id': function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getBalance();
        }
      }
    }
  };

</script>
  
<style scoped>
    .form-group {
      margin-bottom: 16px;
    }
  
    .container {
      min-height: 400px;
    }

    .form-container {
      width: 100%;
    }

    @media (min-width: 768px) {
      .form-container {
        width: 50%;
        margin: 0 auto;
      }
    }
</style>

