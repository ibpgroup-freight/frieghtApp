type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
type initialState = {
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
type QuotationItem = {
  id: string;
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  // UnitPerKg: string;
  Currency: string;
  RateAmountPerUnit: string;
  MinRateAmountPerUnit: string;
  MinCostAmountPerUnit?: string;
  CostAmountPerUnit?: string;
  // minUnits: string;
  // maxUnits: string;
  Units: string;
  Weight: string;
};
type Inquiry = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PortOfOrigin?: string;
  PortOfDestination?: string;
  PlaceOfOrigin?: string;
  PlaceOfDestination?: string;
  VehicleDetails?: string;
  DriverDetails?: string;
  RouteDetails?: string;
  AirportOfOrigin?: string;
  AirportOfDestination?: string;
  FlightInformation?: string;
  TypeOfCargo?: string;
  isAirinquiry: boolean;
  Weight: string;
  Dimensions: string;
  TransitTime: string;
  ShipmentTerms: string;
  CarrierName: string;
  CustomContainerType: string;
  ContainerType?: string;
  type: string;
  Departure: string;
  EstimatedArrival: string;
  CustomerTRN: string;
  CustomerEmail: string;
  CustomerPhoneNo: string;
  VesselName?: string;
  VesselDetails?: string;
  othershippingDetails?: string;
  ShippingLaneDetails?: string;
  jobInitials: string;
  method: string;
  quotationId?: string;
  PlaceOfIssue?: string;
  PlaceOfReceipt?: string;
  PayableAt?: string;
  PlaceOfDelivery?: string;
  Movement?: string;
};
type InquiryStore = {
  inquiry: Inquiry;
  setItemInquiry: (i: Inquiry) => void;
  resetInquiry: () => void;
};
type actionType = keyof Inquiry;
type action = {
  type: actionType;
  payload: {
    value: string;
  };
};

type qactionType = keyof QuotationItem;
type QuotationAction = {
  type: qactionType;
  payload: {
    value: string;
  };
};
type ItemsStore = {
  totalItems: number;
  items: QuotationItem[];
  ladingItems: LadingItems[];
  AddLadingItem: (item: LadingItems) => void;
  AddItem: (item: QuotationItem) => void;
  RemoveItem: (id: string) => void;
  resetItems: () => void;
  setitemsArray: (items: QuotationItem[]) => void;
  setBillOfLadingItems: (items: LadingItems[]) => void;
};
type LadingItems = {
  Dimensions: string;
  Weight: string;
  ContainerNo: string;
  SealNo: string;
  NoOfPackages: string;
  PackageDescription: string;
};
type Job = {
  id?: string;
  jobid: string;
  inquiry: Inquiry;
  Items: QuotationItem[];
  status: JobStatus;
};
type Quotation = {
  id?: string;
  quotationId: string;
  inquiry: Inquiry;
  Items: QuotationItem[];
  status: QuotationStatus;
};
type JobStatus = "completed" | "pending" | "cancelled";
type QuotationStatus = "approved" | "pending" | "disapproved";

type JobStore = {
  Jobs: Job[];
  setJob: (i: Job) => Promise<void>;
  populateJobs: (j: Job[]) => void;
};
type QuotationStore = {
  Quotations: Quotation[];
  setQuotation: (i: Quotation) => Promise<void>;
  populateQuotations: (j: Quotation[]) => void;
};
type Model = {
  toggle: boolean;
  setToggle: () => void;
};
type UserStore = {
  role: string;
  isloggedIn: boolean;
  name: string;
  email: string;
  AuthStateLogIn: () => void;
  AuthStateLogOut: () => void;
};
interface registrationTypes {
  displayName: string;
  email: string;
  password: string;
}

type ladleInquiry = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PlaceOfOrigin?: string;
  PlaceOfDestination?: string;
  VesselName: string;
  RouteDetails?: string;
  TypeOfCargo?: string;
  Weight: string;
  TransitTime: string;
  ShipmentTerms: string;
  CarrierName: string;
  TotalContainers: number;
  CustomerTRN: string;
  CustomerEmail: string;
  CustomerPhoneNo: string;
  VesselDetails?: string;
  othershippingDetails?: string;
  jobInitials: string;
  method: string;
  PlaceOfIssue?: string;
  PlaceOfReceipt?: string;
  PayableAt?: string;
  PlaceOfDelivery?: string;
  Movement?: string;
  NotifyAddress: string;
  Currency: string;
  PortOfLoading: string;
  PortOfDischarge: string;
  ExportReference: string;
  ForwardingAgent: string;
  ConsigneeReference: string;
  address: string;
};
type InvoiceStore = {
  jobInfo: cargoInfo & Inquiry;
  ladleInfo: cargoInfo & ladleInquiry;
  setladleInfo: (j: cargoInfo & ladleInquiry) => void;
  Items: QuotationItem[];
  ladingItems: LadingItems[];
  setladingItems: (j: LadingItems[]) => void;
  setInfo: (j: cargoInfo & Inquiry) => void;
  setItems: (j: QuotationItem[]) => void;
};

type cargoInfo = {
  Jobid: string;
  Discount: number;
  OutstandingDues: number;
  VATAmount: number;
  address: string;
  specialInstructions?: string;
  termsAndConditions?: string;
};

type Contact = {
  contactId?: string;
  Name: string;
  Email: string;
  Address: string;
  Phone: string;
  Company: string;
};

type FetchContact = { id: string; contacts: Contact };

type User = {
  email: string;
  role: string;
  phone: string;
  username: string;
  userId?: string;
};

type DashbboardFetch = {
  totalUsers: number;
  jobs: number;
  completedJobs: number;
  pendingJobs: number;
  contacts: number;
  cancelledJobs: number;
  quotations: number;
};

type CompanyInfoStore = {
  Location: CompanyLocationInfo[];
  setInformation: (a: CompanyLocationInfo[]) => void;
  resetInformation: () => void;
};
type CompanyLocationInfo = {
  name: string;
  office: string;
  location: string;
  country: string;
  telephone: string;
  pobox: string;
  TRN: string;
  email: string;
  web?: string;
  BankInfo: CompanyBankInfo;
  key?: string;
};

type CompanyBankInfo = {
  accName: string;
  bankName: string;
  accNo: string;
  IBAN: string;
  branch: string;
  swift: string;
};
