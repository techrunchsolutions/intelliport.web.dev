// Table data
export interface ApplicantDto {
  id: string;
  surname: string;
  firstName: string;
  middleName: string;
  gender: string;
  birthDate: string;
  nationality: string;
  birthState: string;
  nationalId: string;
  appStatus: string;
  fullName: string;
}

export enum PageCode {
  PE = 0,
  RG,
  RT,
  RJ,
  ES,
  AE,
  ER,
  AA,
  AR,
  AP,
  PZ,
  QA,
  IS,
  ALL
}


export interface PersonDto {
  id: string;
  surname: string;
  firstName: string;
  middleName: string;
  gender: string;
  birthDate: string;
  nationality: string;
  birthState: string;
  nationalId: string;
  appStatus: string;
  fullName: string;
  personCustom: PersonCustomDto;
  personBiometric: PersonBiometricDto;
  personApplication: PersonApplicationDto[];
}

export interface PersonCustomDto {
  id: string;
  personId: string;
  permanentAddress: string;
  email: string;
  contactNo: string;
  mobileNo: string;
  maritalStatus: string;
  maidenName: string;
  specialFeatures: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  profession: string;
  nextOfKin: string;
  nextOfKinAddress: string;
  nextOfKinContactNo: string;
  nextOfKinRelationship: string;
  guarantor: string;
  guarantorAddress: string;
  guarantorContactNo: string;
}

export interface PersonBiometricDto {
  id: string;
  personId: string;
  facialImage: string;
  facialEntry: string;
  signatureImage: string;
  signatureEntry: string;
  fingerL1Template: string;
  fingerL1Status: string;
  fingerL2Template: string;
  fingerL2Status: string;
  fingerL3Template: string;
  fingerL3Status: string;
  fingerL4Template: string;
  fingerL4Status: string;
  fingerL5Template: string;
  fingerL5Status: string;
  fingerR1Template: string;
  fingerR1Status: string;
  fingerR2Template: string;
  fingerR2Status: string;
  fingerR3Template: string;
  fingerR3Status: string;
  fingerR4Template: string;
  fingerR4Status: string;
  fingerR5Template: string;
  fingerR5Status: string;
}

export interface PersonApplicationDto {
  id: string;
  personId:  string;
  applicantId: string;
  referenceId: string;
  enrollmentNo: string;
  nationalId: string;
  passportNo: string;
  issuedPlace: string;
  issuedDate: string;
  expiryDate: string;
  validity: string;
  docType: string;
  docPage: string;
  appReason: string;
  surname: string;
  firstName: string;
  middleName: string;
  gender: string;
  birthDate: string;
  nationality: string;
  birthState: string;
  address: string;
  email: string;
  contactNo: string;
  mobileNo: string;
  maritalStatus: string;
  maidenName: string;
  specialFeatures: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  profession: string;
  nextOfKin: string;
  nextOfKinAddress: string;
  nextOfKinContactNo: string;
  nextOfKinRelationship: string;
  guarantor: string;
  guarantorAddress: string;
  guarantorContactNo: string;
}

export interface EnrollmentStageDto {
  id: string;
  personId: string;
  enrollmentNo: string;
  applicationType: string;
  applicationReason: string;
  passportType: string;
  passportSize: string;
  validity: string;
  processingCountry: string;
  processingState: string;
  processingOffice: string;

  enrollApprovedBy: string;
  enrollApprovedOn: string;
  enrollApprovedAt: string;

  enrolledBy: string;
  enrolledOn: string;
  enrolledAt: string;

  isAfisSubmitted: string;
  afisSubmitErrorCode: string;

  isAfisResponse: string;
  isAfisApproved: string;
  afisApprovalErrorCode: string;

  prodApprovedBy: string;
  prodApprovedOn: string;
  prodApprovedAt: string;

  persoBy: string;
  persoOn: string;
  persoAt: string;

  qControlBy: string;
  qControlOn: string;
  qControlAt: string;

  issuedBy: string;
  issuedOn: string;
  issuedAt: string;
  thirdPartyIssued: string;
  stageCode: string;
}