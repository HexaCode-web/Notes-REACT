import React from "react";

export default function Editor(props) {
  if (props.Note) {
    return (
      <div className="Editor" key={props.Id}>
        <div className="Header-wrapper">
          <input
            value={props.Note.Header}
            onChange={props.HandleChange}
            name="Header"
          ></input>
        </div>
        <div className="TextArea-wrapper">
          <textarea
            value={props.Note.Body}
            onChange={props.HandleChange}
            name="Body"
          ></textarea>
        </div>
      </div>
    );
  } else {
    return <div className="Editor" key={props.Id}></div>;
  }
}
