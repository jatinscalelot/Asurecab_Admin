export const MainMenu = [
  // {
  //   displayname: "Users",
  //   route: "users",
  //   isOpen: false,
  //   view: false,
  //   icon: "icon-user-fill",
  // },
  {
    displayname: "Inquiry",
    route: "inquiry",
    isOpen: false,
    view: false,
    icon: "icon-inquiry",
  },
  {
    displayname: "Our Services",
    route: "our-services",
    isOpen: false,
    view: false,
    icon: "icon-packages",
  },
  {
    displayname: "Taxi Routes",
    route: "taxi-routes",
    isOpen: false,
    view: false,
    icon: "icon-services",
  },
  {
    displayname: "Gallery",
    route: "gallery",
    isOpen: false,
    view: false,
    icon: "icon-gallery",
  },
  {
    displayname: "Youtube Videos",
    route: "youtube-videos",
    isOpen: false,
    view: false,
    icon: "icon-videos",
  },
  {
    displayname: "Contact",
    route: "contact",
    isOpen: false,
    view: false,
    icon: "icon-contact",
  },
  {
    displayname: "Testimonials",
    route: "testimonials",
    isOpen: false,
    view: false,
    icon: "icon-star-fill",
  },
  // {
  //   displayname: "Support Ticket",
  //   route: "support-ticket",
  //   isOpen: false,
  //   view: false,
  //   icon: "icon-headphones-fill",
  // },
  // {
  //   displayname: "Master",
  //   route: "",
  //   isOpen: false,
  //   view: false,
  //   icon: "icon-master",
  // },
  // {
  //   displayname: "Admin Setup",
  //   route: "",
  //   isOpen: false,
  //   view: false,
  //   icon: "icon-master",
  // },

];

export const InMenu = [
  {
    displayname: "Admins",
    route: "admin",
    mainMenu: "Admin Setup",
  },
  {
    displayname: "Role & Permissions",
    route: "role-permission",
    mainMenu: "Admin Setup",
  },
];

export const Status = [
  { id: 1, value: "", label: "All" },
  { id: 2, value: "true", label: "Active" },
  { id: 3, value: "false", label: "In Active" },
];
export const Status2 = [
  { id: 1, value: "", label: "All" },
  { id: 2, value: "Pending", label: "Pending" },
  { id: 3, value: "In Progress", label: "In Progress" },
  { id: 4, value: "Resolved", label: "Resolved" },
];
export const Ratings = [
  { id: 1, value: 1, label: "1" },
  { id: 2, value: 2, label: "2" },
  { id: 3, value: 3, label: "3" },
  { id: 4, value: 4, label: "4" },
  { id: 5, value: 5, label: "5" },
]

export const PartnerType = [{ value: "Individual Owner", label: "Individual Owner" }, { value: "Company Owner", label: "Company Owner" }]
export const TripType = [{ label: "One Way", value: "Oneway" }, { label: "Round Trip", value: "Round Trip" }, { label: "Local Rental", value: "Local Rental Trip" }, { label: "Airport", value: "Airport" }]
export const PickupType = [{ label: "Pickup From Airport", value: "pickup" }, { label: "Drop At Airport", value: "drop" }]
export const PaymentType = [{ label: "Cash", value: "Cash" }, { label: "UPI", value: "UPI" }, { label: "Net Banking", value: "Net Banking" }, { label: "Card", value: "Card" }]
export const ApplicableOn = [{ label: "Website", value: "Website" }, { label: "User Application", value: "User Application" }, { label: "Driver Application", value: "Driver Application" }, { label: "Vendor", value: "Vendor" }]
export const VehicleTypeList = [{ label: "Sedan", value: "Sedan" }, { label: "SUV", value: "SUV" }, { label: "Hatchback", value: "Hatchback" }, { label: "MUV", value: "MUV" }]
export const FuelType = [{ label: "CNG", value: "CNG" }, { label: "Petrol", value: "Petrol" }, { label: "Diesel", value: "Diesel" }, { label: "Electric", value: "Electric" }, { label: "Hybrid", value: "Hybrid" }]
export const PermitType = [{ label: "State Permit", value: "State Permit" }, { label: "All India Permit", value: "All India Permit" }, { label: "Special Permit", value: "Special Permit" }, { label: "Local City Permit", value: "Local City Permit" }]
export const PetFriendly = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]
export const LuggageCarrier = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]
export const Sourcing = [{ label: "Rented Vehicle", value: "Rented Vehicle" }, { label: "Owner Vehicle", value: "Owner Vehicle" }]
export const SeatBelt = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]
export const Languages = [{ label: "Gujarati", value: "Gujarati" }, { label: "Hindi", value: "Hindi" }, { label: "English", value: "English" }]
export const PaymentStatus = [
  { value: "", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Paid", label: "Paid" },
]
export const TripStatus = [
  { value: "", label: "All" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Ongoing", label: "Ongoing" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" }
]

export const imageArray = [
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/vnd.microsoft.icon",
  "image/tiff",
  "image/svg+xml",
];
export const excelArray = [
  "application/ms-excel",
  "application/vnd.ms-excel",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]

export const docArray = [
  "application/zip",
  "text/plain",
  "application/vnd.rar",
  "application/pdf",
  "text/csv",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/x-tar",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/x-7z-compressed",
  "application/octet-stream",
  "application/ms-excel",
  "text/html"
];

export const ImageDocArray = [
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/vnd.microsoft.icon",
  "image/tiff",
  "image/svg+xml",
  "application/zip",
  "text/plain",
  "application/vnd.rar",
  "application/pdf",
  "text/csv",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/x-tar",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/x-7z-compressed",
  "application/octet-stream",
  "application/ms-excel",
  "text/html"
]