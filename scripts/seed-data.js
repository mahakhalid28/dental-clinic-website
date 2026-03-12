// Seed Script - Run this to add test data
// Usage: node scripts/seed-data.js

const BASE_URL = "http://localhost:3001";

async function seedData() {
  console.log("🌱 Starting database seeding...\n");

  try {
    // 1. Add Patients (matches actual table structure with 'name' column)
    console.log("📋 Adding patients...");
    const patients = [
      {
        name: "Ali Khan",
        email: "ali.khan@email.com",
        phone: "0300-1234567",
        date_of_birth: "1990-05-15",
        address: "House 123, Gulberg, Lahore",
        gender: "male",
        city: "Lahore",
        emergency_phone: "0300-7654321",
        blood_group: "A+",
        allergies: "None",
        current_medications: "None",
        history_diabetes: false,
        history_heart: false,
        history_hypertension: false,
        history_bleeding: false,
        history_smoker: false,
        history_pregnant: false,
        is_active: true,
      },
      {
        name: "Fatima Ahmed",
        email: "fatima.ahmed@email.com",
        phone: "0321-9876543",
        date_of_birth: "1985-08-22",
        address: "Apt 45, DHA Phase 5, Karachi",
        gender: "female",
        city: "Karachi",
        emergency_phone: "0321-3456789",
        blood_group: "B+",
        allergies: "Penicillin",
        current_medications: "Metformin",
        history_diabetes: true,
        history_heart: false,
        history_hypertension: false,
        history_bleeding: false,
        history_smoker: false,
        history_pregnant: false,
        is_active: true,
      },
      {
        name: "Hassan Malik",
        email: "hassan.malik@email.com",
        phone: "0333-4567890",
        date_of_birth: "1995-12-10",
        address: "Street 7, F-10, Islamabad",
        gender: "male",
        city: "Islamabad",
        emergency_phone: "0333-0987654",
        blood_group: "O+",
        allergies: "None",
        current_medications: "None",
        history_diabetes: false,
        history_heart: false,
        history_hypertension: false,
        history_bleeding: false,
        history_smoker: true,
        history_pregnant: false,
        is_active: true,
      },
      {
        name: "Ayesha Siddiqui",
        email: "ayesha.s@email.com",
        phone: "0312-5678901",
        date_of_birth: "1992-03-28",
        address: "Block C, Model Town, Lahore",
        gender: "female",
        city: "Lahore",
        emergency_phone: "0312-1098765",
        blood_group: "AB+",
        allergies: "Latex, Aspirin",
        current_medications: "None",
        history_diabetes: false,
        history_heart: false,
        history_hypertension: false,
        history_bleeding: true,
        history_smoker: false,
        history_pregnant: false,
        is_active: true,
      },
      {
        name: "Usman Raza",
        email: "usman.raza@email.com",
        phone: "0345-6789012",
        date_of_birth: "1988-07-05",
        address: "Sector G-9, Islamabad",
        gender: "male",
        city: "Islamabad",
        emergency_phone: "0345-2109876",
        blood_group: "B-",
        allergies: "None",
        current_medications: "Lisinopril",
        history_diabetes: false,
        history_heart: true,
        history_hypertension: true,
        history_bleeding: false,
        history_smoker: false,
        history_pregnant: false,
        is_active: true,
      },
    ];

    const createdPatients = [];
    for (const patient of patients) {
      const res = await fetch(`${BASE_URL}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });
      if (res.ok) {
        const data = await res.json();
        createdPatients.push(data);
        console.log(`  ✅ Added patient: ${patient.name}`);
      } else {
        console.log(`  ❌ Failed to add patient: ${patient.name}`);
      }
    }

    // 2. Add Dentists
    console.log("\n👨‍⚕️ Adding dentists...");
    const dentists = [
      {
        name: "Dr. Sarah Ahmed",
        specialization: "Orthodontist",
        qualifications: "BDS, MDS (Orthodontics)",
        experience_years: 12,
        phone: "0300-1111111",
        email: "dr.sarah@dentalease.com",
        bio: "Specialist in braces and teeth alignment with 12 years of experience.",
      },
      {
        name: "Dr. Ahmed Hassan",
        specialization: "Endodontist",
        qualifications: "BDS, MDS (Endodontics)",
        experience_years: 15,
        phone: "0300-2222222",
        email: "dr.ahmed@dentalease.com",
        bio: "Expert in root canal treatments and dental surgeries.",
      },
      {
        name: "Dr. Zainab Ali",
        specialization: "Pediatric Dentist",
        qualifications: "BDS, MDS (Pediatric)",
        experience_years: 8,
        phone: "0300-3333333",
        email: "dr.zainab@dentalease.com",
        bio: "Specialized in children dental care with a gentle approach.",
      },
      {
        name: "Dr. Bilal Sheikh",
        specialization: "Prosthodontist",
        qualifications: "BDS, MDS (Prosthodontics)",
        experience_years: 10,
        phone: "0300-4444444",
        email: "dr.bilal@dentalease.com",
        bio: "Expert in dental implants, crowns, and bridges.",
      },
    ];

    const createdDentists = [];
    for (const dentist of dentists) {
      const res = await fetch(`${BASE_URL}/api/dentists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dentist),
      });
      if (res.ok) {
        const data = await res.json();
        createdDentists.push(data);
        console.log(`  ✅ Added dentist: ${dentist.name}`);
      } else {
        console.log(`  ❌ Failed to add dentist: ${dentist.name}`);
      }
    }

    // 3. Add Services
    console.log("\n🦷 Adding services...");
    const services = [
      {
        service_name: "Teeth Cleaning",
        description:
          "Professional teeth cleaning and polishing to remove plaque and tartar buildup.",
        price: 3000,
        duration_minutes: 30,
        category: "Preventive Care",
      },
      {
        service_name: "Teeth Whitening",
        description:
          "Advanced whitening treatment for a brighter, whiter smile.",
        price: 15000,
        duration_minutes: 60,
        category: "Cosmetic",
      },
      {
        service_name: "Root Canal Treatment",
        description:
          "Treatment to repair and save a badly damaged or infected tooth.",
        price: 25000,
        duration_minutes: 90,
        category: "Restorative",
      },
      {
        service_name: "Dental Implant",
        description:
          "Permanent tooth replacement with titanium implant and crown.",
        price: 80000,
        duration_minutes: 120,
        category: "Restorative",
      },
      {
        service_name: "Braces Installation",
        description: "Metal or ceramic braces for teeth alignment.",
        price: 60000,
        duration_minutes: 60,
        category: "Orthodontics",
      },
      {
        service_name: "Tooth Extraction",
        description: "Safe and painless tooth removal procedure.",
        price: 5000,
        duration_minutes: 45,
        category: "Oral Surgery",
      },
      {
        service_name: "Dental Filling",
        description: "Composite or amalgam filling for cavities.",
        price: 4000,
        duration_minutes: 30,
        category: "Restorative",
      },
      {
        service_name: "Crown & Bridge",
        description: "Custom dental crowns and bridges for damaged teeth.",
        price: 35000,
        duration_minutes: 60,
        category: "Prosthodontics",
      },
    ];

    const createdServices = [];
    for (const service of services) {
      const res = await fetch(`${BASE_URL}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      if (res.ok) {
        const data = await res.json();
        createdServices.push(data);
        console.log(
          `  ✅ Added service: ${service.service_name} - PKR ${service.price}`,
        );
      } else {
        console.log(`  ❌ Failed to add service: ${service.service_name}`);
      }
    }

    // 4. Add Appointments (need patient, dentist, service IDs)
    console.log("\n📅 Adding appointments...");
    if (
      createdPatients.length > 0 &&
      createdDentists.length > 0 &&
      createdServices.length > 0
    ) {
      const today = new Date();
      const appointments = [
        {
          patient_id: createdPatients[0]?.id,
          dentist_id: createdDentists[0]?.id,
          service_id: createdServices[0]?.id,
          appointment_date: formatDate(addDays(today, 1)),
          appointment_time: "10:00",
          status: "scheduled",
          notes: "Regular checkup",
        },
        {
          patient_id: createdPatients[1]?.id,
          dentist_id: createdDentists[1]?.id,
          service_id: createdServices[2]?.id,
          appointment_date: formatDate(addDays(today, 2)),
          appointment_time: "14:00",
          status: "scheduled",
          notes: "Root canal - first visit",
        },
        {
          patient_id: createdPatients[2]?.id,
          dentist_id: createdDentists[2]?.id,
          service_id: createdServices[0]?.id,
          appointment_date: formatDate(addDays(today, -1)),
          appointment_time: "11:00",
          status: "completed",
          notes: "Cleaning done successfully",
        },
        {
          patient_id: createdPatients[3]?.id,
          dentist_id: createdDentists[0]?.id,
          service_id: createdServices[4]?.id,
          appointment_date: formatDate(addDays(today, 3)),
          appointment_time: "09:00",
          status: "scheduled",
          notes: "Braces consultation",
        },
        {
          patient_id: createdPatients[4]?.id,
          dentist_id: createdDentists[3]?.id,
          service_id: createdServices[3]?.id,
          appointment_date: formatDate(addDays(today, -3)),
          appointment_time: "15:00",
          status: "completed",
          notes: "Implant surgery completed",
        },
      ];

      const createdAppointments = [];
      for (const appt of appointments) {
        if (appt.patient_id && appt.dentist_id && appt.service_id) {
          const res = await fetch(`${BASE_URL}/api/appointments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appt),
          });
          if (res.ok) {
            const data = await res.json();
            createdAppointments.push(data);
            console.log(
              `  ✅ Added appointment: ${appt.appointment_date} at ${appt.appointment_time}`,
            );
          } else {
            console.log(`  ❌ Failed to add appointment`);
          }
        }
      }

      // 5. Add Payments for completed appointments
      console.log("\n💳 Adding payments...");
      const completedAppointments = createdAppointments.filter(
        (a) => a.status === "completed",
      );
      for (let i = 0; i < completedAppointments.length; i++) {
        const appt = completedAppointments[i];
        const service = createdServices.find((s) => s.id === appt.service_id);
        const payment = {
          appointment_id: appt.id,
          patient_id: appt.patient_id,
          amount: service?.price || 5000,
          payment_method: i % 2 === 0 ? "cash" : "card",
          payment_status: "completed",
          invoice_number: `INV-2026-${String(i + 1).padStart(4, "0")}`,
          notes: "Payment received",
        };

        const res = await fetch(`${BASE_URL}/api/payments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payment),
        });
        if (res.ok) {
          console.log(
            `  ✅ Added payment: ${payment.invoice_number} - PKR ${payment.amount}`,
          );
        }
      }

      // Add some pending payments
      const pendingPayment = {
        patient_id: createdPatients[0]?.id,
        amount: 15000,
        payment_method: "card",
        payment_status: "pending",
        invoice_number: "INV-2026-0010",
        notes: "Pending whitening treatment",
      };
      await fetch(`${BASE_URL}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingPayment),
      });
      console.log(`  ✅ Added pending payment: INV-2026-0010`);
    }

    // 6. Add Contact Messages
    console.log("\n📧 Adding contact messages...");
    const messages = [
      {
        name: "Muhammad Tariq",
        email: "tariq@email.com",
        phone: "0300-5555555",
        subject: "Appointment Inquiry",
        message:
          "Hi, I would like to know about teeth whitening procedure and its cost. Please contact me.",
        status: "unread",
      },
      {
        name: "Sana Fatima",
        email: "sana.f@email.com",
        phone: "0321-6666666",
        subject: "Emergency Consultation",
        message:
          "I have severe tooth pain. Is there any emergency slot available today?",
        status: "read",
      },
      {
        name: "Imran Shah",
        email: "imran.shah@email.com",
        phone: "0333-7777777",
        subject: "Braces for Child",
        message:
          "My 12 year old needs braces. What is the right age and procedure for this?",
        status: "replied",
      },
    ];

    for (const msg of messages) {
      const res = await fetch(`${BASE_URL}/api/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
      if (res.ok) {
        console.log(`  ✅ Added message from: ${msg.name}`);
      }
    }

    // 7. Add Reviews
    console.log("\n⭐ Adding reviews...");
    const reviews = [
      {
        reviewer_name: "Ali Khan",
        reviewer_email: "ali.khan@email.com",
        dentist_id: createdDentists[0]?.id,
        rating: 5,
        title: "Excellent Service!",
        content:
          "Dr. Sarah is amazing. She fixed my crooked teeth with braces and the results are incredible. Highly recommend!",
        is_approved: true,
        is_featured: true,
      },
      {
        reviewer_name: "Fatima Ahmed",
        reviewer_email: "fatima.ahmed@email.com",
        dentist_id: createdDentists[1]?.id,
        rating: 5,
        title: "Painless Root Canal",
        content:
          "I was scared of root canal but Dr. Ahmed made it completely painless. Thank you so much!",
        is_approved: true,
        is_featured: true,
      },
      {
        reviewer_name: "Hassan Malik",
        reviewer_email: "hassan.malik@email.com",
        dentist_id: createdDentists[2]?.id,
        rating: 4,
        title: "Great with Kids",
        content:
          "Dr. Zainab is wonderful with children. My son was not scared at all during his first dental visit.",
        is_approved: true,
        is_featured: false,
      },
      {
        reviewer_name: "Ayesha Siddiqui",
        reviewer_email: "ayesha.s@email.com",
        rating: 5,
        title: "Modern Clinic",
        content:
          "Very clean and modern clinic with latest equipment. Staff is friendly and professional.",
        is_approved: true,
        is_featured: true,
      },
      {
        reviewer_name: "Usman Raza",
        reviewer_email: "usman.raza@email.com",
        dentist_id: createdDentists[3]?.id,
        rating: 4,
        title: "Good Implant Work",
        content:
          "Got my dental implant done here. The process took time but results are worth it.",
        is_approved: false,
        is_featured: false,
      },
    ];

    for (const review of reviews) {
      const res = await fetch(`${BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      if (res.ok) {
        console.log(
          `  ✅ Added review from: ${review.reviewer_name} (${review.rating} stars)`,
        );
      }
    }

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${patients.length} patients`);
    console.log(`   - ${dentists.length} dentists`);
    console.log(`   - ${services.length} services`);
    console.log(`   - 5 appointments`);
    console.log(`   - 3 payments`);
    console.log(`   - ${messages.length} contact messages`);
    console.log(`   - ${reviews.length} reviews`);
    console.log("\n🔗 Open http://localhost:3001/admin to see the data!");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
}

// Helper functions
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Run the seed
seedData();
