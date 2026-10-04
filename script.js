/* =========================================
ShaadiMatch - Main JavaScript
========================================= */

/* ================= SEARCH ================= */

function searchProfiles() {
    const gender = document.getElementById("genderSearch").value;
    const age = document.getElementById("ageSearch").value;
    const location = document.getElementById("locationSearch").value.trim();

    localStorage.setItem("searchGender", gender);
    localStorage.setItem("searchAge", age);
    localStorage.setItem("searchLocation", location);

    window.location.href = "profiles.html";
}

/* ================= WISHLIST ================= */

function toggleWishlist(button) {
    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        button.innerHTML = "♡";
    } else {
        button.classList.add("liked");
        button.innerHTML = "♥";
        alert("Profile added to your shortlist!");
    }
}

/* ================= PROFILE VIEW ================= */

function viewProfile(name) {
    localStorage.setItem("selectedProfile", name);
    window.location.href = "profile.html";
}

/* ================= MOBILE MENU ================= */

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            if (navLinks.style.display === "flex") {
                navLinks.style.display = "none";
            } else {
                navLinks.style.display = "flex";
                navLinks.style.position = "absolute";
                navLinks.style.top = "70px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.padding = "20px";
                navLinks.style.background = "white";
                navLinks.style.flexDirection = "column";
                navLinks.style.alignItems = "center";
                navLinks.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
            }
        });
    }
});

/* ================= REGISTRATION ================= */

let currentStep = 1;

/* ---------- STEP VALIDATION ---------- */

function validateStep(step) {
    const currentForm = document.getElementById("step" + step);
    const fields = currentForm.querySelectorAll("input[required], select[required]");

    for (const field of fields) {
        if (!field.value.trim()) {
            field.focus();
            alert("Please fill all required fields before continuing.");
            return false;
        }
    }

    return true;
}

/* ---------- NEXT STEP ---------- */

function nextStep(step) {
    if (!validateStep(step)) {
        return;
    }

    document.getElementById("step" + step).classList.remove("active");

    currentStep = step + 1;

    document.getElementById("step" + currentStep).classList.add("active");

    updateProgress();
}

/* ---------- PREVIOUS STEP ---------- */

function previousStep(step) {
    document.getElementById("step" + step).classList.remove("active");

    currentStep = step - 1;

    document.getElementById("step" + currentStep).classList.add("active");

    updateProgress();
}

/* ---------- UPDATE PROGRESS ---------- */

function updateProgress() {
    const progressSteps = document.querySelectorAll(".progress-step");

    progressSteps.forEach((step, index) => {
        const number = index + 1;

        step.classList.remove("active", "completed");

        if (number === currentStep) {
            step.classList.add("active");
        } else if (number < currentStep) {
            step.classList.add("completed");
        }
    });
}

/* ---------- SAVE PROFILE ---------- */

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    const savedProfile = localStorage.getItem("shaadiMatchProfile");

    if (savedProfile) {
        try {
            const profile = JSON.parse(savedProfile);
            const fieldValues = {
                fullName: profile.personal?.fullName,
                gender: profile.personal?.gender,
                dob: profile.personal?.dob,
                maritalStatus: profile.personal?.maritalStatus,
                motherTongue: profile.personal?.motherTongue,
                religion: profile.personal?.religion,
                caste: profile.personal?.caste,
                location: profile.personal?.location,
                familyType: profile.family?.familyType,
                familyValues: profile.family?.familyValues,
                fatherOccupation: profile.family?.fatherOccupation,
                motherOccupation: profile.family?.motherOccupation,
                siblings: profile.family?.siblings,
                familyLocation: profile.family?.familyLocation,
                education: profile.career?.education,
                college: profile.career?.college,
                occupation: profile.career?.occupation,
                income: profile.career?.income,
                workingLocation: profile.career?.workingLocation,
                employer: profile.career?.employer,
                preferredAge: profile.preferences?.age,
                preferredReligion: profile.preferences?.religion,
                preferredCaste: profile.preferences?.caste,
                preferredEducation: profile.preferences?.education,
                preferredOccupation: profile.preferences?.occupation,
                preferredLocation: profile.preferences?.location
            };

            Object.entries(fieldValues).forEach(function ([fieldId, value]) {
                const field = document.getElementById(fieldId);

                if (field && value !== undefined && value !== null) {
                    field.value = value;
                }
            });
        } catch (error) {
            console.error("Unable to load saved profile for editing:", error);
        }
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!document.getElementById("terms").checked) {
            alert("Please agree to the Terms & Conditions and Privacy Policy.");
            return;
        }

        const profile = {
            personal: {
                fullName: document.getElementById("fullName").value,
                gender: document.getElementById("gender").value,
                dob: document.getElementById("dob").value,
                maritalStatus: document.getElementById("maritalStatus").value,
                motherTongue: document.getElementById("motherTongue").value,
                religion: document.getElementById("religion").value,
                caste: document.getElementById("caste").value,
                location: document.getElementById("location").value
            },
            family: {
                familyType: document.getElementById("familyType").value,
                familyValues: document.getElementById("familyValues").value,
                fatherOccupation: document.getElementById("fatherOccupation").value,
                motherOccupation: document.getElementById("motherOccupation").value,
                siblings: document.getElementById("siblings").value,
                familyLocation: document.getElementById("familyLocation").value
            },
            career: {
                education: document.getElementById("education").value,
                college: document.getElementById("college").value,
                occupation: document.getElementById("occupation").value,
                income: document.getElementById("income").value,
                workingLocation: document.getElementById("workingLocation").value,
                employer: document.getElementById("employer").value
            },
            preferences: {
                age: document.getElementById("preferredAge").value,
                religion: document.getElementById("preferredReligion").value,
                caste: document.getElementById("preferredCaste").value,
                education: document.getElementById("preferredEducation").value,
                occupation: document.getElementById("preferredOccupation").value,
                location: document.getElementById("preferredLocation").value
            }
        };

        localStorage.setItem("shaadiMatchProfile", JSON.stringify(profile));
        localStorage.setItem("isRegistered", "true");

        alert("🎉 Your ShaadiMatch profile has been created successfully!");

        window.location.href = "dashboard.html";
    });
}

/* ================= DASHBOARD ================= */

document.addEventListener("DOMContentLoaded", function () {
    const savedProfile = localStorage.getItem("shaadiMatchProfile");

    if (!savedProfile) {
        return;
    }

    const profile = JSON.parse(savedProfile);

    const name = profile.personal.fullName || "there";
    const location = profile.personal.location || "-";
    const education = profile.career.education || "-";
    const occupation = profile.career.occupation || "-";

    const welcomeName = document.getElementById("welcomeName");
    const profileName = document.getElementById("profileName");
    const sidebarName = document.getElementById("sidebarName");
    const profileLocation = document.getElementById("profileLocation");
    const profileEducation = document.getElementById("profileEducation");
    const profileOccupation = document.getElementById("profileOccupation");
    const profileBasic = document.getElementById("profileBasic");

    if (welcomeName) {
        welcomeName.textContent = name.split(" ")[0];
    }

    if (profileName) {
        profileName.textContent = name;
    }

    if (sidebarName) {
        sidebarName.textContent = name;
    }

    if (profileLocation) {
        profileLocation.textContent = location;
    }

    if (profileEducation) {
        profileEducation.textContent = education;
    }

    if (profileOccupation) {
        profileOccupation.textContent = occupation;
    }

    if (profileBasic) {
        profileBasic.textContent = `${profile.personal.gender} • ${profile.personal.maritalStatus}`;
    }
});

