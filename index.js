import colors from "colors";
import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

const markCommit = async (date, commitsPerDay) => {
  for (let i = 0; i < commitsPerDay; i++) {
    await jsonfile.writeFile(path, { date });

    await git.add([path])
      .commit(date, { "--date": date })
      .catch(err => console.error(colors.red("Commit Error:"), err));
  }
};

const makeCommits = async (days) => {
  for (let i = 0; i < days; i++) {
    const date = moment().subtract(1, "y").add(i, "d").format();

    const commitsPerDay = random.int(5, 10);

    console.log(colors.green(`✅ ${commitsPerDay} commits on ${date}`));

    await markCommit(date, commitsPerDay);
  }

  console.log(colors.blue("🚀 Pushing to GitHub..."));
  git.push();
};

makeCommits(365); 
