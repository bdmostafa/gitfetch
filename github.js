// Handle github backend part =======================


class Github {
    constructor() {
        // this.client_ID = client_ID;
        // this.client_SECRET = client_SECRET;
        this.repos_count = 10;
        this.repos_order = 'created: asc'
    }
    async getProfile(user) {
        // console.log(user);
        try {
            // Fetching the user data
            const fetchedProfile = await fetch(`https://api.github.com/users/${user}`);
            const profileData = await fetchedProfile.json();
            // console.log(profileData);

            // Fetching repos data
            const fetchedRepos = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_order}`);
            const reposData = await fetchedRepos.json();
            // console.log(reposData);

            // Return as an object of necessary (minimized) data from big data of Github
            return {
                // Whole data pass to catch 'message' property from it for validation
                mainData: profileData,
                // Profile basic necessary info
                profile_pic: profileData.avatar_url,
                user_name: profileData.login,
                name: profileData.name,
                profile_url: profileData.html_url,
                followers: profileData.followers,
                following: profileData.following,
                public_repos: profileData.public_repos,
                public_gists: profileData.public_gists,
                company: profileData.company,
                blog: profileData.blog,
                user_location: profileData.location,
                email: profileData.email,
                hireable: profileData.hireable,
                twitter_username: profileData.twitter_username,
                profile_type: profileData.type,
                created_at: profileData.created_at,
                last_updated_at: profileData.last_updated_at,

                // Repo related info
                repos_data: reposData
            }
        } catch (err) {
            console.log(err.message)
        }
    }
}