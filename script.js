const scriptURL = "https://script.google.com/macros/s/AKfycbyfuniD2n8tTv2gzp8b_eKxalNNk9TGW3oK-t0DvVBcZqOzCJo81LUljNaf61btJ2u-/exec";

document.getElementById("submitBtn")
.addEventListener("click", function () {

    const team = document.getElementById("team").value.trim();
    const answer = document.getElementById("answer").value.trim();

    if (!team || !answer) {
        alert("Fill all fields");
        return;
    }

    const btn = document.getElementById("submitBtn");
    const box = document.getElementById("statusBox");
    const bar = document.getElementById("progressBar");
    const text = document.getElementById("statusText");

    btn.disabled = true;

    box.style.display = "block";
    bar.style.width = "30%";
    text.innerText = "Submitting...";

    const formData = new FormData();
    formData.append("team", team);
    formData.append("answer", answer);

    fetch(scriptURL, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        bar.style.width = "100%";

        setTimeout(() => {

            if (data.status === "correct") {
              text.innerText = "✅ Correct Answer Submitted!";
              bar.style.background = "#22c55e";

    // CLEAR INPUTS
            document.getElementById("team").value = "";
            document.getElementById("answer").value = "";
            
            }
            else if (data.status === "duplicate") {
                text.innerText = "⚠️ Already Submitted";
                bar.style.background = "#f59e0b";
            }
            else {
                text.innerText = "❌ Wrong Answer";
                bar.style.background = "#ef4444";
            }

            btn.disabled = false;

        }, 400);
    })
    .catch(() => {
        text.innerText = "Submission Failed";
        bar.style.background = "#ef4444";
        btn.disabled = false;
    });
});