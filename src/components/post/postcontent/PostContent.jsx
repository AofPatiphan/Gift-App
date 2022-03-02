import axios from "../../../config/axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Skeleton from "@mui/material/Skeleton";
import { PostContext } from "../../../contexts/PostContext";
import "./postcontent.css";
import { AuthContext } from "../../../contexts/AuthContext";

function PostContent({ item, likePost, unLikePost, isLike }) {
  const { showEdit, setShowEdit, updatePost } = useContext(PostContext);
  const { loading, setLoading, user } = useContext(AuthContext);
  const [editText, setEditText] = useState(item.caption);
  const [editPicture, setEditPicture] = useState(item.pictureUrl);

  const handleSubmitEditPost = (e) => {
    e.preventDefault();
    updatePost(item.id, editText, editPicture);
  };

  const handleFileInputChange = async (e) => {
    setLoading(true);
    if (!e.target.value) return;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = async () => {
      await uploadImage(reader.result);
    };
    e.target.value = "";
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const res = await axios.post("/upload", {
        data: base64EncodedImage,
      });
      setEditPicture(res.data.url);
      setLoading(false);
    } catch (err) {
      alert("File size too large.");
    }
  };

  return (
    <div
      className="modal fade"
      id={`modal${item.id}`}
      tabIndex="-1"
      aria-labelledby={`${item.id}ModalLabel`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="left-menu">
              {item.userId === user.id ? (
                <>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowEdit(!showEdit)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    data-bs-toggle="modal"
                    data-bs-target={`#DeletePostModal${item.id}`}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="right-menu">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowEdit(false)}
              ></button>
            </div>
          </div>
          <div className="modal-body">
            {showEdit ? (
              <form onSubmit={handleSubmitEditPost}>
                <div className="modal-body">
                  {editPicture ? (
                    <div className="previewpostphoto d-flex justify-content-center">
                      {loading ? (
                        <Skeleton
                          className="previewpostphoto"
                          variant="rectangular"
                          width={340}
                          height={263}
                        />
                      ) : (
                        <img
                          src={editPicture}
                          alt=""
                          className="previewpostphoto"
                        />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="mb-2">
                    <label
                      htmlFor="caption"
                      className="col-form-label postTitle"
                    >
                      Caption :
                    </label>
                    <textarea
                      className="form-control"
                      id="caption"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="postFile" className="form-label">
                      Select your photo :
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="postFile"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setShowEdit(false)}
                  >
                    Close
                  </button>
                  {editPicture && !loading ? (
                    <button className="btn postBtn" data-bs-dismiss="modal">
                      Submit Post
                    </button>
                  ) : (
                    <button
                      className="btn postBtn"
                      data-bs-dismiss="modal"
                      disabled
                    >
                      Submit Post
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <>
                <div className="postCaption">{item.caption}</div>

                <div>
                  <img className="postPicture" src={item.pictureUrl} alt="" />
                </div>
              </>
            )}
          </div>
          {showEdit ? (
            <></>
          ) : (
            <div className="modalFooter">
              <div
                style={{
                  height: "40px",
                  width: "50px",
                  marginLeft: "10px",
                }}
                onClick={isLike ? unLikePost : likePost}
              >
                <i
                  className={`bi bi-heart${isLike ? "-fill" : ""} heartIcon`}
                />
              </div>
              <div className="like-amount">{item.Likes.length}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostContent;