/* ================= LOGOUT ================= */

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

/* ================= PROFILE VIEW ================= */

function showProfileData() {
    const profile = localStorage.getItem("shaadiMatchProfile");

    if (!profile) {
        alert("No profile information found.");
        return;
    }

    const data = JSON.parse(profile);

    alert(
        "Profile: " +
        data.personal.fullName +
        "\n\n" +
        "Location: " +
        data.personal.location +
        "\n" +
        "Education: " +
        data.career.education +
        "\n" +
        "Occupation: " +
        data.career.occupation
    );
}

/* ================= SEND INTEREST ================= */

function sendInterest(name) {
    let interests = JSON.parse(localStorage.getItem("sentInterests") || "[]");

    if (!interests.includes(name)) {
        interests.push(name);
        localStorage.setItem("sentInterests", JSON.stringify(interests));
        alert("Interest sent to " + name + " ♥");
    } else {
        alert("You have already sent an interest to " + name + ".");
    }
}

/* ================= PROFILES PAGE ================= */

const shaadiMatchProfiles = [
    {
        id: 1,
        name: "Aarav Mehta",
        age: 28,
        gender: "Male",
        religion: "Hindu",
        caste: "Agarwal",
        location: "Jamshedpur",
        education: "Engineering",
        occupation: "Software Engineer",
        income: "₹12 Lakh",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        bio: "A software professional who enjoys technology, travelling and spending time with family."
    },
    {
        id: 2,
        name: "Ananya Sharma",
        age: 26,
        gender: "Female",
        religion: "Hindu",
        caste: "Brahmin",
        location: "Ranchi",
        education: "Management",
        occupation: "Marketing Manager",
        income: "₹9 Lakh",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
        bio: "A cheerful professional who loves reading, travelling and exploring new places."
    },
    {
        id: 3,
        name: "Rohan Verma",
        age: 30,
        gender: "Male",
        religion: "Hindu",
        caste: "Rajput",
        location: "Delhi",
        education: "Engineering",
        occupation: "Product Manager",
        income: "₹15 Lakh",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
        bio: "Ambitious and family-oriented professional with an interest in sports and travelling."
    },
    {
        id: 4,
        name: "Priya Kapoor",
        age: 27,
        gender: "Female",
        religion: "Hindu",
        caste: "Kayastha",
        location: "Kolkata",
        education: "Commerce",
        occupation: "Financial Analyst",
        income: "₹8 Lakh",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        bio: "A finance professional who values family, honesty and a balanced lifestyle."
    },
    {
        id: 5,
        name: "Kabir Khan",
        age: 29,
        gender: "Male",
        religion: "Muslim",
        caste: "Other",
        location: "Bengaluru",
        education: "Engineering",
        occupation: "Technology Consultant",
        income: "₹14 Lakh",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        bio: "Technology enthusiast who enjoys fitness, travelling and learning new things."
    },
    {
        id: 6,
        name: "Meera Thomas",
        age: 25,
        gender: "Female",
        religion: "Christian",
        caste: "Other",
        location: "Delhi",
        education: "Medical",
        occupation: "Doctor",
        income: "₹11 Lakh",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
        bio: "A caring medical professional who enjoys music, books and family time."
    },
    {
        id: 7,
        name: "Aditya Singh",
        age: 31,
        gender: "Male",
        religion: "Hindu",
        caste: "Rajput",
        location: "Ranchi",
        education: "Management",
        occupation: "Business Manager",
        income: "₹16 Lakh",
        image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
        bio: "Responsible and family-oriented professional with a passion for business and travel."
    },
    {
        id: 8,
        name: "Isha Agarwal",
        age: 27,
        gender: "Female",
        religion: "Hindu",
        caste: "Agarwal",
        location: "Jamshedpur",
        education: "Arts",
        occupation: "Content Strategist",
        income: "₹7 Lakh",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80",
        bio: "Creative professional who loves books, art, travelling and meaningful conversations."
    }
];

/* LOAD PROFILES */

function loadShaadiMatchProfiles() {
    const grid = document.getElementById("profilesGrid");

    if (!grid) {
        return;
    }

    const searchInput = document.getElementById("profileSearch");

    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const ageFromValue = document.getElementById("ageFrom").value;
    const ageToValue = document.getElementById("ageTo").value;

    const ageFrom = ageFromValue ? Number(ageFromValue) : 0;
    const ageTo = ageToValue ? Number(ageToValue) : 100;

    const religion = document.getElementById("religionFilter").value;
    const caste = document.getElementById("casteFilter").value;
    const education = document.getElementById("educationFilter").value;
    const location = document.getElementById("locationFilter").value;

    const filteredProfiles = shaadiMatchProfiles.filter(function (profile) {
        const matchesSearch =
            profile.name.toLowerCase().includes(searchText) ||
            profile.location.toLowerCase().includes(searchText) ||
            profile.occupation.toLowerCase().includes(searchText);

        const matchesAge = profile.age >= ageFrom && profile.age <= ageTo;
        const matchesReligion = religion === "" || profile.religion === religion;
        const matchesCaste = caste === "" || profile.caste === caste;
        const matchesEducation = education === "" || profile.education === education;
        const matchesLocation = location === "" || profile.location === location;

        return (
            matchesSearch &&
            matchesAge &&
            matchesReligion &&
            matchesCaste &&
            matchesEducation &&
            matchesLocation
        );
    });

    document.getElementById("profileCount").textContent = filteredProfiles.length;

    grid.innerHTML = "";

    if (filteredProfiles.length === 0) {
        document.getElementById("noProfiles").style.display = "block";
        return;
    }

    document.getElementById("noProfiles").style.display = "none";

    filteredProfiles.forEach(function (profile) {
        const card = createProfileCard(profile);
        grid.appendChild(card);
    });
}

/* CREATE PROFILE CARD */

