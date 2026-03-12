// API Testing Guide for Dental Clinic Management System
// Run these in your browser console or use a tool like Postman/Thunder Client

// ==========================================
// BASE URL (when running locally)
// ==========================================
const BASE_URL = "http://localhost:3000/api";

// ==========================================
// 1. TEST ADMIN REGISTRATION
// ==========================================
async function testRegisterAdmin() {
  const response = await fetch(`${BASE_URL}/admin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@dentalclinic.com",
      password: "admin123",
      first_name: "Admin",
      last_name: "User",
      phone: "03001234567",
      role: "admin",
    }),
  });
  const data = await response.json();
  console.log("Register Admin:", data);
  return data;
}

// ==========================================
// 2. TEST ADMIN LOGIN
// ==========================================
async function testLoginAdmin() {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: "admin@dentalclinic.com",
      password: "admin123",
    }),
  });
  const data = await response.json();
  console.log("Login Admin:", data);
  return data;
}

// ==========================================
// 3. TEST CREATE PATIENT
// ==========================================
async function testCreatePatient() {
  const response = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@email.com",
      phone: "03001234567",
      date_of_birth: "1990-05-15",
      address: "123 Main Street, Lahore",
      medical_history: "No known allergies",
    }),
  });
  const data = await response.json();
  console.log("Create Patient:", data);
  return data;
}

// ==========================================
// 4. TEST GET ALL PATIENTS
// ==========================================
async function testGetPatients() {
  const response = await fetch(`${BASE_URL}/patients`);
  const data = await response.json();
  console.log("All Patients:", data);
  return data;
}

// ==========================================
// 5. TEST SEARCH PATIENTS
// ==========================================
async function testSearchPatients(query) {
  const response = await fetch(`${BASE_URL}/patients/search?q=${query}`);
  const data = await response.json();
  console.log("Search Results:", data);
  return data;
}

// ==========================================
// 6. TEST CREATE DENTIST
// ==========================================
async function testCreateDentist() {
  const response = await fetch(`${BASE_URL}/dentists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Dr. Sarah Ahmed",
      specialization: "Orthodontics",
      experience_years: 10,
      qualifications: "BDS, MDS (Orthodontics)",
      bio: "Expert in braces and teeth alignment",
      email: "dr.sarah@dentalclinic.com",
      phone: "03009876543",
    }),
  });
  const data = await response.json();
  console.log("Create Dentist:", data);
  return data;
}

// ==========================================
// 7. TEST GET ALL DENTISTS
// ==========================================
async function testGetDentists() {
  const response = await fetch(`${BASE_URL}/dentists`);
  const data = await response.json();
  console.log("All Dentists:", data);
  return data;
}

// ==========================================
// 8. TEST CREATE SERVICE
// ==========================================
async function testCreateService() {
  const response = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_name: "Teeth Whitening",
      description: "Professional teeth whitening treatment",
      price: 30000,
      duration_minutes: 60,
      category: "Cosmetic",
    }),
  });
  const data = await response.json();
  console.log("Create Service:", data);
  return data;
}

// ==========================================
// 9. TEST CREATE APPOINTMENT
// ==========================================
async function testCreateAppointment(patientId, dentistId, serviceId) {
  const response = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patient_id: patientId,
      dentist_id: dentistId,
      service_id: serviceId,
      appointment_date: "2026-03-15",
      appointment_time: "10:00",
      status: "scheduled",
      notes: "First consultation",
    }),
  });
  const data = await response.json();
  console.log("Create Appointment:", data);
  return data;
}

// ==========================================
// 10. TEST UPDATE APPOINTMENT STATUS
// ==========================================
async function testUpdateAppointmentStatus(appointmentId, status) {
  const response = await fetch(
    `${BASE_URL}/appointments/${appointmentId}/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: status,
        reason: "Patient confirmed via phone",
      }),
    },
  );
  const data = await response.json();
  console.log("Update Status:", data);
  return data;
}

// ==========================================
// 11. TEST CREATE PAYMENT
// ==========================================
async function testCreatePayment(appointmentId, patientId) {
  const response = await fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      appointment_id: appointmentId,
      patient_id: patientId,
      amount: 30000,
      payment_method: "cash",
      payment_status: "completed",
      notes: "Full payment received",
    }),
  });
  const data = await response.json();
  console.log("Create Payment:", data);
  return data;
}

// ==========================================
// 12. TEST CREATE REVIEW
// ==========================================
async function testCreateReview(dentistId) {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dentist_id: dentistId,
      reviewer_name: "Happy Patient",
      reviewer_email: "patient@email.com",
      rating: 5,
      title: "Excellent Service",
      content:
        "Dr. Sarah was very professional and gentle. Highly recommended!",
    }),
  });
  const data = await response.json();
  console.log("Create Review:", data);
  return data;
}

// ==========================================
// 13. TEST DASHBOARD STATS
// ==========================================
async function testDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);
  const data = await response.json();
  console.log("Dashboard Stats:", data);
  return data;
}

// ==========================================
// 14. TEST TODAY'S APPOINTMENTS
// ==========================================
async function testTodayAppointments() {
  const response = await fetch(`${BASE_URL}/dashboard/today-appointments`);
  const data = await response.json();
  console.log("Today's Appointments:", data);
  return data;
}

// ==========================================
// RUN ALL TESTS
// ==========================================
async function runAllTests() {
  console.log("=== Starting API Tests ===\n");

  try {
    // 1. Register and Login Admin
    await testRegisterAdmin();
    await testLoginAdmin();

    // 2. Create Patient
    const patient = await testCreatePatient();

    // 3. Create Dentist
    const dentist = await testCreateDentist();

    // 4. Create Service
    const service = await testCreateService();

    // 5. Create Appointment (if we have IDs)
    if (patient?.id && dentist?.id && service?.id) {
      const appointment = await testCreateAppointment(
        patient.id,
        dentist.id,
        service.id,
      );

      // 6. Update status
      if (appointment?.id) {
        await testUpdateAppointmentStatus(appointment.id, "confirmed");

        // 7. Create payment
        await testCreatePayment(appointment.id, patient.id);
      }
    }

    // 8. Create review
    if (dentist?.id) {
      await testCreateReview(dentist.id);
    }

    // 9. Get dashboard stats
    await testDashboardStats();

    // 10. Get all data
    await testGetPatients();
    await testGetDentists();
    await testTodayAppointments();

    console.log("\n=== All Tests Completed ===");
  } catch (error) {
    console.error("Test Error:", error);
  }
}

// Export functions for use in browser console
if (typeof window !== "undefined") {
  window.apiTests = {
    runAllTests,
    testRegisterAdmin,
    testLoginAdmin,
    testCreatePatient,
    testGetPatients,
    testSearchPatients,
    testCreateDentist,
    testGetDentists,
    testCreateService,
    testCreateAppointment,
    testUpdateAppointmentStatus,
    testCreatePayment,
    testCreateReview,
    testDashboardStats,
    testTodayAppointments,
  };
  console.log("API Tests loaded! Run: apiTests.runAllTests()");
}

module.exports = {
  runAllTests,
  testRegisterAdmin,
  testLoginAdmin,
  testCreatePatient,
  testGetPatients,
  testCreateDentist,
  testCreateService,
  testDashboardStats,
};
