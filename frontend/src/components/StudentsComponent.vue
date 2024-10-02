<template>
  <div class="container">
    <!-- Search feature -->
    <SearchComponent @search="handleSearch"/>

    <!-- Main content -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
      <div class="col card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5>All Students</h5>
            <router-link class="btn btn-primary" :to="{ name: 'add-student' }">Add Student</router-link>
        </div>
        <div class="card-body">
          <div v-if="visibleStudents.length > 0">
            <ul class="list-group students">
              <li v-for="(student, index) in visibleStudents" :key="index" class="list-group-item" @click="selectStudent(student)">
                {{ student.first_name }} {{ student.last_name }}
              </li>
            </ul>
            <button class="btn btn-secondary w-100 mt-3" @click="loadMoreStudents">Load More</button>
          </div>
          <div v-else>
            Loading......
          </div>
        </div>
      </div>
      <div v-if="!selectedStudent" class="col-md-6 col-lg-8">
        <img src="../assets/students.jpeg" alt="students" class="rounded-2 mx-2 w-100"/>
      </div>
      <div v-if="selectedStudent" class="col card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5>{{ selectedStudent.first_name }}'s Details</h5>
            <router-link class="btn btn-primary" :to="{ name: 'edit-student', params: { id: selectedStudent.student_id} }">Edit {{ selectedStudent.first_name }}</router-link>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{{ selectedStudent.first_name }}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{{ selectedStudent.last_name }}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{{ selectedStudent.date_of_birth.split('T')[0] }}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{{ selectedStudent.gender === 'F' ? 'Female' : 'Male'  }}</td>
              </tr>
              <tr>
                <th>Physical Address</th>
                <td>{{ selectedStudent.physical_address }}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{{ selectedStudent.category }}</td>
              </tr>
              <tr>
                <th>Class</th>
                <td>{{ selectedStudent.class }}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{{ selectedStudent.status ? 'Active' : 'Inactive' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="selectedStudent" class="col card">
        <div class="card-header">
          <h5 class="text-center">{{ selectedStudent.first_name }}'s Finances</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>Expected School Fees</th>
                <td>{{ `UGX ${selectedStudent.school_fees.toLocaleString('en-US')}` }}</td>
              </tr>
              <tr>
                <th>Amount Paid</th>
                <td>{{ `UGX ${selectedStudent.total_payments.toLocaleString('en-US')}` }}</td>
              </tr>
              <tr>
                <th>Amount Due</th>
                <td>{{ `UGX ${selectedStudent.outstanding_fees.toLocaleString('en-US')}` }}</td>
              </tr>
              <tr>
                <th>Payments</th>
                <td>
                  <ul>
                    <li v-for="payment in selectedStudent.payments" :key="payment.payment_id">
                      {{ `UGX ${payment.amount.toLocaleString('en-US')}` }} on {{ new Date(payment.createdAt).toLocaleDateString() }}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from './SearchComponent.vue';
import ApiService from '../services/ApiService';

export default {
  name: 'list-student',
  components: {
    SearchComponent
  },
  data() {
    return {
      students: [],
      selectedStudent: null,
      visibleStudents: [],
      itemsToLoad: 18,
    };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      try {
        const res = await ApiService.getStudents();
        if (Array.isArray(res.data)) {
          this.students = res.data;
          this.visibleStudents = this.students.slice(0, this.itemsToLoad);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('There was an error fetching the students data:', error);
        console.error('Error details:', error.response);
      }
    },
    async getStudentFinancialDetails(studentId) {
      try {
        const res = await ApiService.getStudentFinancialDetails(studentId);
        if (res.data) {
          this.selectedStudent = { ...this.selectedStudent, ...res.data };
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('There was an error fetching the student financial details:', error);
        console.error('Error details:', error.response);
      }
    },
    selectStudent(student) {
      this.selectedStudent = student;
      this.getStudentFinancialDetails(student.student_id); // Fetch financial details when a student is selected
    },
    
    async handleSearch({ filter, searchQuery }) {
      const query = `?${filter}=${searchQuery}`;
      try {
        const response = await ApiService.getStudents(query);
        if (response.data.length > 0) {
          this.students = response.data;
          this.visibleStudents = this.students.slice(0, this.itemsToLoad);
        } else {
          this.visibleStudents = [];
        }
      } catch (error) {
        console.error('There was an error searching for students:', error);
      }
    },

    loadMoreStudents() {
      this.itemsToLoad += 10;
      this.visibleStudents = this.students.slice(0, this.itemsToLoad);
    }
  }
};
</script>

<style>
.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: dimgrey;
  color: whitesmoke;
}

.container {
  width: 100%;
}

.students {
  max-height: 100%;
  overflow-y: scroll;
}

@media screen and (min-width: 768px) {
  .container {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
