if (sessionStorage.getItem("level1") !== "true") {
  window.location.href = "../../index.html";
}

const form = document.getElementById("response-form");
const input = document.getElementById("response-input");

async function gerarHash(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto.trim().toLowerCase());

  const buffer = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function carregarHashCorreto() {
  const res = await fetch("../2d4dv/2d4dv.json");
  const data = await res.json();

  return data.hash;
}

let hashCorreto = null;

(async () => {
  hashCorreto = await carregarHashCorreto();
})();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const value = input.value.trim().toLowerCase();
  input.value = "";

  if (!value || !hashCorreto) return;

  const hash = await gerarHash(value);
  console.log("Hash gerado:", hash);
  console.log("Hash correto:", hashCorreto);

  if (hash === hashCorreto) {
    sessionStorage.setItem("level2", "true");
    window.location.href = "../2d4dv/index.html";
  } else {
    alert("Resposta incorreta. Tente novamente!");
  }
});
