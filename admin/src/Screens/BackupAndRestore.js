import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from '@mui/material/Alert';

export default function BackupAndRestore() {
  const [restoreinput, setrestoreinput] = useState(false);

  const [databaseFile, setdatabaseFile] = useState();
  const [restoreLoading, setrestoreLoading] = useState(false)
  const [restoreSuccess, setrestoreSuccess] = useState(false)
  const restore = async () => {
    if (!databaseFile) return;
    setrestoreLoading(true)
    console.log(databaseFile);

    const formData = new FormData();
    formData.append("database", databaseFile);

    const res = await axios.post("/api/restore/backup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status ===200) {
      setrestoreLoading(false)
      setrestoreSuccess(true)
      setTimeout(() => {
        window.location.reload()
      } , 2000)
    }
  };
  const [downloadLink, setdownloadLink] = useState("");
  const [downloadAble, setdownloadAble] = useState(false);
  const [backupLoading, setbackupLoading] = useState(false);

  const backup = async () => {
    setbackupLoading(true);
    const res = await axios.post("/api/restore/download", {});

    if (res.data.path) {
      setbackupLoading(false);
      setdownloadLink(res.data.path);
      setdownloadAble(true);
    }
  };

  const download = () => {
    window.open(downloadLink);
  };
  return (
    <>
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      {/* <h4 class="card-title">All news categories</h4> */}
                      <div className="col-sm-9 ">
                        <div
                          style={{
                            maxWidth: "20%",
                            margin: "0 auto",
                          }}
                        >
                          <button
                            disabled={backupLoading}
                            onClick={backup}
                            type="button"
                            className="btn  btn-primary"
                          >
                            {backupLoading ? (
                              <>
                                <ClipLoader loading={backupLoading} />
                              </>
                            ) : (
                              <>
                                Backup <CloudDownloadIcon />
                              </>
                            )}
                          </button>
                          {downloadAble ? (
                            <>
                              <button
                                type="button"
                                className="btn  mt-2 btn-info"
                                onClick={download}
                              >
                                Download
                              </button>
                            </>
                          ) : null}

                          <button
                            onClick={() =>
                              setrestoreinput((previousState) => !previousState)
                            }
                            type="button"
                            className="btn mt-5 btn-primary"
                            disabled={restoreLoading}
                          >
                            {
                              restoreLoading? <>
                                <ClipLoader loading={restoreLoading} />
                              </> : <>
                                 Restore <RestoreIcon />
                              </>
                            }
                         
                          </button>
                          {restoreinput ? (
                            <>
                              <div className="mt-5">
                                <input
                                  accept=".gzip"
                                  onChange={(e) =>
                                    setdatabaseFile(e.target.files[0])
                                  }
                                  type={"file"}
                                />
                                <button
                                     disabled={restoreLoading}
                                  onClick={restore}
                                  type="button"
                                  className="btn mt-5 btn-dark"
                                >
                                  {
                              restoreLoading? <>
                                <ClipLoader loading={restoreLoading} />
                              </> : <>
                              Push Database
                              </>
                            }
                                 
                                </button>
                              </div>
                            </>
                          ) : null}
                    
                          


                        </div>
                        {
                          restoreSuccess ? <>
                            <div className='mt-2'>

                            <Alert  severity="success">Data restored successfully</Alert>
                              </div>
                            </> : null
                          }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
