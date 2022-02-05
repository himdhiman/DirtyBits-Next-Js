export interface userDataType {
  is_logged_in: boolean;
  is_verified: boolean;
  is_admin: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
}

type Error = {
  error: boolean;
  details: string;
};

export interface signupErrorType {
  username: Error;
  firstname: Error;
  lastname: Error;
  email: Error;
  password: Error;
  confirmPassword: Error;
}

export interface tagsType {
  value: number;
  label: string;
  color: string;
}

type problemTags = {
  id: number;
  name: string;
};

export interface problemListType {
  id: number;
  title: string;
  tags: problemTags[];
  totalSubmissions: number;
  problem_level: string;
  solved: string;
}

export interface addProblemType {
  title: string;
  problem_statement: string;
  note: string;
  input_format: string;
  constraints: string;
  output_format: string;
  problem_level: string;
  tags: number[];
  memory_Limit: number | null;
  time_Limit: number | null;
}

export interface themeType {
  label: string;
  value: string;
  type: string;
}

export interface editorLanguage {
  label: string;
  value: string;
  ext: string;
}

export interface submissionsList {
  language: string;
  status: string;
  score: number;
  total_score: number;
  submission_Date_Time: string;
}

export interface problemDataTypes {
  created_by: string;
  title: string;
  problem_statement: string;
  note: string;
  input_format: string;
  constraints: string;
  output_format: string;
  max_score: number;
  tags: any;
  problem_level: string;
  accuracy: string;
  totalSubmissions: number;
  sample_Tc: number;
  total_Tc: number;
  created_At: string;
  memory_Limit: number;
  time_Limit: number;
  publically_visible: boolean;
  approved_by_admin: boolean;
  up_votes: number;
  down_votes: number;
}

export interface submissionResult {
  created_By: string;
  problem_Id: number;
  language: string;
  task_id: string;
  code: string;
  status: string;
  error: string;
  test_Cases_Passed: number;
  total_Test_Cases: number;
  score: number;
  total_score: number;
  submission_Date_Time: string;
}