function createProfileCard(profile) {
    const card = document.createElement("div");
    card.className = "profile-card";

    const shortlisted = isProfileShortlisted(profile.id);

    card.innerHTML = `
        <div class="profile-image-box">
            <img src="${profile.image}" alt="${profile.name}">
            <button class="shortlist-btn ${shortlisted ? "shortlisted" : ""}" onclick="toggleShortlist(${profile.id})" title="Shortlist">
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>

        <div class="profile-card-content">
            <h3>${profile.name}</h3>
            <div class="profile-age">${profile.age} years old</div>

            <div class="profile-info-line">
                <i class="fa-solid fa-location-dot"></i>
                ${profile.location}
            </div>

            <div class="profile-info-line">
                <i class="fa-solid fa-graduation-cap"></i>
                ${profile.education}
            </div>

            <div class="profile-info-line">
                <i class="fa-solid fa-briefcase"></i>
                ${profile.occupation}
            </div>

            <div class="profile-actions">
                <a href="profile-detail.html?id=${profile.id}" class="view-profile-btn">View Profile</a>
                <button class="interest-btn" onclick="sendInterest('${profile.name}')">Send Interest</button>
            </div>
        </div>
    `;

    return card;
}

/* SHORTLIST */

function toggleShortlist(profileId) {
    let shortlisted = JSON.parse(localStorage.getItem("shortlistedProfiles") || "[]");

    if (shortlisted.includes(profileId)) {
        shortlisted = shortlisted.filter(function (id) {
            return id !== profileId;
        });

        alert("Profile removed from shortlist.");
    } else {
        shortlisted.push(profileId);
        alert("Profile added to shortlist ♥");
    }

    localStorage.setItem("shortlistedProfiles", JSON.stringify(shortlisted));

    loadShaadiMatchProfiles();
}

/* CHECK SHORTLIST */

function isProfileShortlisted(profileId) {
    const shortlisted = JSON.parse(localStorage.getItem("shortlistedProfiles") || "[]");
    return shortlisted.includes(profileId);
}

/* FILTER PANEL */

function toggleProfileFilters() {
    const panel = document.getElementById("profileFilterPanel");

    if (!panel) {
        return;
    }

    if (panel.style.display === "none") {
        panel.style.display = "grid";
    } else {
        panel.style.display = "none";
    }
}

/* CLEAR FILTERS */

function clearProfileFilters() {
    document.getElementById("profileSearch").value = "";
    document.getElementById("ageFrom").value = "";
    document.getElementById("ageTo").value = "";
    document.getElementById("religionFilter").value = "";
    document.getElementById("casteFilter").value = "";
    document.getElementById("educationFilter").value = "";
    document.getElementById("locationFilter").value = "";

    loadShaadiMatchProfiles();
}

/* GRID / LIST VIEW */

function setProfileView(view) {
    const grid = document.getElementById("profilesGrid");
    const gridButton = document.getElementById("gridViewBtn");
    const listButton = document.getElementById("listViewBtn");

    if (!grid) {
        return;
    }

    if (view === "list") {
        grid.classList.add("list-view");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
    } else {
        grid.classList.remove("list-view");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    }
}

/* PROFILE PAGE EVENTS */

document.addEventListener("DOMContentLoaded", function () {
    const profilesGrid = document.getElementById("profilesGrid");

    if (!profilesGrid) {
        return;
    }

    loadShaadiMatchProfiles();

    const searchInput = document.getElementById("profileSearch");
    searchInput.addEventListener("input", loadShaadiMatchProfiles);

    const filterIds = [
        "ageFrom",
        "ageTo",
        "religionFilter",
        "casteFilter",
        "educationFilter",
        "locationFilter"
    ];

    filterIds.forEach(function (id) {
        document.getElementById(id).addEventListener("change", loadShaadiMatchProfiles);
    });
});
/* ================= PROFILE DETAIL PAGE ================= */

let currentDetailProfile = null;


/* LOAD PROFILE DETAILS */

function loadProfileDetail() {

    const detailImage = document.getElementById("detailImage");

    if (!detailImage) {
        return;
    }


    const urlParams = new URLSearchParams(window.location.search);

    const profileId = Number(urlParams.get("id"));


    currentDetailProfile = shaadiMatchProfiles.find(function (profile) {

        return profile.id === profileId;

    });


    if (!currentDetailProfile) {

        document.querySelector(".profile-detail-page").innerHTML = `
            <div class="container">
                <div class="no-profiles" style="display:block;">
                    <i class="fa-regular fa-face-frown"></i>
                    <h3>Profile not found</h3>
                    <p>The profile you are looking for does not exist.</p>
                    <a href="profiles.html" class="view-profile-btn">
                        Back to Profiles
                    </a>
                </div>
            </div>
        `;

        return;
    }


    const profile = currentDetailProfile;


    /* BASIC INFORMATION */

    document.getElementById("detailImage").src = profile.image;

    document.getElementById("detailImage").alt = profile.name;

    document.getElementById("detailName").textContent =
        profile.name;

    document.getElementById("detailBasic").textContent =
        profile.age + " years • " + profile.location;

    document.getElementById("detailEducation").textContent =
        profile.education;

    document.getElementById("detailOccupation").textContent =
        profile.occupation;

    document.getElementById("detailLocation").textContent =
        profile.location;

    document.getElementById("detailBio").textContent =
        profile.bio;


    /* PERSONAL DETAILS */

    document.getElementById("infoAge").textContent =
        profile.age;

    document.getElementById("infoGender").textContent =
        profile.gender;

    document.getElementById("infoReligion").textContent =
        profile.religion;

    document.getElementById("infoCaste").textContent =
        profile.caste;


    /* DEMO FAMILY DETAILS */

    document.getElementById("infoFamilyType").textContent =
        "Nuclear Family";

    document.getElementById("infoFamilyValues").textContent =
        "Traditional";

    document.getElementById("infoFather").textContent =
        "Business Professional";

    document.getElementById("infoMother").textContent =
        "Homemaker";

    document.getElementById("infoSiblings").textContent =
        "1 Sibling";

    document.getElementById("infoFamilyLocation").textContent =
        profile.location;


    /* CAREER */

    document.getElementById("infoEducation").textContent =
        profile.education;

    document.getElementById("infoCollege").textContent =
        "Recognized University";

    document.getElementById("infoOccupation").textContent =
        profile.occupation;

    document.getElementById("infoIncome").textContent =
        profile.income;

    document.getElementById("infoWorkingLocation").textContent =
        profile.location;

    document.getElementById("infoEmployer").textContent =
        "Private Organization";


    /* PARTNER PREFERENCES */

    document.getElementById("infoPreferredAge").textContent =
        "24 - 32";

    document.getElementById("infoPreferredReligion").textContent =
        profile.religion;

    document.getElementById("infoPreferredCaste").textContent =
        "Any";

    document.getElementById("infoPreferredEducation").textContent =
        "Graduate / Post Graduate";

    document.getElementById("infoPreferredOccupation").textContent =
        "Any Professional";

    document.getElementById("infoPreferredLocation").textContent =
        "Any Major City";


    /* HOROSCOPE */

    const horoscopeScore =
        80 + (profile.id % 16);

    document.getElementById("compatibilityScore").textContent =
        horoscopeScore + "%";


    updateDetailShortlistButton();

}


/* SHORTLIST BUTTON */

