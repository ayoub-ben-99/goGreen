// 📌 Import required modules
import colors from "colors";        // For colored console output
import jsonfile from "jsonfile";    // To write data to a JSON file
import moment from "moment";        // To handle and manipulate dates
import simpleGit from "simple-git"; // To execute Git commands
import random from "random";        // To generate random numbers

// 📌 Initialize Git and define the JSON file path
const git = simpleGit();
const path = "./data.json";

/**
 * Function to create multiple Git commits on a specific date
 * @param {string} date - The date for the commit (formatted)
 * @param {number} commitsPerDay - Number of commits to be created on that day
 */
const markCommit = async (date, commitsPerDay) => {
  for (let i = 0; i < commitsPerDay; i++) {
    // Write the date to the JSON file
    await jsonfile.writeFile(path, { date });

    // Stage and commit the file with the specified date
    await git.add([path])
      .commit(date, { "--date": date })
      .catch(err => console.error(colors.red("Commit Error :("), err));
  }
};

/**
 * Function to generate commits for multiple days
 * @param {number} days - Number of days to generate commits for
 */
const makeCommits = async (days) => {
  for (let i = 0; i < days; i++) {
    // Generate a date starting from one year ago
    const date = moment().subtract(1, "y").add(i, "d").format();

    // Randomly assign between 5 to 10 commits per day (for strong green effect)
    const commitsPerDay = random.int(5, 10);

    // Log the progress
    console.log(colors.green(`:) => Creating ${commitsPerDay} commits on ${date}`));

    // Call function to create commits
    await markCommit(date, commitsPerDay);
  }

  // Push all commits to GitHub after processing all days
  console.log(colors.blue("🚀 Pushing all commits to GitHub..."));
  git.push();
};

// 📌 Start generating commits for the last 365 days
makeCommits(365);
