document.addEventListener("DOMContentLoaded", () => {
    const commInput = document.getElementById("commInput");
    const postButton = document.getElementById("postBtn");
    const commsContainer = document.getElementById("comments");

    postButton.addEventListener("click", () => {
        const commText = commInput.value.trim();

        if (commText === "") {
            alert("You need to have text in your comment :)");
            return;
        }

        const commDiv = document.createElement("div");
        commDiv.className = "commContainer";
        commDiv.textContent = commText;

        commsContainer.appendChild(commDiv);

        commInput.value = "";
    });
});

const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const mainContent = document.getElementById('main-content');

// Open the sidebar
openBtn.addEventListener('click', () => {
    sidebar.style.left = '0'; // Bring the sidebar into view
    mainContent.classList.add('main-content-open'); // Push main content to the side
});

// Close the sidebar
closeBtn.addEventListener('click', () => {
    sidebar.style.left = '-250px'; // Hide the sidebar
    mainContent.classList.remove('main-content-open'); // Reset main content
});