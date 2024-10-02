<template>
    <div class="container mt-5">
      <!-- Progress Indicator -->
      <div v-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
        <div class="d-flex justify-content-evenly">
            <strong>Success!</strong> {{ successMessage }}
            <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        <div class="d-flex justify-content-evenly">
            <strong>Error!</strong> {{ errorMessage }}
            <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
      </div>

      <div v-if="!success & !notFound">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>Edit {{ student.first_name }}</h2>
            <button class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#deleteStudentModal">
            Delete {{ student.first_name }}
            </button>
        </div>
    
        <form @submit.prevent="updateStudent">
            <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" v-model="student.first_name" class="form-control" required />
            </div>
            <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" v-model="student.last_name" class="form-control" required />
            </div>
            <div class="form-group">
            <label>Gender</label>
            <div>
                <div class="form-check form-check-inline">
                <input type="radio" id="male" value="M" v-model="student.gender" class="form-check-input" />
                <label class="form-check-label" for="male">Male</label>
                </div>
                <div class="form-check form-check-inline">
                <input type="radio" id="female" value="F" v-model="student.gender" class="form-check-input" />
                <label class="form-check-label" for="female">Female</label>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label for="date_of_birth">Date of Birth</label>
            <input type="date" id="date_of_birth" v-model="student.date_of_birth" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="physical_address">Parent's Contact</label>
                <input type="text" id="parents_contact" v-model="student.parents_contact" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="physical_address">Physical Address</label>
                <input type="text" id="physical_address" v-model="student.physical_address" class="form-control" required />
            </div>
            <div class="form-group">
            <label>Category</label>
            <div>
                <div class="form-check form-check-inline">
                <input type="radio" id="day" value="Day" v-model="student.category" class="form-check-input" />
                <label class="form-check-label" for="day">Day</label>
                </div>
                <div class="form-check form-check-inline">
                <input type="radio" id="boarding" value="Boarding" v-model="student.category" class="form-check-input" />
                <label class="form-check-label" for="boarding">Boarding</label>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label>Status</label>
            <div>
                <div class="form-check form-check-inline">
                <input type="radio" id="active" value="true" v-model="student.status" class="form-check-input" />
                <label class="form-check-label" for="active">Active</label>
                </div>
                <div class="form-check form-check-inline">
                <input type="radio" id="inactive" value="false" v-model="student.status" class="form-check-input" />
                <label class="form-check-label" for="inactive">Inactive</label>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label for="class">Class</label>
            <input type="text" id="class" v-model="student.class" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 my-3">Update Student</button>
        </form>
      </div>
      
  
    <!-- Modal -->
    <div class="modal fade" id="deleteStudentModal" tabindex="-1" aria-labelledby="deleteStudentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you sure you want to delete {{ student.first_name }}?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="isLoading" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click="confirmDelete">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import ApiService from '../services/ApiService';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'EditStudent',
    data() {
      return {
        student: {
          student_id: '',
          first_name: '',
          last_name: '',
          gender: 'M',
          date_of_birth: '',
          parents_contact: '',
          physical_address: '',
          category: 'Day',
          status: false,
          class: ''
        },
        notFound: true,
        successMessage: '',
        isLoading: false,
        errorMessage: ''
      };
    },
    methods: {
      fetchStudentDetails() {
        this.isLoading = true;
        const query = `?id=${this.$route.params.id}`;

        ApiService.getStudents(query).then(response => {
          if (Request.status == 404) {
            this.isLoading = false;
            this.notFound = true;
          } else {
            this.notFound = false;
            this.student = {
                student_id: response.data[0].student_id,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                gender: response.data[0].gender,
                date_of_birth: response.data[0].date_of_birth.substring(0, 10),
                parents_contact: response.data[0].parents_contact,
                physical_address: response.data[0].physical_address,
                category: response.data[0].category,
                status: response.data[0].status,
                class: response.data[0].class
            };
            this.isLoading = false;
          }
        }).catch(error => {
          console.error(error);
          this.errorMessage = error.message;
          this.isLoading = false;
        });
      },

      updateStudent() {
        const data = { ...this.student };
        delete data.student_id;
        ApiService.updateStudent(this.student.student_id, 
            data).then(response => {
            this.successMessage = 'Student biodata updated successfully';
            this.student = response.data;
            let dob = response.data.date_of_birth.substring(0, 10);
            this.student.date_of_birth = dob;
            this.fetchStudentDetails();
        }).catch(error => {
            console.error(error.response.data.error);
            this.errorMessage = error.response.data.error || error;
            this.isLoading = false;
        });
      },

      confirmDelete() {
        this.isLoading = true;
        ApiService.deleteStudent(this.student.student_id).then(response => {
          if (response.status === 204) {
            this.success = true;
            this.successMessage = 'Student deleted successfully';
            const modal = Modal.getInstance(document.getElementById('deleteStudentModal'));
            modal.hide();
            this.isLoading = false;
          }
        }).catch(error => {
          console.log(error);
          this.isLoading = false;
          this.errorMessage = 'Failed to delete student';
        });
      }
    },

    created() {
      this.fetchStudentDetails();
    }
  };

</script>
  
<style scoped>
  .form-group {
    margin-bottom: 16px;
  }
  .container {
    width: 50%;
  }
  @media screen and (max-width: 768px) {
    .container {
      width: 100%;
    }
  }
  .progress-indicator {
    display: inline-block;
    margin-left: 10px;
  }
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>