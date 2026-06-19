const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");
const imgBox = document.getElementById("imgBox");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", generateQR);

qrText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateQR();
    }
});

function generateQR() {
    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter text or URL");
        return;
    }

    const qrUrl =
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;

    qrImage.src = qrUrl;

    qrImage.onload = () => {
        imgBox.style.display = "block";
        downloadBtn.classList.remove("hidden");
    };
}

downloadBtn.addEventListener("click", async () => {
    const response = await fetch(qrImage.src);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "QRify.png";
    a.click();

    URL.revokeObjectURL(url);
});