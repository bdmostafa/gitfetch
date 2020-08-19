// Handle UI section of GitFetch App
class UI {
    constructor() {
        // Selector
        this.displayProfile = document.getElementById('display-profile');
    }
    // Display profile basic data
    paintProfile({
        // Receive object destructuring data as parameter
        profile_pic,
        user_name,
        profile_url,
        name,
        followers,
        following,
        public_repos,
        public_gists,
        company,
        blog,
        user_location,
        email,
        hireable,
        twitter_username,
        profile_type,
        created_at,
        last_updated_at
    }) {
        // HTML template on Profile Section
        const templateHTML = `
                        <div class="container bg-gradient-dark">
                                <h3 class="page-heading mb-3">Profile</h3>
                                <div class="card card-body mb-3">

                                    <div class="row">
                                        <div class="col-md-3">
                                            <img class="img-fluid mb-2" src="${profile_pic}">
                                            <a href="${profile_url}" target="_blank" class="btn btn-primary btn-block mb-4">${user_name}</a>
                                            <a href="${profile_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                                        </div>
                                        <div class="col-md-9">
                                            <span class="badge badge-success">
                                                Followers: ${followers}
                                            </span>
                                            <span class="badge badge-info">
                                                Following: ${following}
                                            </span>
                                            <span class="badge badge-primary">
                                                Public Repos: ${public_repos}
                                            </span>
                                            <span class="badge badge-secondary">
                                                Public Gists: ${public_gists}
                                            </span>
                                            <br><br>
                                            <ul class="list-group">
                                                <li class="list-group-item">Name: ${name || 'Not Found'}</li>
                                                <li class="list-group-item">Company: ${company || 'Not Available'}</li>
                                                <li class="list-group-item">Blog: <a href="${blog}" class="text-white" target="_blank">${blog || 'Not Available'}</a> </li>
                                                <li class="list-group-item">Location: ${user_location || 'Not Available'}</li>
                                                <li class="list-group-item">Email: ${email || 'Not Found'}</li>
                                                <li class="list-group-item">Hireable: ${hireable || 'Not Available'}</li>
                                                <li class="list-group-item">Twitter Username: ${twitter_username || 'Not Found'}</li>
                                                <li class="list-group-item">Profile Type: ${profile_type || 'Not Available'}</li>
                                                <li class="list-group-item">Member Since: ${created_at.substring(0, 10) || 'Not Available'}</li>
                                                <li class="list-group-item">Last Update: ${last_updated_at || 'Not Available'}</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container bg-gradient-dark">
                                <h3 class="page-heading mb-3">Latest Repos</h3>
                                <div id="display-repos"></div>
                            </div>
                        `;
        this.displayProfile.innerHTML = templateHTML;
    }
    // Display repos data
    paintRepos(reposdata) {
        let templateHTML = '';
        // console.log(reposdata);

        reposdata.forEach(repo => {
            // console.log(repo);

            // Live link button executes (if available)
            function liveLink() {
                if (repo.homepage) {
                    return `<div class="row ml-2">
                        <button type="" class="btn btn-outline-danger mt-4"><a class="text-white" href="${repo.homepage}" target="_blank">Live Link</a></button>
                        </div>
                    `
                }
            }

            templateHTML += `
                            <div class="card card-body mb-2">
                                <div class="row">
                                    <div class="col-md-6">
                                    <a href="${repo.html_url}" target="_blank"><h3>${repo.name}</h3></a>
                                    <p>Language: ${repo.language || 'Not Found'} </p>
                                    <p>${repo.description || 'Description not found'}</p>
                                    <span>Created at ${repo.created_at.substring(0, 10)} </span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row mt-2 ml-1">
                                            <span class="badge badge-info mr-2 mt-2">
                                                Size: ${repo.size}
                                            </span>
                                            <span class="badge badge-primary mr-2 mt-2">
                                                Stars: ${repo.stargazers_count}
                                            </span>
                                            <span class="badge badge-secondary mr-2 mt-2">
                                                Watchers: ${repo.watchers_count}
                                            </span>
                                            <span class="badge badge-success mr-2 mt-2">
                                                Forks: ${repo.forks_count}
                                            </span>
                                            <span class="badge badge-danger mr-2 mt-2">
                                                Repo ID: ${repo.id}
                                            </span>
                                        </div>
                                        ${liveLink() || ''}
                                    </div>
                                </div>
                            </div> 
                       `
        })
        this.displayRepos = document.getElementById('display-repos');
        this.displayRepos.innerHTML = templateHTML;
    }
    // Alert message
    showAlert(message, className) {
        // Clear alert message (if remaining)
        this.clearAlert();
        const div = document.createElement('div');
        // Add classes to our alert div
        div.className = className;
        // Text inside our alert box
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.searchContainer');
        // Get search box
        const search = document.querySelector('.searchProfile');
        // Insert Alert before search input area
        container.insertBefore(div, search);

        // Timeout after 3 sec
        setTimeout(() => {
            this.clearAlert();
        }, 1000);
    }
    // Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }
    // Clear profile
    clearProfile() {
        this.displayProfile.innerHTML = '';
    }
}