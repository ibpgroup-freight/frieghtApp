import React, { useReducer } from "react";
import useInquiryItem from "../store/Inquiry";

const InquiryReducer = (state: Inquiry, action: action) => {
  switch (action.type) {
    case "CustomerName":
    case "CustomerAddress":
    case "SalesPerson":
    case "PortOfOrigin":
    case "PortOfDestination":
    case "Weight":
    case "Dimensions":
    case "TransitTime":
    case "ShipmentTerms":
    case "ContainerType":
    case "CarrierName":
      return {
        ...state,
        [action.type.toString()]: action.payload.value,
      };
    default:
      return { ...state };
  }
};
function Inquiry(props: InquiryAndQuotationProps) {
  const { inquiry, setItemInquiry } = useInquiryItem();

  const [state, dispatch] = useReducer(InquiryReducer, inquiry);
  console.log(inquiry);
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
    { label: "Enter Port Of Origin", name: "PortOfOrigin", type: "text" },
    {
      label: "Enter Port Of Destination",
      name: "PortOfDestination",
      type: "text",
    },
  ];
  const Column2 = [
    { label: "Enter Weight", name: "Weight", type: "number" },
    { label: "Enter Dimensions", name: "Dimensions", type: "text" },
    {
      label: "Enter Transit Time",
      name: "TransitTime",
      type: "datetime-local",
      options: [],
    },
    {
      label: "Container Type",
      name: "ContainerType",
      type: "select",
      options: [
        "20ft",
        "40ft",
        "40 HC",
        "45 HC",
        "20 OT",
        "40 OT",
        "20 FR",
        "40 FR",
        "20 RF",
        "40 RF",
      ],
    },
  ];
  const Column3 = [
    {
      label: "Enter Shipment Terms",
      name: "ShipmentTerms",
      type: "select",
      options: ["Exworks", "FOB", "FCA"],
    },
    { label: "Enter Carrier Name", name: "CarrierName", type: "text" },
  ];
  console.log("Selected State", state);
  return (
    <div className="w-full flex flex-col justify-center space-y-7 py-5 flex-wrap">
      <div className="px-5 flex flex-col lg:flex-row justify-between w-full">
        <div className="flex flex-col space-y-1">
          {Column1Items.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type={i.type}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                name={i.name}
                value={state[i.name as keyof Inquiry]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof Inquiry,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {Column2.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              {i.type === "select" ? (
                <>
                  <select
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    name={i.name}
                    required
                    defaultValue={state[i.name as keyof Inquiry]}
                    onChange={(e) =>
                      dispatch({
                        type: i.name as keyof Inquiry,
                        payload: { value: e.target.value },
                      })
                    }
                  >
                    <option value="">Select Value </option>
                    {i.options?.map((o) => (
                      <option value={o} key={o}>{o}</option>
                    ))}
                  </select>
                </>
              ) : (
                <input
                  type={i.type}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  name={i.name}
                  value={state[i.name as keyof Inquiry]}
                  onChange={(e) =>
                    dispatch({
                      type: i.name as keyof Inquiry,
                      payload: { value: e.target.value },
                    })
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {Column3.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              {i.type === "select" ? (
                <>
                  <select
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    name={i.name}
                    required
                    onChange={(e) =>
                      dispatch({
                        type: i.name as keyof Inquiry,
                        payload: { value: e.target.value },
                      })
                    }
                  >
                    <option value="">Select Value </option>
                    {i.options?.map((o) => (
                      <option value={o} key={o}>{o}</option>
                    ))}
                  </select>
                </>
              ) : (
                <input
                  type={i.type}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  name={i.name}
                  value={state[i.name as keyof Inquiry]}
                  onChange={(e) =>
                    dispatch({
                      type: i.name as keyof Inquiry,
                      payload: { value: e.target.value },
                    })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center">
        <button
          className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={() => {
            console.log("Done");
            setItemInquiry(state);
            props.setstepNumber((p) => p + 1);
          }}
        >
          Add And Proceed To {props.actionName}
        </button>
      </div>
    </div>
  );
}

export default Inquiry;
