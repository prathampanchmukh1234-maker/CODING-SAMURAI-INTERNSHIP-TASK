// 🔐 Redirect to login if not logged in
if (!localStorage.getItem("token")) {
  window.location.href = "/auth.html";
}

async function createPost() {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("image", image.files[0]);

  document.getElementById("loader").classList.remove("hidden");

  await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: { "Authorization": localStorage.getItem("token") },
    body: formData
  });

  title.value = "";
  content.value = "";
  loadPosts();
}

async function loadPosts() {
  document.getElementById("loader").classList.remove("hidden");

  const res = await fetch("http://localhost:5000/posts");
  const posts = await res.json();

  document.getElementById("posts").innerHTML = posts.map(p => `
    <div class="post">
      <h3>📌 ${p.title}</h3>
      ${p.image ? `<img src="http://localhost:5000/${p.image}" width="200">` : ""}
      <p>${p.content}</p>
      <small>By ${p.author ? p.author.name : "Unknown"}</small>
    </div>
  `).join("");

  document.getElementById("loader").classList.add("hidden");
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/auth.html";
}

loadPosts();
