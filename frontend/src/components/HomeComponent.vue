<template>
  <div class="home">
    <!-- Analytics Banner -->
    <div class="analytics-banner p-3">
      <div class="g-3 row row-cols-lg-6 row-cols-md-2 row-cols-1 d-flex justify-content-center">
        <div class="col" v-for="item in analyticsItems" :key="item.title">
          <div class="card h-100">
            <div :class="['card-body text-center rounded', item.bgColor]">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.value }}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body text-center rounded">
              <h5 class="card-title">Percentage Paid</h5>
              <div class="d-flex justify-content-center">
                <svg width="60" height="60">
                  <circle cx="30" cy="30" r="25" stroke="lightgray" stroke-width="5" fill="none"></circle>
                  <circle cx="30" cy="30" r="25" :stroke="percentagePaidColor" 
                      stroke-width="5" fill="none" :stroke-dasharray="analytics.percentagePaid + ' 100'" stroke-dashoffset="25" transform="rotate(-90, 30, 30)"></circle>
                  <text x="50%" y="50%" text-anchor="middle" dy=".3em">{{ analytics.percentagePaid.toFixed(0) }}%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search feature -->
    <SearchComponent @search="searchStudents" />

    <!-- Main Content -->
    <div class="main-content d-flex">
        <div class="biodata row w-100 mx-5">
            <!-- Students List -->
            <div class="col-md-4 p-3">
                <div class="d-flex justify-content-between align-items-center my-3">
                    <h5>Our Students</h5>
                    <router-link class="btn btn-primary" :to="{ name: 'add-student' }">Add Student</router-link>
                </div>
                <div class="items-list">
                    <ul class="list-group">
                    <li v-for="student in students" :key="student.student_id"
                    :class="['list-group-item', { 'bg-primary text-light': student.student_id === selectedStudent?.student_id }]"
                      @click="selectStudent(student)">
                        {{ student.first_name }} {{ student.last_name }}
                    </li>
                </ul>
                </div>
            </div>

            <!-- Student Biodata -->
            <div class="col-md-4 p-3 biodata" v-if="selectedStudent">
              <div class="m-3 d-flex justify-content-between align-items-center">
                  <h5>{{ selectedStudent.first_name }}'s Details</h5>
                  <router-link class="btn btn-primary" :to="{ name: 'edit-student', params: { id: selectedStudent.student_id} }">Edit {{ selectedStudent.first_name }}</router-link>
              </div>
                <div class="bg-light p-3 rounded">
                  <div class="d-flex justify-content-between">
                    <strong>Name</strong>
                    <p>{{ selectedStudent.first_name }} {{ selectedStudent.last_name }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Gender</strong>
                    <p> {{ selectedStudent.gender == 'F' ? 'Female' : 'Male' }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Date of Birth</strong>
                    <p> {{ selectedStudent.date_of_birth.split('T')[0] }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Address</strong>
                    <p> {{ selectedStudent.physical_address }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Category:</strong>
                    <p> {{ selectedStudent.category }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Status</strong>
                    <p> {{ selectedStudent.status ? 'Active' : 'Inactive' }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Class</strong>
                    <p> {{ selectedStudent.class }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Fees</strong>
                    <p> {{ `UGX ${selectedStudent.school_fees.toLocaleString('en-US')}` }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Total Payments:</strong>
                    <p> {{ `UGX ${selectedStudent.total_payments.toLocaleString('en-US')}` }}</p>
                  </div>
                </div>
                <button class="btn btn-link w-100 mt-4" @click="viewPayments(selectedStudent.payments)" :disabled="selectedStudent.total_payments == 0">View Payments</button>
            </div>

            <div class="col-md-4 mt-5 sculpture" v-else>
                <div class="position-relative mt-5">
                    <img src="../assets/biodata.jpeg" alt="sculpture_image" class="w-100 h-100 rounded-5"/>
                    <div class="position-absolute top-50 start-50 translate-middle text-center bg-dark rounded">
                        <h5 class="text-light">Select a student to view their bio-data</h5>
                    </div>
                </div>
            </div>

            <!-- Payments List -->
            <div class="col-md-4 p-3" v-if="viewingPayments">
                <h5 class="my-3">Payments</h5>
                <ul class="list-group items-list">
                    <li v-for="payment in payments" :key="payment.payment_id" class="list-group-item">
                      <div class="d-flex justify-content-between text-start">
                        <p> {{ payment.payment_id }} </p>
                        <p class="text-start"> UGX {{ payment.amount.toLocaleString('en-US') }} </p>
                        <p> {{ payment.createdAt.split('T')[0] }} </p>
                      </div>
                    </li>
                </ul>
                <div @click="goToPayment">
                  <router-link
                    :to="{ name: 'add-payment' }"
                    :class="{ 'disabled-link': isDisabled }"
                  >
                    <button
                      type="button"
                      class="btn btn-primary mt-3 w-100"
                      :disabled="isDisabled"
                    >
                      Make a Payment
                    </button>
                  </router-link>
                </div>
            </div>

            <div class="col-md-4 mt-5 sculpture" v-else>
                <div class="position-relative mt-5">
                    <img src="../assets/payments.jpeg" alt="hand_image" class="w-100 h-75 rounded-5"/>
                    <div class="position-absolute top-50 start-50 translate-middle text-center rounded bg-dark">
                        <h5 class="text-light">Click "View Payments" for more details</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import ApiService from '../services/ApiService';
import SearchComponent from './SearchComponent.vue';

export default {
  name: 'HomeComponent',
  components: {
    SearchComponent,
  },
  data() {
    return {
      analytics: {
        registeredStudentsCount: 0,
        totalExpectedFees: 0,
        totalPayments: 0,
        outstandingFees: 0,
        percentagePaid: 0,
      },
      students: [],
      selectedStudent: null,
      payments: [],
      viewingPayments: false,
      search_query: null,
      filter: 'first_name',
    };
  },
  computed: {
    percentagePaidColor() {
      return this.analytics.percentagePaid > 50 ? 'green' : 'red';
    },
    isSelected(student) {
      return this.selectedStudent === student;
    },
    isDisabled() {
      return this.selectedStudent?.total_payments === this.selectedStudent?.school_fees;
    },
    analyticsItems() {
      return [
        {
          title: 'Registered Students',
          value: this.analytics.registeredStudentsCount,
          bgColor: 'bg-success text-light',
        },
        {
          title: 'Expected Fees',
          value: `UGX ${this.analytics.totalExpectedFees.toLocaleString('en-US')}`,
          bgColor: 'bg-warning',
        },
        {
          title: 'Current Payments',
          value: `UGX ${this.analytics.totalPayments.toLocaleString('en-US')}`,
          bgColor: 'bg-danger text-light',
        },
        {
          title: 'Outstanding Fees',
          value: `UGX ${this.analytics.outstandingFees.toLocaleString('en-US')}`,
          bgColor: 'bg-primary text-light',
        },
      ];
    },
  },
  methods: {
    fetchAnalytics() {
      ApiService.getSchoolFinancials()
        .then((response) => {
          this.analytics = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchStudents() {
      ApiService.getStudentFinancialDetails()
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectStudent(student) {
      this.selectedStudent = student;
      this.viewingPayments = false;
    },
    viewPayments(payments) {
      this.payments = payments.slice(0, 15);
      this.viewingPayments = true;
    },
    goToPayment(event) {
      if (this.isDisabled) {
        event.preventDefault();
      }
    },
    addStudent() {
      this.$router.push({ name: 'add-student' });
    },
    searchStudents({ filter, searchQuery }) {
      const query = `?${filter}=${searchQuery}`;
      ApiService.getStudents(query)
        .then((response) => {
          if (response.data.length > 0) {
            this.students = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.fetchAnalytics();
    this.fetchStudents();
  },
};
</script>

<style scoped>
.analytics-banner .card {
  flex: 1;
  margin: 0 10px;
}

.analytics-banner {
  background: radial-gradient(rgb(162, 163, 177), rgb(159, 166, 205), whitesmoke);
}

.main-content {
  display: flex;
  justify-content: space-between;
}

.list-group-item:hover {
  background-color: dimgrey;
  color: whitesmoke;
}

.sculpture {
  z-index: 1;
}

.items-list {
  max-height: 450px;
  overflow-y: auto;
}

.btn-link:hover {
  border: 2px solid blue;
}

.disabled-link {
  pointer-events: none;
  cursor: not-allowed;
}
</style>

