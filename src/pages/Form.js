import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import { Plugins, CameraResultType } from "@capacitor/core";
import _ from "lodash";
import axios from "axios";

import "./form.css";

import {
  IonApp,
  IonLabel,
  IonButton,
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonGrid,
  IonCol,
  IonRow,
  IonDatetime,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonImg,
  IonNote,
  IonCheckbox,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonLoading,
  IonAlert,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const myStyle = { color: "#ef5350" };
const { Camera } = Plugins;

let KVArray = [];
let images = [];
let signatures = [];
const Form = () => {
  const history = useHistory();
  const myData = useSelector((state) => state.inputFields);
  const { controls, logo, title, id } = myData;

  const [photo, setPhoto] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [sig, setSig] = useState("");
  const [isSig, setIsSig] = useState("asd");
  const [isPhoto, setIsPhoto] = useState("asd");

  const { handleSubmit, control, errors } = useForm();

  const signature = useRef({});

  const clearSig = () => {
    signature.current.clear();
    setSig("");
  };

  // console.log(errors.keys);

  const onSubmit = async (data) => {
    //clear array
    KVArray = [];

    //loop through controls
    // eslint-disable-next-line
    controls.map((c) => {
      //make key from control label
      const key = _.toLower(c.label).replace(/[^A-Z0-9]/gi, "");

      //retrive value
      let val = null;
      if (c.type === "Signature") {
        val = signatures[c.label];
      } else if (c.type === "Image") {
        val = images[c.label];
      } else {
        val = data[key];
      }

      //push a keyVal object
      KVArray.push({
        type: c.type,
        key: c.label,
        value: val,
      });
    });

    setShowLoading(true);
    const res = await axios
      .post("https://xtreme-id.online/api/application/" + id, KVArray)
      .catch((err) => console.log(err.message));

    setShowLoading(false);
    console.log(res);
    setShowAlert(true);
  };

  const verifyField = () => {
    !sig && setIsSig(false);
    !photo && setIsPhoto(false);
    console.log(KVArray);
  };

  return (
    <IonApp id={id}>
      <IonPage>
        <IonContent>
          <IonGrid>
            <div className="ion-text-center ion-margin">
              <IonRow>
                <IonCol>
                  <div className="vertical-center">
                    <div>
                      <IonImg className="align-center" src={logo} />
                    </div>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonLabel>{title}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonNote>
                    Please provide all the required information carefully then
                    submit the application
                  </IonNote>
                </IonCol>
              </IonRow>
            </div>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              {controls.map((c, i) => {
                const name = _.toLower(c.label).replace(/[^A-Z0-9]/gi, "");

                if (c.type === "Image") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonImg
                          style={{ width: "100%" }}
                          src={
                            !photo ? "https://i.imgur.com/SccOGY2.png" : photo
                          }
                          onClick={async () => {
                            setShowLoading(true);
                            const image = await Camera.getPhoto({
                              quality: 90,
                              allowEditing: true,
                              correctOrientation: true,
                              resultType: CameraResultType.Base64,
                            });
                            setShowLoading(false);

                            const imageUrl = image.base64String;

                            setPhoto("data:image/png;base64," + imageUrl);

                            //push key val pair

                            images[c.label] = imageUrl;
                          }}
                        />
                        <span style={myStyle}>
                          {!photo && !isPhoto ? "Please upload an image" : ""}
                        </span>
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Text") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">{c.label}</IonLabel>
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonInput
                                onIonChange={onChange}
                                placeholder={c.hint}
                              />
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={
                              c.required && {
                                required: "This is a required field",
                              }
                            }
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Phone") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">{c.label}</IonLabel>
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonInput
                                onIonChange={onChange}
                                placeholder={c.hint}
                              />
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={
                              c.required && {
                                required: "This is a required field",
                              }
                            }
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Email") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">{c.label}</IonLabel>
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonInput
                                id="my-input"
                                onIonChange={onChange}
                                placeholder={c.hint}
                              />
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={{
                              required: "This is a required field",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                              },
                            }}
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Date") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">{c.label}</IonLabel>
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonDatetime
                                displayFormat="DD MMMM YYYY"
                                onIonChange={onChange}
                                value="2020-12-15"
                              />
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={
                              c.required && {
                                required: "This is a required field",
                              }
                            }
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Paragraph") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">{c.label}</IonLabel>{" "}
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonTextarea
                                onIonChange={onChange}
                                placeholder={c.hint}
                              />
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={
                              c.required && {
                                required: "This is a required field",
                              }
                            }
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }
                if (c.type === "Selection") {
                  const options = c.options.split(",");
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel>{c.label}</IonLabel>
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonSelect
                                placeholder="Select One"
                                onIonChange={onChange}
                              >
                                {options.map((o, i) => {
                                  return (
                                    <IonSelectOption key={i}>
                                      {o}
                                    </IonSelectOption>
                                  );
                                })}
                              </IonSelect>
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={
                              c.required && {
                                required: "This is a required field",
                              }
                            }
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }
                if (c.type === "Checkbox") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel>{c.label}</IonLabel>
                          <Controller
                            render={({ onChange, onBlur, value }) => (
                              <IonCheckbox
                                slot="end"
                                onIonChange={onChange}
                                onIonBlur={onBlur}
                              />
                            )}
                            control={control}
                            defaultValue=""
                            name={name}
                            rules={
                              c.required && {
                                required: "This is a required field",
                              }
                            }
                          />
                        </IonItem>
                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Radio") {
                  const options = c.options.split(",");

                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <Controller
                          render={({ onChange, onBlur, value }) => (
                            <IonList>
                              <IonRadioGroup onIonChange={onChange}>
                                <IonListHeader>
                                  <IonLabel>{c.label}</IonLabel>
                                </IonListHeader>

                                {options.map((o, i) => {
                                  return (
                                    <IonItem key={i}>
                                      <IonLabel>{o}</IonLabel>
                                      <IonRadio value={o} />
                                    </IonItem>
                                  );
                                })}
                              </IonRadioGroup>
                            </IonList>
                          )}
                          control={control}
                          defaultValue=""
                          name={name}
                          rules={
                            c.required && {
                              required: "This is a required field",
                            }
                          }
                        />

                        <ErrorMessage
                          errors={errors}
                          name={name}
                          as={<div style={myStyle} />}
                        />
                      </IonCol>
                    </IonRow>
                  );
                }

                if (c.type === "Signature") {
                  return (
                    <IonRow key={i}>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">{c.label} </IonLabel>
                          <SignaturePad
                            penColor="green"
                            canvasProps={{ width: 500, height: 200 }}
                            ref={signature}
                          />
                        </IonItem>
                        <span style={myStyle}>
                          {!sig && !isSig ? "Please update the signature" : ""}
                        </span>
                        <IonRow>
                          <IonCol>
                            <IonButton
                              expand="full"
                              type="button"
                              onClick={clearSig}
                            >
                              Clear
                            </IonButton>
                          </IonCol>
                          <IonCol>
                            <IonButton
                              expand="full"
                              type="button"
                              onClick={() => {
                                const base64 = signature.current
                                  .getTrimmedCanvas()
                                  .toDataURL()
                                  .split(",")[1];
                                setSig(base64);
                                signatures[c.label] = base64;
                              }}
                            >
                              Update
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  );
                }

                return null;
                //somethig
              })}
              <div>
                <IonButton expand="full" type="submit" onClick={verifyField}>
                  Submit Application
                </IonButton>
              </div>
            </form>
            {/* <div className="ion-padding">
              ERRORS: <pre>{JSON.stringify(errors, null, 1)}</pre>
            </div> */}
          </IonGrid>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={"Success"}
            message="Your application was successfully uploaded"
            buttons={["OK"]}
          />
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Form;
