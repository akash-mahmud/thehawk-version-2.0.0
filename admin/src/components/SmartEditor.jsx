import React, { useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function SmartEditor({ userInfo, setuserInfo }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const uploadImageCallBack = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "stishio");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/mahmudakash177/upload",
      formdata
    );

    console.log(res.data.secure_url);
    return { data: { link: res.data.secure_url } };
  };

  return (
    <>
      <div className="form-group">
        <label>Description</label>
        <Editor
          editorState={editorState}
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            setuserInfo(
              draftToHtml(convertToRaw(newState.getCurrentContent()))
            );
          }}
          toolbar={{
            inline: { inDropdown: false },
            list: { inDropdown: false },
            code: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
            history: { inDropdown: false },

            image: {
              previewImage: true,
              uploadCallback: (file) => uploadImageCallBack(file),
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    </>
  );
}