function toggleDetailShortlist() {

    if (!currentDetailProfile) {
        return;
    }


    let shortlisted =
        JSON.parse(
            localStorage.getItem("shortlistedProfiles") || "[]"
        );


    if (shortlisted.includes(currentDetailProfile.id)) {

        shortlisted =
            shortlisted.filter(function (id) {

                return id !== currentDetailProfile.id;

            });

        alert("Profile removed from shortlist.");

    } else {

        shortlisted.push(currentDetailProfile.id);

        alert("Profile added to shortlist ♥");

    }


    localStorage.setItem(
        "shortlistedProfiles",
        JSON.stringify(shortlisted)
    );


    updateDetailShortlistButton();

}


/* UPDATE HEART */

function updateDetailShortlistButton() {

    if (!currentDetailProfile) {
        return;
    }


    const button =
        document.getElementById("detailShortlistBtn");

    if (!button) {
        return;
    }


    const shortlisted =
        JSON.parse(
            localStorage.getItem("shortlistedProfiles") || "[]"
        );


    if (shortlisted.includes(currentDetailProfile.id)) {

        button.classList.add("active");

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    } else {

        button.classList.remove("active");

        button.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

    }

}


/* SEND INTEREST FROM DETAIL PAGE */

function sendDetailInterest() {

    if (!currentDetailProfile) {
        return;
    }


    sendInterest(currentDetailProfile.name);

}


/* ================= MESSAGE FROM PROFILE DETAIL ================= */

function openDetailMessage() {

    if (!currentDetailProfile) {
        return;
    }

    const profileId = Number(currentDetailProfile.id);
    const profileName = currentDetailProfile.name;

    const sentInterests = JSON.parse(
        localStorage.getItem("sentInterests") || "[]"
    );

    const interestSent = sentInterests.includes(profileName);

    if (!interestSent) {

        alert(
            "Please send an interest first."
        );

        return;
    }

    /*
       Save the profile that should be opened
       on the Messages page.
    */
    localStorage.setItem(
        "openChatProfileId",
        String(profileId)
    );

    window.location.href = "messages.html";
}


/* INITIALIZE DETAIL PAGE */

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("detailImage")) {

        loadProfileDetail();

    }

});
/* ================= MATCHES PAGE ================= */

function getShaadiMatchProfileByName(name) {

    return shaadiMatchProfiles.find(function (profile) {
        return profile.name === name;
    });

}


/* CREATE MATCH CARD */

function createMatchCard(profile, type) {

    const card = document.createElement("div");

    card.className = "match-card";


    let actionButton = "";


    if (type === "shortlisted") {

        actionButton = `
            <button
                class="match-remove-btn"
                onclick="removeFromShortlist(${profile.id})"
            >
                Remove
            </button>
        `;

    } else {

        actionButton = `
            <button
                class="match-remove-btn"
                onclick="removeSentInterest('${profile.name}')"
            >
                Remove
            </button>
        `;

    }


    const mutualBadge =
        type === "mutual"
            ? `<span class="mutual-badge">Mutual Match</span>`
            : "";


    card.innerHTML = `

        <div class="match-card-image">

            <img
                src="${profile.image}"
                alt="${profile.name}"
            >

            ${mutualBadge}

        </div>


        <div class="match-card-content">

            <h3>${profile.name}</h3>

            <div class="match-card-age">
                ${profile.age} years old
            </div>


            <div class="match-card-info">

                <i class="fa-solid fa-location-dot"></i>
                ${profile.location}

            </div>


            <div class="match-card-info">

                <i class="fa-solid fa-graduation-cap"></i>
                ${profile.education}

            </div>


            <div class="match-card-info">

                <i class="fa-solid fa-briefcase"></i>
                ${profile.occupation}

            </div>


            <div class="match-card-actions">

                <a
                    href="profile-detail.html?id=${profile.id}"
                    class="match-view-btn"
                >
                    View Profile
                </a>

                ${actionButton}

            </div>

        </div>

    `;


    return card;

}


/* LOAD MATCHES */

function loadMatchesPage() {

    if (!document.getElementById("mutualMatchesGrid")) {
        return;
    }


    const mutualGrid =
        document.getElementById("mutualMatchesGrid");

    const sentGrid =
        document.getElementById("sentInterestsGrid");

    const shortlistedGrid =
        document.getElementById("shortlistedProfilesGrid");


    mutualGrid.innerHTML = "";
    sentGrid.innerHTML = "";
    shortlistedGrid.innerHTML = "";


    const sentInterests = JSON.parse(
        localStorage.getItem("sentInterests") || "[]"
    );


    const shortlistedIds = JSON.parse(
        localStorage.getItem("shortlistedProfiles") || "[]"
    );


    /*
        Demo mutual-match logic:
        Profiles with IDs 2 and 4 are shown as mutual
        when the user has sent them an interest.
    */

    const mutualProfiles = shaadiMatchProfiles.filter(
        function (profile) {

            return (
                sentInterests.includes(profile.name) &&
                (profile.id === 2 || profile.id === 4)
            );

        }
    );


    const sentProfiles = shaadiMatchProfiles.filter(
        function (profile) {

            return sentInterests.includes(profile.name);

        }
    );


    const shortlistedProfiles = shaadiMatchProfiles.filter(
        function (profile) {

            return shortlistedIds.includes(profile.id);

        }
    );


    /* COUNTS */

    document.getElementById("mutualCount").textContent =
        mutualProfiles.length;

    document.getElementById("sentCount").textContent =
        sentProfiles.length;

    document.getElementById("shortlistedCount").textContent =
        shortlistedProfiles.length;


    /* MUTUAL */

    mutualProfiles.forEach(function (profile) {

        mutualGrid.appendChild(
            createMatchCard(profile, "mutual")
        );

    });


    /* SENT */

    sentProfiles.forEach(function (profile) {

        sentGrid.appendChild(
            createMatchCard(profile, "sent")
        );

    });


    /* SHORTLISTED */

    shortlistedProfiles.forEach(function (profile) {

        shortlistedGrid.appendChild(
            createMatchCard(profile, "shortlisted")
        );

    });


    updateMatchesEmptyState();

}


/* REMOVE SHORTLIST */

function removeFromShortlist(profileId) {

    let shortlistedIds = JSON.parse(
        localStorage.getItem("shortlistedProfiles") || "[]"
    );


    shortlistedIds = shortlistedIds.filter(
        function (id) {

            return id !== profileId;

        }
    );


    localStorage.setItem(
        "shortlistedProfiles",
        JSON.stringify(shortlistedIds)
    );


    loadMatchesPage();

}


/* REMOVE SENT INTEREST */

function removeSentInterest(profileName) {

    let sentInterests = JSON.parse(
        localStorage.getItem("sentInterests") || "[]"
    );


    sentInterests = sentInterests.filter(
        function (name) {

            return name !== profileName;

        }
    );


    localStorage.setItem(
        "sentInterests",
        JSON.stringify(sentInterests)
    );


    loadMatchesPage();

}


/* TAB SWITCHING */

