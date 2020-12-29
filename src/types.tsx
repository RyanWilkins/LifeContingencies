
export interface QuestionType {
  index: number;
  question_text: string;
  link: string;
  expanded: boolean;
  question_subtitle?: boolean;
}

export interface UserInputs {
  gender: "male" | "female" | "other";
  age: number;
  ethnicity: "White" | "Black" | "Hispanic" | "All";
  country: "US" | "Canada";
  smoking: "yes" | "no" | "all";
}

export interface LifeTable {
  table_name: string;
  table_link: string;
  gender: "male" | "female" | "all";
  country: "US" | "Canada";
  ethnicity: "White" | "Black" | "Hispanic" | "All";
  smoking: "yes" | "no" | "all";
  elements: LifeTableElement[];
}

export interface LifeTableElement {
  age: number;
  qx: number;
  dx: number;
  ex: number;
  lx: number;
  Lx: number;
  Tx: number;
  death_chance?: number;
}

export interface LifeTableColumn {
  id: "age" | "qx" | "dx" | "ex" | "lx" | "Lx" | "Tx";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface DeathTable {
  table_name: string;
  table_link: string;
  gender: "male" | "female" | "all";
  country: "US" | "Canada";
  elements: DeathTableElement[];
}

export interface DeathTableElement{
  age: number,
  cause: string,
  cause_percent: number
}

export interface DeathTableColumn {
  id: "age" | "cause" | "cause_percent"
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export const gender_list = ["male", "female", "other"];
export const ethnicity_list = ["All", "White", "Black", "Hispanic"];
export const country_list = ["US", "Canada"];
