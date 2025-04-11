document.addEventListener("DOMContentLoaded", () => {
    const commInput = document.getElementById("commInput");
    const postButton = document.getElementById("postBtn");
    const commsContainer = document.getElementById("comments");

    //load comments when the page loads
    fetch("http://localhost:3000/comments")
    .then(response => response.json())
    .then(data => {
        commsContainer.innerHTML = ""; //clear before adding
        data.forEach(comment => {
            const commDiv = document.createElement("div");
            commDiv.className = "commContainer";
            commDiv.textContent = comment.text;
            commsContainer.appendChild(commDiv);
        });
    })
    .catch(error => console.error("Error fetching comments:", error));

    postButton.addEventListener("click", () => {
        const commText = commInput.value.trim();

        if (commText === "") {
            alert("Brevity is the soul of wit, but you need to have text in your comment :)");
            return;
        }

        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: commText })
        })
        .then(response => response.json())
        .then(data => {
        //post of new comm
        const commDiv = document.createElement("div");
        commDiv.className = "commContainer";
        commDiv.textContent = commText;

        commsContainer.appendChild(commDiv);

        commInput.value = "";})
        .catch(error => console.error("Error posting comment:", error));
    });
});


openBtn.addEventListener('click', () => {
    sidebar.style.left = '0';
    mainContent.classList.add('main-content-open');
});


closeBtn.addEventListener('click', () => {
    sidebar.style.left = '-250px';
    mainContent.classList.remove('main-content-open');
});
