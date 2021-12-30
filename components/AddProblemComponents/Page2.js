import { useState } from "react";
import { uploadTestCases } from "../api/apis";
import uuid from "react-uuid";
import _ from "lodash";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { CloudUploadOutlined } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.min.css";

function Page2(props) {
  let [customTestCases, changeCustomTestCases] = useState([{ id: uuid() }]);
  let [testCases, changeTestCases] = useState([{ id: uuid() }]);
  const addNewFileInputSC = (e) => {
    e.preventDefault();
    const inputID = uuid();
    const newInputs = customTestCases.concat({ id: inputID });
    changeCustomTestCases(newInputs);
  };

  const deleteFileSC = (e) => {
    e.preventDefault();
    let temp = _.cloneDeep(customTestCases);
    var id = e.target.id;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp.splice(i, 1);
        break;
      }
    }
    changeCustomTestCases(temp);
  };

  const deleteFileTC = (e) => {
    e.preventDefault();
    let temp = _.cloneDeep(testCases);
    var id = e.target.id;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp.splice(i, 1);
        break;
      }
    }
    changeTestCases(temp);
  };

  const addNewFileInputTC = (e) => {
    e.preventDefault();
    const inputID = uuid();
    const newInputs = testCases.concat({ id: inputID });
    changeTestCases(newInputs);
  };

  let renderListSC = customTestCases.map((n, idx) => {
    const sci = "sc-" + n.id + "-i";
    const sco = "sc-" + n.id + "-o";
    return (
      <div className="overflow-hidden bg-black w-full p-4 space-y-3 rounded-2xl border border-custom-bg">
        <h1 className="lg:text-3xl text-white font-bold">
          Test Case - {idx + 1}
        </h1>
        <div className="each-custom space-y-2" id={n.id}>
          <div className="lg:flex justify-center lg:space-x-10">
            <div className="lg:space-x-6 ">
              <label className="text-lg font-bold">Input</label>
              <input type="file" id={sci} accept=".txt"></input>
            </div>
            <span className="border-r-2 border-custom-bg hidden lg:block"></span>
            <div className="lg:space-x-6 border-custom-bg">
              <label className="text-lg font-bold">Output</label>
              <input type="file" id={sco} accept=".txt"></input>
            </div>
          </div>
          <div className="add-tc-close-icon">
            <div id={n.id} onClick={(e) => deleteFileSC(e)}>
              X
            </div>
          </div>
        </div>
      </div>
    );
  });

  let renderListTC = testCases.map((n, idx) => {
    const tci = "tc-" + n.id + "-i";
    const tco = "tc-" + n.id + "-o";
    return (
      <div className="overflow-hidden bg-black p-4 space-y-3 rounded-2xl border border-custom-bg">
        <h1 className="text-3xl text-white">Test Case - {idx + 1}</h1>
        <div className="each-custom" id={n.id}>
          <div className="lg:flex justify-center lg:space-x-10">
            <div className="lg:space-x-6 ">
              <label className="text-lg font-bold">Input</label>
              <input type="file" id={tci} accept=".txt"></input>
            </div>
            <span className="border-r-2 border-custom-bg hidden lg:block"></span>
            <div className="lg:space-x-6 border-custom-bg">
              <label className="text-lg font-bold">Output</label>
              <input type="file" id={tco} accept=".txt"></input>
            </div>
          </div>
          <div className="add-tc-close-icon">
            <div id={n.id} onClick={(e) => deleteFileTC(e)}>
              X
            </div>
          </div>
        </div>
      </div>
    );
  });

  const postData = async (data) => {
    try {
      toast
        .promise(uploadTestCases.post("/", data), {
          pending: "Uploading ...",
          success: "✔️ Uploaded Successfully",
          error: "❌ Upload error try again",
        })
        .then((result) => {
          if (result.status === 200) {
            props.stepFunction(1);
          }
        });
    } catch (err) {
      console.log("Error", err.message);
    }
  };
  const submitted = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("custom_test_cases", customTestCases.length);
    data.append("test_cases", testCases.length);
    data.append("probId", props.problemId);
    for (var i = 0; i < customTestCases.length; i++) {
      const input_file = document.getElementById(
        "sc-" + customTestCases[i].id + "-i"
      ).files[0];
      const output_file = document.getElementById(
        "sc-" + customTestCases[i].id + "-o"
      ).files[0];
      data.append("sc-input" + (i + 1), input_file);
      data.append("sc-output" + (i + 1), output_file);
    }
    for (var i = 0; i < testCases.length; i++) {
      const input_file = document.getElementById("tc-" + testCases[i].id + "-i")
        .files[0];
      const output_file = document.getElementById(
        "tc-" + testCases[i].id + "-o"
      ).files[0];
      data.append("tc-input" + (i + 1), input_file);
      data.append("tc-output" + (i + 1), output_file);
    }
    postData(data);
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <Head>
        <title>Add Test Cases</title>
      </Head>
      <div className="lg:container m-auto">
        <div className="lg:pl-36 p-5 space-y-14">
          <h1 className="font-extrabold text-white text-center text-4xl lg:text-[3rem] lg:text-left">
            Add <span className="text-custom-bg">Problems</span>{" "}
            <CloudUploadOutlined className="text-[5rem]" />
          </h1>
          <hr />
          <h3 className="font-bold text-white text-center text-2xl lg:text-[2rem] lg:text-left">
            Sample Test Cases
          </h3>
          {renderListSC}
          <button
            className="ui right floated button btn-purple"
            onClick={(e) => addNewFileInputSC(e)}
          >
            Add{" "}
          </button>
          <h3 className="font-bold text-white text-center text-2xl lg:text-[2rem] lg:text-left">
            Test Cases
          </h3>
          {renderListTC}
          <button
            className="ui right floated button btn-purple"
            onClick={(e) => addNewFileInputTC(e)}
          >
            Add{" "}
          </button>
          <div>
            <button
              className="ui right floated button btn-purple"
              onClick={submitted}
            >
              Upload Test Cases{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page2;