function initializeMatchTabs() {

    const tabs = document.querySelectorAll(".match-tab");

    if (!tabs.length) {
        return;
    }


    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");


            const selectedTab = tab.dataset.tab;


            document
                .querySelectorAll(".match-section")
                .forEach(function (section) {

                    section.classList.remove("active");

                });


            if (selectedTab === "mutual") {

                document
                    .getElementById("mutualSection")
                    .classList.add("active");

            }


            if (selectedTab === "sent") {

                document
                    .getElementById("sentSection")
                    .classList.add("active");

            }


            if (selectedTab === "shortlisted") {

                document
                    .getElementById("shortlistedSection")
                    .classList.add("active");

            }


            updateMatchesEmptyState();

        });

    });

}


/* EMPTY STATE */

function updateMatchesEmptyState() {

    const activeSection =
        document.querySelector(".match-section.active");

    const emptyState =
        document.getElementById("matchesEmptyState");


    if (!activeSection || !emptyState) {
        return;
    }


    const grid =
        activeSection.querySelector(".matches-grid");


    if (!grid || grid.children.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


/* INITIALIZE MATCH PAGE */

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("mutualMatchesGrid")) {

        loadMatchesPage();

        initializeMatchTabs();

    }

});
/* =========================================================
   SHAADIMATCH - MESSAGES / CHAT
   Frontend Demo Chat
   ========================================================= */

const shaadiChatProfiles = [
    {
        id: 1,
        name: "Aarav Mehta",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
        lastMessage: "Hi! Nice to connect with you.",
        time: "10:30 AM"
    },
    {
        id: 2,
        name: "Ananya Sharma",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
        lastMessage: "Hello! How are you?",
        time: "Yesterday"
    },
    {
        id: 3,
        name: "Rohan Verma",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
        lastMessage: "It was nice talking to you.",
        time: "Mon"
    },
    {
        id: 4,
        name: "Priya Kapoor",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300",
        lastMessage: "Thank you for connecting!",
        time: "Sun"
    }
];


/* ================= CHAT STORAGE ================= */

function getShaadiChatStorage() {
    return JSON.parse(
        localStorage.getItem("shaadiMatchChats") || "{}"
    );
}


function saveShaadiChatStorage(chats) {
    localStorage.setItem(
        "shaadiMatchChats",
        JSON.stringify(chats)
    );
}


/* ================= CURRENT CHAT ================= */

let shaadiCurrentChatId = null;


/* ================= LOAD CONVERSATIONS ================= */

function loadShaadiConversations() {

    const list = document.getElementById("conversationList");

    if (!list) return;

    const searchInput = document.getElementById("conversationSearch");

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const chats = getShaadiChatStorage();

    let visibleProfiles = shaadiChatProfiles.filter(function(profile) {

        return profile.name
            .toLowerCase()
            .includes(searchText);

    });


    const countElement =
        document.getElementById("conversationCount");

    if (countElement) {
        countElement.textContent =
            visibleProfiles.length +
            (visibleProfiles.length === 1
                ? " conversation"
                : " conversations");
    }


    if (visibleProfiles.length === 0) {

        list.innerHTML = `
            <div class="no-conversations">
                No conversations found.
            </div>
        `;

        return;
    }


    list.innerHTML = visibleProfiles.map(function(profile) {

        const profileChat = chats[profile.id] || [];

        let preview = profile.lastMessage;
        let time = profile.time;

        if (profileChat.length > 0) {

            const last =
                profileChat[profileChat.length - 1];

            preview = last.text;
            time = last.time;

        }


        return `
            <div
                class="conversation-item ${
                    shaadiCurrentChatId === profile.id
                        ? "active"
                        : ""
                }"
                onclick="openShaadiChat(${profile.id})">

                <div class="conversation-avatar">

                    <img
                        src="${profile.image}"
                        alt="${profile.name}">

                </div>

                <div class="conversation-info">

                    <div class="conversation-top">

                        <h4>${profile.name}</h4>

                        <span class="conversation-time">
                            ${time}
                        </span>

                    </div>

                    <p class="conversation-preview">
                        ${escapeShaadiChatText(preview)}
                    </p>

                </div>

            </div>
        `;

    }).join("");
}


/* ================= OPEN CHAT ================= */

function openShaadiChat(profileId) {

    const profile =
        shaadiChatProfiles.find(function(item) {
            return item.id === profileId;
        });

    if (!profile) return;

    shaadiCurrentChatId = profileId;

    const emptyState =
        document.getElementById("chatEmptyState");

    const activeChat =
        document.getElementById("activeChat");

    if (!emptyState || !activeChat) return;

    emptyState.style.display = "none";
    activeChat.style.display = "flex";


    const name =
        document.getElementById("chatPersonName");

    const image =
        document.getElementById("chatPersonImage");

    if (name) {
        name.textContent = profile.name;
    }

    if (image) {
        image.src = profile.image;
        image.alt = profile.name;
    }


    const messagesContainer =
        document.getElementById("chatMessages");

    if (!messagesContainer) return;


    const chats = getShaadiChatStorage();

    let messages = chats[profileId] || [];


    /*
       Demo welcome message.
       It will be saved only once.
    */

    if (messages.length === 0) {

        messages = [
            {
                sender: "received",
                text: `Hi! Nice to connect with you.`,
                time: "10:30 AM"
            }
        ];

        chats[profileId] = messages;

        saveShaadiChatStorage(chats);
    }


    renderShaadiMessages(messages);

    loadShaadiConversations();


    const input =
        document.getElementById("chatInput");

    if (input) {
        setTimeout(function() {
            input.focus();
        }, 100);
    }
}


/* ================= RENDER MESSAGES ================= */

function renderShaadiMessages(messages) {

    const container =
        document.getElementById("chatMessages");

    if (!container) return;


    container.innerHTML = `
        <div class="chat-date">Today</div>
    `;


    messages.forEach(function(message) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "chat-message " + message.sender;


        messageElement.innerHTML = `
            <div class="message-bubble">

                ${escapeShaadiChatText(message.text)}

                <span class="message-meta">
                    ${message.time}
                </span>

            </div>
        `;


        container.appendChild(messageElement);

    });


    container.scrollTop =
        container.scrollHeight;
}


/* ================= SEND MESSAGE ================= */

function sendChatMessage() {

    if (!shaadiCurrentChatId) {

        alert("Please select a conversation first.");

        return;
    }


    const input =
        document.getElementById("chatInput");

    if (!input) return;


    const text =
        input.value.trim();

    if (!text) return;


    const now =
        new Date();

    let hours =
        now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;


    const time =
        `${hours}:${minutes} ${ampm}`;


    const chats =
        getShaadiChatStorage();


    if (!chats[shaadiCurrentChatId]) {
        chats[shaadiCurrentChatId] = [];
    }


    chats[shaadiCurrentChatId].push({

        sender: "sent",

        text: text,

        time: time

    });


    saveShaadiChatStorage(chats);


    input.value = "";

    renderShaadiMessages(
        chats[shaadiCurrentChatId]
    );

    loadShaadiConversations();


    /*
       Demo reply.
       This is only a frontend simulation.
    */

    setTimeout(function() {

        const updatedChats =
            getShaadiChatStorage();

        if (!updatedChats[shaadiCurrentChatId]) {
            return;
        }


        updatedChats[shaadiCurrentChatId].push({

            sender: "received",

            text: getShaadiDemoReply(),

            time: getShaadiCurrentTime()

        });


        saveShaadiChatStorage(updatedChats);


        if (shaadiCurrentChatId) {

            renderShaadiMessages(
                updatedChats[shaadiCurrentChatId]
            );

            loadShaadiConversations();

        }

    }, 1200);
}


