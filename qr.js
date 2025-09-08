const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"), // now this exists!
  downloadBtn = document.createElement("button"),
  copyBtn = document.createElement("button");

let preValue = "";

// Add extra buttons dynamically
downloadBtn.innerText = "Download QR Code";
downloadBtn.style.display = "none";
copyBtn.innerText = "Copy QR Link";
copyBtn.style.display = "none";

wrapper.querySelector(".qr-code").appendChild(downloadBtn);
wrapper.querySelector(".qr-code").appendChild(copyBtn);

// Generate QR
generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue) {
    alert("⚠ Please enter some text or a URL!");
    return;
  }
  if (preValue === qrValue) return;
  preValue = qrValue;

  generateBtn.innerText = "⏳ Generating...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    qrValue
  )}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
    downloadBtn.style.display = "inline-block";
    copyBtn.style.display = "inline-block";
  });
});

// Clear QR when input empty
qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    qrImg.src = "";
    downloadBtn.style.display = "none";
    copyBtn.style.display = "none";
  }
});

// Download QR
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qrImg.src;
  link.download = "qr-code.png";
  link.click();
});

// Copy QR link
copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(qrImg.src)
    .then(() => {
      copyBtn.innerText = "✅ Copied!";
      setTimeout(() => (copyBtn.innerText = "Copy QR Link"), 1500);
    })
    .catch(() => alert("❌ Failed to copy link"));
});
