declare global {

  type UserRole =
    | 'SuperAdmin'
    | 'Admin'
    | 'Member'
    | 'Moderator'
    | 'Organization';

  type certificateStatus = 'NONE' | 'PENDING' | 'ISSUED' | 'REJECTED';

  type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
  
  type SubmitEvent = React.FormEvent<HTMLFormElement>;
}

export {};