/* ================= ENTER TO SEND ================= */

function handleChatKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendChatMessage();

    }
}


/* ================= SEARCH ================= */

function searchConversations() {

    loadShaadiConversations();

}


/* ================= DEMO REPLIES ================= */

function getShaadiDemoReply() {

    const replies = [

        "That's nice to hear! 😊",

        "Yes, I'd love to know more about you.",

        "Sounds great! Tell me more.",

        "It was lovely connecting with you.",

        "Sure! We can talk about that."

    ];


    const randomIndex =
        Math.floor(
            Math.random() * replies.length
        );


    return replies[randomIndex];
}


function getShaadiCurrentTime() {

    const now =
        new Date();

    let hours =
        now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;


    return `${hours}:${minutes} ${ampm}`;
}


/* ================= EXTRA BUTTONS ================= */

function showNewChatMessage() {

    window.location.href =
        "profiles.html";
}


function showChatInfo() {

    if (!shaadiCurrentChatId) return;


    const profile =
        shaadiChatProfiles.find(function(item) {

            return item.id === shaadiCurrentChatId;

        });


    if (!profile) return;


    alert(
        "Chatting with " +
        profile.name +
        "\n\nThis is a frontend demo messaging feature."
    );
}


function showAttachmentMessage() {

    alert(
        "Attachment sharing is available as a demo feature."
    );
}


/* ================= SECURITY HELPER ================= */

function escapeShaadiChatText(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* ================= MOBILE CHAT ================= */

function setupShaadiMobileChat() {

    const container =
        document.querySelector(".messages-container");

    if (!container) return;


    document.addEventListener(
        "click",
        function(event) {

            const item =
                event.target.closest(".conversation-item");

            if (!item) return;


            if (window.innerWidth <= 650) {

                container.classList.add("chat-open");

            }

        }
    );

}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            !document.body.classList.contains(
                "messages-page"
            )
        ) {
            return;
        }


        loadShaadiConversations();
        const openChatId = Number(
    localStorage.getItem("openChatProfileId")
);

if (openChatId) {

    setTimeout(function() {

        openShaadiChat(openChatId);

        localStorage.removeItem(
            "openChatProfileId"
        );

    }, 100);

}

        setupShaadiMobileChat();

    }
);
function togglePassword() {

    const password = document.getElementById("loginPassword");
    const icon = document.querySelector(".password-toggle i");

    if (!password || !icon) return;

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


function forgotPassword(event) {

    event.preventDefault();

    alert(
        "Password recovery is a demo feature in this frontend project."
    );
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (localStorage.getItem("isRegistered") !== "true") {

            alert("Please register your profile first.");

            return;
        }

        const email =
            document.getElementById("loginEmail").value.trim();

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInEmail", email);

        window.location.href = "dashboard.html";

    });

}
/* =========================================================
   CONTACT FORM
   ========================================================= */

const shaadiMatchContactForm = document.getElementById("contactForm");

if (shaadiMatchContactForm) {

    shaadiMatchContactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all the fields.");
            return;
        }

        const contactMessage = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };

        let messages = JSON.parse(
            localStorage.getItem("shaadiMatchContactMessages") || "[]"
        );

        messages.push(contactMessage);

        localStorage.setItem(
            "shaadiMatchContactMessages",
            JSON.stringify(messages)
        );

        alert(
            "Thank you, " +
            name +
            "! Your message has been submitted successfully."
        );

        shaadiMatchContactForm.reset();

    });

}
/* =========================================================
   SHAADIMATCH - MESSAGES / CHAT SYSTEM
   ========================================================= */

const shaadiChatProfilesv2 = [
    {
        id: 1,
        name: "Aarav Mehta",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        status: "Online",
        profileId: 1
    },
    {
        id: 2,
        name: "Ananya Sharma",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        status: "Online",
        profileId: 2
    },
    {
        id: 3,
        name: "Rohan Verma",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        status: "Online",
        profileId: 3
    },
    {
        id: 4,
        name: "Priya Kapoor",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80",
        status: "Online",
        profileId: 4
    }
];

let shaadiChatCurrentId = null;


/* ================= DEFAULT MESSAGES ================= */

const shaadiChatDefaultMessages = {

    1: [
        {
            type: "received",
            text: "Hi! It's nice to connect with you.",
            time: "10:20 AM"
        },
        {
            type: "sent",
            text: "Hi Aarav! Nice to connect with you too.",
            time: "10:22 AM"
        },
        {
            type: "received",
            text: "How are you doing today?",
            time: "10:24 AM"
        }
    ],

    2: [
        {
            type: "received",
            text: "Hello! Thanks for connecting.",
            time: "9:45 AM"
        },
        {
            type: "sent",
            text: "Hello Ananya! Hope you are doing well.",
            time: "9:48 AM"
        }
    ],

    3: [
        {
            type: "received",
            text: "Hi! I came across your profile.",
            time: "Yesterday"
        },
        {
            type: "sent",
            text: "Hello Rohan, nice to meet you.",
            time: "Yesterday"
        }
    ],

    4: [
        {
            type: "received",
            text: "Hey! Thank you for your interest.",
            time: "Yesterday"
        }
    ]

};


/* ================= STORAGE ================= */

function shaadiChatGetMessages(profileId) {

    const key = "shaadiMatchChat_" + profileId;

    const saved = localStorage.getItem(key);

    if (saved) {

        try {
            return JSON.parse(saved);
        } catch (error) {
            return shaadiChatDefaultMessages[profileId] || [];
        }

    }

    return shaadiChatDefaultMessages[profileId] || [];
}


function shaadiChatSaveMessages(profileId, messages) {

    const key = "shaadiMatchChat_" + profileId;

    localStorage.setItem(
        key,
        JSON.stringify(messages)
    );
}


/* ================= LOAD CONTACTS ================= */

