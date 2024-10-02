import apiClient from '../api/index'

class ApiService {

    // get school financial analytics
    getSchoolFinancials() {
        return apiClient.get('/financials')
    }

    // Get all students
    getStudents(query = '') {
        return apiClient.get(`/students${query}`);
    }

    // Fetch detailed student data
    getStudentFinancialDetails() {
        return apiClient.get('/students-details');
    }

    // Fetch detailed payment data
    getPaymentDetails() {
        return apiClient.get('/payments-details');
    }

    // add new student
    addStudent(data) {
        return apiClient.post('/students', data)
    }

    // update student
    updateStudent(id, data) {
        return apiClient.put(`/students/${id}`, data)
    }

    // delete student
    deleteStudent(id) {
        return apiClient.delete(`/students/${id}`)
    }

    // make a payment
    makePayment(data) {
        return apiClient.post('/payments', data)
    }
} 



export default new ApiService();
