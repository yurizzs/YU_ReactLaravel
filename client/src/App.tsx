import "./App.css";

function App() {
  let studentName: string = "Juan Dela Cruz";
  let age: number = 16;
  let isActive: boolean = true;

  let gradeLevel: "Grade 7" | "Grade 8" | "Grade 9";
  gradeLevel = "Grade 9";

  let status: "Active" | "Inactive";
  status = "Active";

  function getRemarks(score: number): string {
    if (score >= 90) {
      return "Excellent";
    } else if (score >= 75) {
      return "Passed";
    } else {
      return "Failed";
    }
  }

  console.log(getRemarks(95));

  interface Student {
    name: string;
    age: number;
    gradeLevel: string;
    status: "Active" | "Inactive";
    score: number;
  }

  let student1: Student = {
    name: "Iris Tiffany Yu",
    age: 20,
    gradeLevel: "3rd Year College",
    status: "Active",
    score: 95,
  };
  //

  return (
    <>
      {" "}
      {/* FRAGMENT */}
      <h1 className="text-5xl">Student Profille</h1>
      <br />
      <div className="flex justify-between flex-row">
        <div className="flex flex-col justify-center">
          <p>Student Name: {student1.name} </p>
          <p>Student Age: {student1.age} </p>
          <p>Student Grade Level: {student1.gradeLevel} </p>
          <p>Student Status: {student1.status} </p>
          <p>Student Score: {student1.score} </p>
          <p>Student Remarks: {getRemarks(student1.score)} </p>
        </div>
        <div>
          <p>Student Name: {studentName}</p>
          <p>Student Age: {age}</p>
          <p>Student Active: {isActive ? "Yes" : "No"}</p>
          <p>Student Grade Level: {gradeLevel}</p>
          <p>Student Status: {status}</p>
        </div>
      </div>
    </>
  );
}

export default App;
