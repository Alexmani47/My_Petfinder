document.addEventListener("DOMContentLoaded", function () {
    fetchPets();
});

function fetchPets() {
    fetch("http://localhost:3000/pets")
        .then(response => response.json())
        .then(pets => displayPets(pets));
}

function displayPets(pets) {
    let petList = document.getElementById("pet-list");
    petList.innerHTML = ""; // Clears existing context before adding others

    pets.forEach(pet => {
        let li = document.createElement("li");
        li.textContent = pet.name;

        let img = document.createElement("img");
        img.src = pet.image;
        img.alt = pet.name;
        img.classList.add("pet-image");

        li.appendChild(img);
        li.addEventListener("click", () => showPetDetails(pet));

        petList.appendChild(li);
    });
}

function showPetDetails(pet) {
    let petDetails = document.getElementById("pet-details");
    petDetails.innerHTML = ""; // Clear previous content

    // Create ofthe a section to display the pet
    let title = document.createElement("h2");
    title.textContent = pet.name;

    let img = document.createElement("img");
    img.src = pet.image;
    img.alt = pet.name;
    img.classList.add("pet-detail-image");

    let breed = document.createElement("p");
    breed.innerHTML = `<strong>Breed:</strong> ${pet.breed}`;

    let age = document.createElement("p");
    age.innerHTML = `<strong>Age:</strong> ${pet.age} years old`;

    let status = document.createElement("p");
    status.innerHTML = `<strong>Status:</strong> <span id="status-text">${pet.adopted ? "Adopted" : "Available"}</span>`;

    let adoptButton = document.createElement("button");
    adoptButton.id = "adopt-btn";
    adoptButton.textContent = pet.adopted ? "Already Adopted" : "Adopt Me!";

    if (pet.adopted) {
        adoptButton.disabled = true;
    } else {
        adoptButton.addEventListener("click", () => adoptPet(pet.id));
    }

    // Append the petDetails ...phew this was tricky
    petDetails.append(title, img, breed, age, status, adoptButton);
}

function adoptPet(petId) {
    fetch(`http://localhost:3000/pets/${petId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adopted: true })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("status-text").textContent = "Adopted";
        let adoptButton = document.getElementById("adopt-btn");
        adoptButton.textContent = "Already Adopted";
        adoptButton.disabled = true;
        alert("Pet adopted successfully!");
        fetchPets(); // Refresh pet list
    });
}
