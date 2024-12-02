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