function shaadiChatLoadContacts() {

    const container =
        document.getElementById("chatContacts");

    if (!container) return;

    container.innerHTML = "";

    shaadiChatProfiles.forEach(function(profile) {

        const messages =
            shaadiChatGetMessages(profile.id);

        const lastMessage =
            messages.length > 0
                ? messages[messages.length - 1]
                : null;

        const preview =
            lastMessage
                ? lastMessage.text
                : "Start a conversation";

        const time =
            lastMessage
                ? lastMessage.time
                : "";

        const contact =
            document.createElement("div");

        contact.className =
            "chat-contact";

        contact.dataset.id =
            profile.id;

        contact.innerHTML = `

            <div class="chat-contact-avatar">

                <img
                    src="${profile.image}"
                    alt="${profile.name}"
                >

                <span class="contact-online"></span>

            </div>

            <div class="chat-contact-info">

                <div class="chat-contact-top">

                    <h4>${profile.name}</h4>

                    <span class="chat-time">
                        ${time}
                    </span>

                </div>

                <p class="chat-last-message">
                    ${shaadiChatEscapeHTML(preview)}
                </p>

            </div>

        `;

        contact.addEventListener(
            "click",
            function() {

                shaadiChatOpenChat(
                    profile.id
                );

            }
        );

        container.appendChild(contact);

    });

}


/* ================= OPEN CHAT ================= */

function shaadiChatOpenChat(profileId) {

    const profile =
        shaadiChatProfiles.find(
            function(item) {
                return item.id === profileId;
            }
        );

    if (!profile) return;

    shaadiChatCurrentId =
        profileId;

    const welcome =
        document.getElementById("chatWelcome");

    const activeChat =
        document.getElementById("activeChat");

    if (welcome) {
        welcome.style.display = "none";
    }

    if (activeChat) {
        activeChat.classList.add("show");
    }


    const image =
        document.getElementById("chatHeaderImage");

    const name =
        document.getElementById("chatHeaderName");

    const status =
        document.getElementById("chatHeaderStatus");


    if (image) {
        image.src = profile.image;
        image.alt = profile.name;
    }

    if (name) {
        name.textContent = profile.name;
    }

    if (status) {
        status.textContent = profile.status;
    }


    document
        .querySelectorAll(".chat-contact")
        .forEach(function(item) {

            item.classList.remove("active");

            if (
                Number(item.dataset.id) ===
                profileId
            ) {
                item.classList.add("active");
            }

        });


    shaadiChatRenderMessages();

    const input =
        document.getElementById("chatInput");

    if (input) {
        input.focus();
    }

}


/* ================= RENDER MESSAGES ================= */

function shaadiChatRenderMessages() {

    const container =
        document.getElementById("chatMessages");

    if (!container || !shaadiChatCurrentId) {
        return;
    }

    const messages =
        shaadiChatGetMessages(
            shaadiChatCurrentId
        );

    container.innerHTML = `

        <div class="chat-date">
            TODAY
        </div>

    `;


    messages.forEach(function(message) {

        const row =
            document.createElement("div");

        row.className =
            "chat-message-row " +
            message.type;


        const bubble =
            document.createElement("div");

        bubble.className =
            "chat-bubble";


        bubble.innerHTML = `

            ${shaadiChatEscapeHTML(message.text)}

            <span class="chat-message-time">
                ${shaadiChatEscapeHTML(message.time)}
            </span>

        `;


        row.appendChild(bubble);

        container.appendChild(row);

    });


    container.scrollTop =
        container.scrollHeight;

}


/* ================= SEND MESSAGE ================= */

function shaadiChatSendMessage() {

    const input =
        document.getElementById("chatInput");

    if (!input || !shaadiChatCurrentId) {
        return;
    }

    const text =
        input.value.trim();

    if (!text) {
        return;
    }


    const messages =
        shaadiChatGetMessages(
            shaadiChatCurrentId
        );


    const now =
        new Date();


    let hours =
        now.getHours();

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    const time =
        hours +
        ":" +
        minutes +
        " " +
        ampm;


    messages.push({

        type: "sent",

        text: text,

        time: time

    });


    shaadiChatSaveMessages(
        shaadiChatCurrentId,
        messages
    );


    input.value = "";

    shaadiChatRenderMessages();

    shaadiChatLoadContacts();


    setTimeout(
        function() {

            shaadiChatDemoReply();

        },
        900
    );

}


/* ================= DEMO REPLY ================= */

function shaadiChatDemoReply() {

    if (!shaadiChatCurrentId) {
        return;
    }

    const replies = [

        "That sounds nice! 😊",

        "I'd be happy to know more about you.",

        "Thanks for sharing that.",

        "That's great! Tell me more.",

        "Nice to hear from you!"

    ];


    const reply =
        replies[
            Math.floor(
                Math.random() *
                replies.length
            )
        ];


    const messages =
        shaadiChatGetMessages(
            shaadiChatCurrentId
        );


    const now =
        new Date();


    let hours =
        now.getHours();

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    messages.push({

        type: "received",

        text: reply,

        time:
            hours +
            ":" +
            minutes +
            " " +
            ampm

    });


    shaadiChatSaveMessages(
        shaadiChatCurrentId,
        messages
    );


    shaadiChatRenderMessages();

    shaadiChatLoadContacts();

}


/* ================= SEARCH CONTACTS ================= */

function shaadiChatSearchContacts() {

    const input =
        document.getElementById("chatSearch");

    if (!input) return;

    const search =
        input.value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(".chat-contact")
        .forEach(function(contact) {

            const name =
                contact
                    .querySelector("h4")
                    ?.textContent
                    .toLowerCase() || "";


            contact.style.display =
                name.includes(search)
                    ? "flex"
                    : "none";

        });

}


/* ================= VIEW PROFILE ================= */

function shaadiChatViewProfilev2() {

    if (!shaadiChatCurrentId) {
        return;
    }

    const profile =
        shaadiChatProfiles.find(
            function(item) {
                return item.id === shaadiChatCurrentId;
            }
        );

    if (!profile) return;

    window.location.href =
        "profile-detail.html?id=" +
        profile.profileId;

}


/* ================= ESCAPE HTML ================= */

function shaadiChatEscapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= ENTER TO SEND ================= */

function shaadiChatEnterHandler(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        shaadiChatSendMessage();

    }

}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const contacts =
            document.getElementById(
                "chatContacts"
            );

        if (!contacts) {
            return;
        }


        shaadiChatLoadContacts();


        const search =
            document.getElementById(
                "chatSearch"
            );

        if (search) {

            search.addEventListener(
                "input",
                shaadiChatSearchContacts
            );

        }


        const input =
            document.getElementById(
                "chatInput"
            );

        if (input) {

            input.addEventListener(
                "keydown",
                shaadiChatEnterHandler
            );

        }

    }
);
/* =========================================================
   SHAADIMATCH DASHBOARD
   ========================================================= */

