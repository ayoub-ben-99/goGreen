import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  jsonfile.writeFile(path, { date }, () => {
    git.add([path])
      .commit(date, { "--date": date })
      .then(() => git.push())
      .catch(err => console.error("Push Error:", err));
  });
};

const makeCommits = async (n) => {
  if (n === 0) {
    console.log("complete");
    return git.push();
  }

  const x = random.int(0, 54);
  const y = random.int(0, 60);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  console.log("loading... ", date);

  await jsonfile.writeFile(path, { date });

  git.add([path])
    .commit(date, { "--date": date })
    .then(() => makeCommits(n - 1))
    .catch(err => console.error("Commit Error:", err));
};

makeCommits(100);
