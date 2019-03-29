import Link from "next/link";
import Header from "../components/header";
import JobList from "../components/JobList"
import firebase from "firebase/app";
import "firebase/firestore";

const Config = {
  apiKey: "AIzaSyCHX1cEv1Xljcd8QYGrTskFXMuxekWyIdk",
  authDomain: "gigg-app.firebaseapp.com",
  databaseURL: "https://gigg-app.firebaseio.com",
  projectId: "gigg-app",
  storageBucket: "",
  messagingSenderId: "331574135772"
};
//https://ilikekillnerds.com/2018/02/solving-issue-firebase-app-named-default-already-exists/

//get job by shortID
//get jobs list

const loadFirebase = Config => {
  return !firebase.apps.length
    ? firebase.initializeApp(Config)
    : firebase.app();
};

loadFirebase(Config);
const db = firebase.firestore();
const getJobs = () => {
  return db
    .collection("jobs")
    .get()
    .then(querySnapshot => {
      // https://stackoverflow.com/questions/46047984/firebase-web-automatically-insert-createdat-and-updatedat-fields
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const element = querySnapshot.docs[i];
        return Object.assign(element.data(), {
          id: element.id,
          time: element.get("created_at")
        });
      }
    })
    .catch(error => {
      console.log("getJobs ", error);
    });
};

function Index({ jobs }) {
  return (
    <main>
      <Header />
      <section>
        <Link href="/about">
          <a>Go to About Me</a>
        </Link>
      </section>
      {jobs.map(data => {data.title})}
      <hr />
      <h2>Jobs</h2>
      {!jobs ? (
        <p>no jobs found</p>
      ) : (
        <JobList jobs={jobs} />
      )}
    </main>
  );
}
Index.getInitialProps = async () => {
  let jobs = [];
  await getJobs()
    .then(data => {
      jobs.push(data);
    })
    .catch(error => {
      console.log("-->", error);
    });
  return { jobs: jobs };
};
export default Index;
