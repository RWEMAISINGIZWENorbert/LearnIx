const verificationCode = document.getElementById("verificationCode");
const codeCopiedMessage = document.getElementById('codeCopiedMessage');

function copyCode() {
  const code = verificationCode.textContent.trim();

  navigator.clipboard.writeText(code)
    .then(() => {
      console.log("Code copied!");
    })
    .catch(() => {
      console.log("Copy failed");
    });

    codeCopiedMessage.classList.remove('notActive')
    setTimeout(()=>{
        codeCopiedMessage.classList.add('notActive')
    }, 3000)
}
