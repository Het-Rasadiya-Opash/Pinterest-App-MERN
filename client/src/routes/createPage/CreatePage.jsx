import React, { useEffect, useState } from "react";
import "./CreatePage.css";
import useAuthStore from "../../utils/authStore";
import IKImage from "../../components/image/Image";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/Editor/Editor";

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    const img = new Image();
    img.src = file ? URL.createObjectURL(file) : "";
    img.onload = () => {
      setPreviewImg({
        url: file ? URL.createObjectURL(file) : "",
        width: img.width,
        height: img.height,
      });
    };
  }, [file]);
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
        <button>{isEditing ? "Done" : "Publish"}</button>
      </div>

      {isEditing ? (
        <Editor previewImg={previewImg}/>
      ) : (
        <>
          <div className="createBottom">
            {previewImg.url ? (
              <div className="preview">
                <img src={previewImg.url} alt="" />
                <div className="editIcon" onClick={() => setIsEditing(true)}>
                  <IKImage path="/general/edit.svg" />
                </div>
              </div>
            ) : (
              <>
                <label htmlFor="file" className="upload">
                  <div className="uploadTitle">
                    <IKImage path="/general/upload.svg" />
                    <span>Choose a file</span>
                  </div>
                  <div className="uploadInfo">
                    We recommend using high quality .jpg files less than 20 MB
                    or .mp4 files less than 200 MB.
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </>
            )}
            <form className="createForm">
              <div className="createFormItem">
                <label htmlFor="title">Tile</label>
                <input
                  type="text"
                  placeholder="Add your title"
                  name="title"
                  id="title"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  rows={6}
                  placeholder="Add your description"
                  name="description"
                  id="description"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  placeholder="Add your link"
                  name="link"
                  id="link"
                />
              </div>
              <div className="createFormItem">
                <label htmlFor="board">Board</label>
                <select name="board" id="board">
                  <option>Choose a board</option>
                  <option value="1">Board 1</option>
                  <option value="2">Board 2</option>
                  <option value="3">Board 3</option>
                </select>
              </div>
              <div className="createFormItem">
                <label htmlFor="tags">Tagged topics</label>
                <input
                  type="text"
                  placeholder="Add your tags"
                  name="tags"
                  id="tags"
                />
                <small>Don't worry, people won't see your tags</small>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePage;
