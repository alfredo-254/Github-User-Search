async function searchUser() {
    const username = document.getElementById('searchInput').value;
    
    if (!username) {
        alert('Please enter a username.');
        return;
    }

    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch user repositories
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repoData = await repoResponse.json();

        // Display user information
        displayUser(userData);

        // Display repositories
        displayRepositories(repoData);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
    }
}

function displayUser(userData) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <img src="${userData.avatar_url}" alt="User Avatar" width="100">
        <h2>${userData.login}</h2>
        <p>${userData.name || 'No name available'}</p>
        <p>${userData.bio || 'No bio available'}</p>
        <p>Followers: ${userData.followers}, Following: ${userData.following}</p>
    `;
}

function displayRepositories(repoData) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = '<h3>Repositories</h3>';
    
    if (repoData.length === 0) {
        repositoriesContainer.innerHTML += '<p>No repositories found for this user.</p>';
    } else {
        const repoList = document.createElement('ul');
        repoData.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            repoList.appendChild(repoItem);
        });
        repositoriesContainer.appendChild(repoList);
    }
}
// Toggle between searching for users and repositories
function toggleSearchType() {
    searchType = searchType === 'user' ? 'repo' : 'user';
    const searchInput = document.getElementById('searchInput');
    searchInput.placeholder = `Enter GitHub ${searchType === 'user' ? 'username' : 'repository'} keyword`;
    searchInput.value = ''; // Clear the input field
}