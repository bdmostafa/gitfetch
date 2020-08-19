// Instantiate ui
const ui = new UI;

// Instantiate github
const github = new Github;
// github.getProfile('mostafa')




document.getElementById('searchProfile').addEventListener('keyup', searchProfile);

function searchProfile(e) {
    const searchText = e.target.value;
    // Get profile data
    // validation
    if (searchText !== "") {
        // Make http call
        github.getProfile(searchText)
            .then(data => {
                if (data.mainData.message === 'Not Found') {
                    // Show alert message
                    ui.showAlert('Oops! User not found. Please try again.', 'alert alert-danger');
                } else {
                    // Display basic profile
                    ui.paintProfile(data);
                    // console.log(data);

                    // Display repos data
                    ui.paintRepos(data.repos_data);
                    // console.log(data.repos_data);
                }

            })
    } else {
        // Clear Profile
        ui.clearProfile();
    }




}