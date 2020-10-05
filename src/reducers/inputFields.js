import { SET_FIELDS } from "../actions/types";

const initialState = {
  id: 1,
  title: "CrossCode",
  logo: "https://xtreme-id.online/assets/img/organizations/C01.png",
  controls: [
    {
      type: "Image",
      label: "Picture",
      hint: "Your fresh image",
      options: null,
      order: 1,
      required: true,
    },
    {
      type: "Text",
      label: "First Name",
      hint: "John",
      options: null,
      order: 2,
      required: true,
    },
    {
      type: "Text",
      label: "Last Name",
      hint: "Doe",
      options: null,
      order: 3,
      required: true,
    },
    {
      type: "Email",
      label: "Email Address",
      hint: "some@email.com",
      options: null,
      order: 7,
      required: true,
    },
    {
      type: "Phone",
      label: "Phone Number",
      hint: "0306 7103600",
      options: null,
      order: 8,
      required: true,
    },
    {
      type: "Signature",
      label: "Signature",
      hint: "Please provide your signature",
      options: null,
      order: 9,
      required: true,
    },
    {
      type: "Date",
      label: "DOB",
      hint: "Date of Birth",
      options: null,
      order: 10,
      required: true,
    },
    {
      type: "Paragraph",
      label: "Instructions",
      hint: "Special Instructions",
      options: null,
      order: 11,
      required: true,
    },
    {
      type: "Selection",
      label: "Payment Mode",
      hint: "Please select payment mode",
      options: "Credit,ACH,Debit",
      order: 12,
      required: true,
    },
    {
      type: "Checkbox",
      label: "Swore?",
      hint: "Please check if you swore",
      options: null,
      order: 13,
      required: false,
    },
    {
      type: "Radio",
      label: "Gender",
      hint: "Please select your gender",
      options: "Male,Femail",
      order: 14,
      required: true,
    },
  ],
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FIELDS:
      state = {};
      return {
        ...payload,
      };

    default:
      return state;
  }
};
