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
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
type Inquiry = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PortOfOrigin: string;
  PortOfDestination: string;
  Weight: string;
  Dimensions: string;
  TransitTime: string;
  ShipmentTerms: string;
  CarrierName: string;
  ContainerType: string;
  CustomContainerType: string;
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
  AddItem: (item: QuotationItem) => void;
  RemoveItem: (id: string) => void;
  resetItems: () => void;
  setitemsArray: (items: QuotationItem[]) => void;
};

type Job = {
  id?: string;
  jobid: string;
  inquiry: Inquiry;
  Items: QuotationItem[];
  status: JobStatus;
};
type JobStatus = "completed" | "pending" | "cancelled";
type JobStore = {
  Jobs: Job[];
  setJob: (i: Job) => Promise<void>;
  populateJobs: (j: Job[]) => void;
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

type InvoiceStore = {
  jobInfo: cargoInfo;
  Items: QuotationItem[];
  setInfo: (j: cargoInfo) => void;
  setItems: (j: QuotationItem[]) => void;
};

type cargoInfo = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PortOfOrigin: string;
  PortOfDestination: string;
  TransitTime: string;
  CarrierName: string;
  ContainerType: string;
  TodaysDate: string;
  CustomerPhone: string;
  CustomerEmail: string;
  CustomerTRN: string;
  Jobid: string;
  Discount: number;
  OutstandingDues: number;
  VATAmount: number;
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
};
