import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api from "../services/api";
import "./Question.css";

export default function Question() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    api.get(`/problems/${id}`).then(res => {
      setProblem(res.data);
      setCode(res.data.starterCode?.java || "");
    });
  }, [id]);

  if (!problem) {
    return <div className="q-loading">Loading problem...</div>;
  }

  return (
    <div className="leetcode-layout">
      {/* LEFT PANEL */}
      <div className="question-panel">
        <h1 className="q-title">
          {problem.id}. {problem.title}
        </h1>

        <div className="q-meta">
          <span className={`q-difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>

          {problem.topics?.map(t => (
            <span key={t} className="q-tag">{t}</span>
          ))}
        </div>

        <h3>Description</h3>
        <div
          className="q-desc"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />

        <h3>Examples</h3>
        {problem.examples.map((ex, i) => (
          <div key={i} className="q-example">
            <b>Input:</b> {ex.input}{"\n"}
            <b>Output:</b> {ex.output}
            {ex.explanation && `\nExplanation: ${ex.explanation}`}
          </div>
        ))}

        <h3>Constraints</h3>
        <ul>
          {problem.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        {problem.followUp && (
          <>
            <h3>Follow-up</h3>
            <p className="q-desc">{problem.followUp}</p>
          </>
        )}

        <h3>Companies</h3>
        <div className="q-companies">
          {problem.companies.map(c => (
            <span key={c} className="q-company">{c}</span>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="editor-panel">
        <div className="editor-header">
          <span>Java</span>
          <div>
            <button className="run-btn">Run</button>
            <button className="submit-btn">Submit</button>
          </div>
        </div>

        <Editor
          height="100%"
          language="java"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />
      </div>
    </div>
  );
}
