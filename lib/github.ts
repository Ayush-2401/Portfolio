export async function getGithubStats() {
  const username = "Ayush-2401";
  const headers: HeadersInit = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return { stars: 0, repos: 0, forks: 0 };
    }

    const repos = await res.json();
    const stats = repos.reduce((acc: any, repo: any) => {
      if (!repo.fork) {
        acc.stars += repo.stargazers_count;
        acc.repos += 1;
        acc.forks += repo.forks_count;
      }
      return acc;
    }, { stars: 0, repos: 0, forks: 0 });

    return stats;
  } catch (error) {
    return { stars: 0, repos: 0, forks: 0 };
  }
}
