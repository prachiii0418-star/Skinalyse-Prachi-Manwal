const doctors = [
    { id: 1, name: "Dr. Sharma", specialty: "Acne & Pimple Treatment" },
    { id: 2, name: "Dr. Mehta", specialty: "Eczema & Dry Skin Specialist" },
    { id: 3, name: "Dr. Khan", specialty: "Skin Allergy & Rashes" },
    { id: 4, name: "Dr. Gupta", specialty: "Pigmentation & Dark Spots" },
    { id: 5, name: "Dr. Verma", specialty: "Hair Loss & Scalp Issues" },
    { id: 6, name: "Dr. Iyer", specialty: "Psoriasis Treatment" }
];

const slots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM"];

let selectedDoctor = null;
let selectedSlot = null;
let appointments = [];

const doctorList = document.getElementById("doctorList");
const slotSection = document.getElementById("slotSection");
const appointmentsDiv = document.getElementById("appointments");

// Render doctors
function renderDoctors() {
    doctorList.innerHTML = "";

    doctors.forEach(doc => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<b>${doc.name}</b><br>${doc.specialty}`;

        div.onclick = () => {
            selectedDoctor = doc;
            selectedSlot = null;
            renderDoctors();
            renderSlots();
        };

        if (selectedDoctor?.id === doc.id) {
            div.classList.add("selected");
        }

        doctorList.appendChild(div);
    });
}

// Render slots
function renderSlots() {
    if (!selectedDoctor) {
        slotSection.innerHTML = "";
        return;
    }

    slotSection.innerHTML = "<h2>Select Time Slot</h2>";

    slots.forEach(slot => {
        const span = document.createElement("span");
        span.className = "slot";
        span.innerText = slot;

        span.onclick = () => {
            selectedSlot = slot;
            renderSlots();
        };

        if (selectedSlot === slot) {
            span.classList.add("selected");
        }

        slotSection.appendChild(span);
    });
}

// Book appointment
function bookAppointment() {
    if (!selectedDoctor || !selectedSlot) {
        alert("Please select doctor and slot!");
        return;
    }

    appointments.push({
        doctor: selectedDoctor.name,
        slot: selectedSlot
    });

    selectedDoctor = null;
    selectedSlot = null;

    renderDoctors();
    renderSlots();
    renderAppointments();
}

// Render dashboard
function renderAppointments() {
    if (appointments.length === 0) {
        appointmentsDiv.innerHTML = "No appointments yet";
        return;
    }

    appointmentsDiv.innerHTML = "";

    appointments.forEach(a => {
        const div = document.createElement("div");
        div.innerText = `${a.doctor} - ${a.slot}`;
        appointmentsDiv.appendChild(div);
    });
}

// Initial render
renderDoctors();
renderAppointments();