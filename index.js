const form = document.getElementById("response-form");
const input = document.getElementById("response-input");

const elements = [
  document.getElementById("l1"),
  document.getElementById("l2"),
  document.getElementById("l3"),
  document.getElementById("l4"),
  document.getElementById("l5"),
  document.getElementById("question"),
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function introduction() {
  for (const el of elements) {
    el.classList.add("show");
    await wait(1800);
  }
}

introduction();

async function gerarHash(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto.trim().toLowerCase());

  const buffer = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function carregarHashCorreto() {
  const res = await fetch("./levels/1dai3/1dai3.json");
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
    sessionStorage.setItem("level1", "true");
    window.location.href = "levels/1dai3/index.html";
  } else {
    alert("Resposta incorreta. Tente novamente!");
  }
});
