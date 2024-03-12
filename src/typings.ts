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
  quantity?: number;
  Discount?: number;
  VAT?: number;
  Dimensions: string;
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
  blNo: string;
  HAWB: string;
  dueDate: string;
  PostingDate: string;
  Arrival?: string;
  IncoTerm?: string;
  Periodicity?: string;
  Department?: string;
  Yref?: string;
  Incharge?: string;
  validFrom?: string;
  validTo?: string;
  termsAndConditions?: string;
};
type PrestationItem = {
  description: string;
  currency: string;
  total: number;
};
type InquiryStore = {
  inquiry: Inquiry;
  address: string;
  setItemInquiry: (i: Inquiry) => void;
  resetInquiry: () => void;
  setPrestation: (i: PrestationItem) => void;
  resetPrestation: () => void;
  prestation: PrestationItem[];
  setaddress: (address: string) => void;
  setPrestationArray: (i: PrestationItem[]) => void;
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
  AirwayItems: AirwayItem[];
  PODItems: ProofOfDeliveryItems[];
  ManifestItems: CargoManifestItems[];
  AddLadingItem: (item: LadingItems) => void;
  editLadingItem: (item: LadingItems, index: number) => void;
  editAirwayItem: (item: AirwayItem, index: number) => void;
  editManifestItem: (item: CargoManifestItems, index: number) => void;
  editItem: (item: QuotationItem, index: number) => void;
  editPodItem: (item: ProofOfDeliveryItems, index: number) => void;

  AddAirwayItem: (item: AirwayItem) => void;
  addManifestItem: (item: CargoManifestItems) => void;
  addPODItem: (item: ProofOfDeliveryItems) => void;
  AddItem: (item: QuotationItem) => void;
  RemoveItem: (id: string) => void;
  resetItems: () => void;
  setitemsArray: (items: QuotationItem[]) => void;
  setBillOfLadingItems: (items: LadingItems[]) => void;
  setAirwayItems: (items: AirwayItem[]) => void;
  setManifestItems: (items: CargoManifestItems[]) => void;
  setPODItems: (items: ProofOfDeliveryItems[]) => void;
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
  prestation: PrestationItem[];
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
  othershippingDetails?: string;
  jobInitials: string;
  method: string;
  PlaceOfIssue: string;
  DateOfIssue: string;
  PlaceOfReceipt: string;
  PayableAt: string;
  PlaceOfDelivery: string;
  Movement: string;
  NotifyAddress: string;
  Currency: string;
  PortOfLoading: string;
  PortOfDischarge: string;
  ExportReference: string;
  ForwardingAgent: string;
  ConsigneeReference: string;
  address: string;
  BLNo: string;
  CarrierReference: string;
  VoyageNo: string;
  Carrier: string;
  ContainersReceived: string;
  PackagesReceived: string;
  FreightPrepaid: string;
  FreightCollected: string;
  TotalFreight: string;
  OriginalBSL: string;
};
type InvoiceStore = {
  jobInfo: cargoInfo & Inquiry;
  ladleInfo: cargoInfo & ladleInquiry;
  AirwayInfo: cargoInfo & AirwayBillInquiry;
  manifestInfo: cargoInfo & CargoManifestInquiry;
  PODInfo: cargoInfo & ProofOfDeliveryInquiry;
  setladleInfo: (j: cargoInfo & ladleInquiry) => void;
  setAirwayInfo: (j: cargoInfo & AirwayBillInquiry) => void;
  setManifestInfo: (j: cargoInfo & CargoManifestInquiry) => void;
  setPODInfo: (j: cargoInfo & ProofOfDeliveryInquiry) => void;
  Items: QuotationItem[];
  ladingItems: LadingItems[];
  AirwayItems: AirwayItem[];
  ManifestItems: CargoManifestItems[];
  PODItems: ProofOfDeliveryItems[];
  setladingItems: (j: LadingItems[]) => void;
  setInfo: (j: cargoInfo & Inquiry) => void;
  setItems: (j: QuotationItem[]) => void;
  setAirwayBillItems: (j: AirwayItem[]) => void;
  setManifestItems: (items: CargoManifestItems[]) => void;
  setPODItems: (items: ProofOfDeliveryItems[]) => void;
};

type cargoInfo = {
  Jobid: string;
  Discount: number;
  OutstandingDues: number;
  VATAmount: number;
  officeAddress: string;
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

type AirwayBillInquiry = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  AirportOfOrigin: string;
  AirportOfDestination: string;
  RouteDetails: string;
  TransitTime: string;
  FlightDetails: string;
  ShipmentTerms: string;
  CarrierName: string;
  CustomerTRN: string;
  CustomerAccount: string;
  CustomerEmail: string;
  CustomerPhoneNo: string;
  othershippingDetails: string;
  jobInitials?: string;
  method: string;
  Currency: string;
  Flight: string;
  ReferenceNumber: string;
  HandlingInformation: string;
  PaymentMethod: string;
  AccountingInformation: string;
  RequestedFlight: string;
  AgentsIATA: string;
  ModeOfPayment: string;
  ChargesCode: string;
  WVPPD: string;
  WVColl: string;
  OtherPPD: string;
  OtherColl: string;
  DeclaredValCarriage: string;
  DeclaredValCustoms: string;
  AmountInsurance: string;
  ShipperName: string;
  ShipperPhone: string;
  ShipperAddress: string;
  OtherShipperInfo: string;
  ShippersAccount: string;
  ConsigneesAccount: string;
  SCI: string;
  PPDWeight: string;
  PPDValuation: string;
  PPDTax: string;
  PPDOther: string;
  CollWeight: string;
  CollValuation: string;
  CollTax: string;
  CollOther: string;
  CurrConv: string;
  CCChargesinDestCurr: string;
  ChargesAtDestination: string;
};

type AirwayItem = {
  NoPieces: number;
  GrossWeight: number;
  Unit: string;
  Rate: string;
  ChargeableWeight: string;
  NatureOfGoods: string;
  RatePerCharge: string;
};

type ProofOfDeliveryInquiry = {
  JobNo: string;
  Description: string;
  Transporter: string;
  Shipper: string;
  DeliveryTo: string;
  ContactPerson: string;
  DeliveryDate: string;
  Time: string;
  ReceiverNameAndSignature: string;
  MobileNumber: string;
  CompanyStamp: string;
  Remarks: string;
};

type ProofOfDeliveryItems = {
  MAWB: string;
  HAWBNo: string;
  NoOfPackages: string;
  Weight: string;
  CBM: string;
};

type CargoManifestInquiry = {
  Consolidation: string;
  MAWB: string;
  Flights: string;
  Date: string;
  From: string;
  To: string;
  Total: string;
  HeaderAddress: string;
};

type CargoManifestItems = {
  HAWB: string;
  ParcelsWeight: string;
  Description: string;
  Shipper: string;
  Charges: string;
  Collect: string;
};
