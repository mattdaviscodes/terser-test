import './styles.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { minify } from 'terser';
import { snippets } from './snippets';

const snippetOptions = Object.keys(snippets);

function App() {
  const [snippet, setSnippet] = useState('default');
  const [value, updateValue] = useState(snippets[snippet]);
  const [beautify, setBeautify] = useState(true);
  const [comments, setComments] = useState(true);
  const [compress, setCompress] = useState(false);
  const [mangle, setMangle] = useState(false);
  const output = minify(value, {
    parse: {
      ecma: 8,
    },
    compress: !compress
      ? false
      : {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
    mangle,
    output: {
      beautify,
      ecma: 5,
      comments,
      ascii_only: true,
    },
  });

  return (
    <div className="container">
      <div className="panel options-panel">
        <Checkbox
          id="beauitfy"
          label="Beautify"
          onChange={() => setBeautify(b => !b)}
          checked={beautify}
        />
        <Checkbox
          id="comments"
          label="Comments"
          onChange={() => setComments(c => !c)}
          checked={comments}
        />
        <Checkbox
          id="compress"
          label="Compress"
          onChange={() => setCompress(c => !c)}
          checked={compress}
        />
        <Checkbox
          id="mangle"
          label="Mangle"
          onChange={() => setMangle(m => !m)}
          checked={mangle}
        />
        <div className="form-item snippets">
          <label htmlFor="snippets">Snippets</label>
          <select
            id="snippets"
            onChange={event => {
              setSnippet(event.target.value);
              updateValue(snippets[event.target.value]);
            }}
            value={snippet}>
            {snippetOptions.map(option => (
              <option>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="panel">
        <h2>Input</h2>
        <textarea
          className="panel-text"
          onChange={event => {
            updateValue(event.target.value);
          }}
          value={value}
        />
      </div>
      <div className="panel">
        <h2>Output</h2>
        <textarea
          className="panel-text"
          readOnly
          value={
            output.code !== undefined
              ? output.code
              : `${output.error.message}\n${output.error.col}:${
                  output.error.line
                }`
          }
        />
      </div>
    </div>
  );
}

function Checkbox({ id, label, onChange, checked }) {
  return (
    <div className="form-item">
      <input id={id} type="checkbox" onChange={onChange} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
