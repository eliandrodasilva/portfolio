const GITHUB_USERNAME = "eliandrodasilva";

export async function loadGithubData(currentLocale) {
  const content = document.getElementById("githubContent");
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!userRes.ok) throw new Error("GitHub API error");

    const user = await userRes.json();
    renderGithubProfile(user, currentLocale);
    content.style.display = "block";
  } catch (err) {
    console.error("GitHub API error:", err);
  }
}

function renderGithubProfile(user, currentLocale) {
  document.getElementById("ghAvatar").src = user.avatar_url;
  document.getElementById("ghName").textContent = user.name || user.login;
  document.getElementById("ghLogin").textContent = `@${user.login}`;
  document.getElementById("ghRepos").textContent = user.public_repos;
  document.getElementById("ghFollowers").textContent = user.followers;
  document.getElementById("ghFollowing").textContent = user.following;
  document.getElementById("ghProfileLink").href = user.html_url;

  const bio = document.getElementById("ghBio");
  bio.textContent = user.bio || "";
  bio.style.display = user.bio ? "" : "none";

  if (user.location) {
    document.getElementById("ghLocationText").textContent = user.location;
    document.getElementById("ghLocation").style.display = "inline-flex";
  }
  if (user.company) {
    document.getElementById("ghCompanyText").textContent = user.company;
    document.getElementById("ghCompany").style.display = "inline-flex";
  }

  const joined = new Date(user.created_at);
  const label = currentLocale === "pt-BR" ? "Membro desde" : "Member since";
  const dateLocale = currentLocale === "pt-BR" ? "pt-BR" : "en-US";
  document.getElementById("ghCreatedAt").textContent =
    `${label} ${joined.toLocaleDateString(dateLocale, { month: "long", year: "numeric" })}`;
}