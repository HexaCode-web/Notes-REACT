import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const [Notes, SetNotes] = React.useState(
    JSON.parse(localStorage.getItem("Notes")) || []
  );
  const [CurrentNote, setCurrentNote] = React.useState("");
  const AddNote = () => {
    let Id = nanoid();
    let Header = "Title Of Your Note";
    let Body = "New Note For Your Important Stuff";
    SetNotes((prev) => {
      return [...prev, { Id, Header, Body }];
    });
  };
  const GetCurrentNote = (id) => {
    return Notes.find((note) => {
      if (note.Id === id) {
        setCurrentNote(note);
      }
    });
  };
  const ChangeNote = (event) => {
    setCurrentNote((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
    SetNotes((oldNotes) => {
      let SortedArray = [];
      oldNotes.forEach((note) => {
        if (note.Id === CurrentNote.Id) {
          SortedArray.unshift({
            ...CurrentNote,
          });
        } else {
          SortedArray.push(note);
        }
      });
      return SortedArray;
    });
  };
  const DeleteNote = (event, currentNoteID) => {
    event.stopPropagation();
    console.log(currentNoteID);
    SetNotes((prev) => {
      return prev.filter((note) => {
        return note.Id !== currentNoteID;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(Notes));
  }, [Notes]);

  return Notes.length > 0 ? (
    <Split
      sizes={[40, 60]}
      minSize={200}
      direction="horizontal"
      className="split"
    >
      <Sidebar
        notes={Notes}
        handleClick={AddNote}
        GetID={GetCurrentNote}
        CurrentNote={CurrentNote}
        DeleteNote={DeleteNote}
      />
      <Editor Note={CurrentNote} HandleChange={ChangeNote} />
    </Split>
  ) : (
    <div className="New">
      <h1> you have no notes</h1>
      <button onClick={AddNote}>Create Note</button>
    </div>
  );
}