function loadShaadiMatchDashboard() {

    const dashboardPage =
        document.querySelector(".dashboard-page");

    if (!dashboardPage) {
        return;
    }

    /* -----------------------------------------
       GET REGISTERED USER
    ----------------------------------------- */

    let profile = null;

    try {
        const savedProfile =
            localStorage.getItem("shaadiMatchProfile");

        if (savedProfile) {
            profile = JSON.parse(savedProfile);
        }
    } catch (error) {
        console.error(
            "Unable to load saved profile:",
            error
        );
    }


    /* -----------------------------------------
       USER INFORMATION
    ----------------------------------------- */

    const userName =
        profile &&
        profile.personal &&
        profile.personal.fullName
            ? profile.personal.fullName
            : "My Profile";

    const location =
        profile &&
        profile.personal &&
        profile.personal.location
            ? profile.personal.location
            : "Location not added";

    const education =
        profile &&
        profile.career &&
        profile.career.education
            ? profile.career.education
            : "Education not added";

    const occupation =
        profile &&
        profile.career &&
        profile.career.occupation
            ? profile.career.occupation
            : "Occupation not added";

    const firstLetter =
        userName !== "My Profile"
            ? userName.charAt(0).toUpperCase()
            : "S";


    /* -----------------------------------------
       SET USER NAME
    ----------------------------------------- */

    const nameElements = [
        "headerUserName",
        "sidebarUserName",
        "welcomeUserName",
        "profileName"
    ];

    nameElements.forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = userName;
        }

    });


    /* -----------------------------------------
       SET PROFILE DETAILS
    ----------------------------------------- */

    const locationElement =
        document.getElementById("profileLocation");

    if (locationElement) {
        locationElement.innerHTML =
            `<i class="fa-solid fa-location-dot"></i>
             ${location}`;
    }


    const occupationElement =
        document.getElementById("profileOccupation");

    if (occupationElement) {
        occupationElement.innerHTML =
            `<i class="fa-solid fa-briefcase"></i>
             ${occupation}`;
    }


    const educationElement =
        document.getElementById("profileEducation");

    if (educationElement) {
        educationElement.innerHTML =
            `<i class="fa-solid fa-graduation-cap"></i>
             ${education}`;
    }


    /* -----------------------------------------
       AVATARS
    ----------------------------------------- */

    const avatars = [
        "headerAvatar",
        "sidebarAvatar",
        "profileAvatar"
    ];

    avatars.forEach(function(id) {

        const avatar =
            document.getElementById(id);

        if (avatar) {
            avatar.textContent = firstLetter;
        }

    });


    /* -----------------------------------------
       SHORTLIST COUNT
    ----------------------------------------- */

    let shortlisted = [];

    try {
        shortlisted =
            JSON.parse(
                localStorage.getItem(
                    "shortlistedProfiles"
                ) || "[]"
            );
    } catch (error) {
        shortlisted = [];
    }

    const shortlistCount =
        document.getElementById("shortlistCount");

    if (shortlistCount) {
        shortlistCount.textContent =
            Array.isArray(shortlisted)
                ? shortlisted.length
                : 0;
    }


    /* -----------------------------------------
       SENT INTEREST COUNT
    ----------------------------------------- */

    let sentInterests = [];

    try {
        sentInterests =
            JSON.parse(
                localStorage.getItem(
                    "sentInterests"
                ) || "[]"
            );
    } catch (error) {
        sentInterests = [];
    }


    /* -----------------------------------------
       MATCH COUNT
    ----------------------------------------- */

    let matchCount = 0;

    if (Array.isArray(sentInterests)) {

        sentInterests.forEach(function(name) {

            if (
                name === "Ananya Sharma" ||
                name === "Priya Kapoor"
            ) {
                matchCount++;
            }

        });

    }


    const matchCountElement =
        document.getElementById("matchCount");

    if (matchCountElement) {
        matchCountElement.textContent =
            matchCount;
    }


    /* -----------------------------------------
       PROFILE COMPLETION
    ----------------------------------------- */

    let completion = 35;

    if (profile) {

        completion = 60;

        if (
            profile.personal &&
            profile.personal.fullName &&
            profile.personal.location
        ) {
            completion += 10;
        }

        if (
            profile.career &&
            profile.career.education &&
            profile.career.occupation
        ) {
            completion += 10;
        }

        if (
            profile.family
        ) {
            completion += 10;
        }

        if (
            profile.preferences
        ) {
            completion += 10;
        }

    }


    const completionText =
        document.getElementById(
            "profileCompletion"
        );

    const progressBar =
        document.getElementById(
            "profileProgressBar"
        );

    if (completionText) {
        completionText.textContent =
            completion + "%";
    }

    if (progressBar) {
        progressBar.style.width =
            completion + "%";
    }


    /* -----------------------------------------
       RECOMMENDED PROFILES
    ----------------------------------------- */

    loadDashboardRecommendedProfiles();
}


/* =========================================================
   DASHBOARD RECOMMENDED PROFILES
   ========================================================= */

function loadDashboardRecommendedProfiles() {

    const container =
        document.getElementById(
            "dashboardRecommendedProfiles"
        );

    if (!container) {
        return;
    }


    /*
       Use the profile list already present
       in the main ShaadiMatch JS.
    */

    let profiles = [];

    if (
        typeof shaadiMatchProfiles !== "undefined" &&
        Array.isArray(shaadiMatchProfiles)
    ) {
        profiles = shaadiMatchProfiles;
    }


    /*
       If another profile variable is being used,
       try that too.
    */

    if (
        profiles.length === 0 &&
        typeof profilesData !== "undefined" &&
        Array.isArray(profilesData)
    ) {
        profiles = profilesData;
    }


    if (profiles.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:30px;
                color:#999;
                font-size:12px;
            ">
                No recommended profiles available.
            </div>
        `;

        return;
    }


    /* Show first four profiles */

    const recommended =
        profiles.slice(0, 4);


    container.innerHTML =
        recommended.map(function(profile) {

            const initial =
                profile.name
                    ? profile.name
                        .charAt(0)
                        .toUpperCase()
                    : "?";


            return `
                <div class="dashboard-match-card">

                    <div class="dashboard-match-image">

                        ${
                            profile.image
                                ? `<img
                                    src="${profile.image}"
                                    alt="${profile.name}"
                                    style="
                                        width:100%;
                                        height:100%;
                                        object-fit:cover;
                                    "
                                >`
                                : `<span>${initial}</span>`
                        }

                    </div>


                    <div class="dashboard-match-info">

                        <h3>
                            ${profile.name || "Profile"}
                        </h3>

                        <p>
                            <i class="fa-solid fa-user"></i>
                            ${profile.age || "-"} years
                        </p>

                        <p>
                            <i class="fa-solid fa-location-dot"></i>
                            ${profile.location || "-"}
                        </p>

                        <p>
                            <i class="fa-solid fa-briefcase"></i>
                            ${profile.occupation || "-"}
                        </p>


                        <div class="dashboard-match-actions">

                            <a href="profile-detail.html?id=${profile.id}">
                                View
                            </a>

                            <button
                                type="button"
                                onclick="sendInterest('${profile.name}')"
                            >
                                <i class="fa-regular fa-heart"></i>
                                Interest
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================================================
   DASHBOARD LOGOUT
   ========================================================= */

function logoutUser() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInEmail");

    window.location.href =
        "index.html";
}


/* =========================================================
   START DASHBOARD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadShaadiMatchDashboard();

    }
);