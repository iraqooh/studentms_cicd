<template>
  <div class="container mt-5 d-flex flex-column align-items-center">
    <h2 class="heading">Students and Their Fees</h2>
    <div class="table-responsive w-100" v-if="students.length > 0">
      <div class="table-container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class</th>
              <th>Category</th>
              <th>School Fees (UGX)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td>{{ student.first_name }}</td>
              <td>{{ student.last_name }}</td>
              <td>{{ student.class }}</td>
              <td>{{ student.category }}</td>
              <td>{{ (student.school_fees ?? 0).toLocaleString('en-US') }}</td>
              <td>{{ student.status ? 'Active' : 'Inactive' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>No students available.</p>
    </div>
  </div>
</template>

  
<script>
  import ApiService from '../services/ApiService';
  
  export default {
    name: 'FeesComponent',
  
    data() {
      return {
        students: [],
      };
    },
  
    created() {
      this.fetchStudentDetails();
    },
  
    methods: {
      async fetchStudentDetails() {
        try {
          const response = await ApiService.getStudentFinancialDetails();
          this.students = response.data;
        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      }
    }
  };
</script>
  
<style scoped>
.heading {
  text-align: center;
  margin-bottom: 20px;
}

.table-responsive {
  margin-top: 20px;
}

.table-container {
  overflow-x: scroll;
}

.table thead th {
  background-color: #f8f9fa;
}

.table tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>

  