import React from 'react';
import AuthForm from '@/ui/AuthForm';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import FormHeader from '@/ui/FormHeader';
interface SignupProps {
  // Add any props you need for the Signup component
}

const Signup: React.FC<SignupProps> = () => {
  // Add your component logic here

  return (
    <AuthForm>
      <FormHeader
        title="Signup"
        subtitle="Already have an account?"
        link={{ href: '/login', text: 'Login' }}
      />
      <Input
        variant="primary"
        label="Email"
        type="text"
        placeholder="Enter your Email"
        height="large"
      />
      <Input
        variant="primary"
        label="Phone Number"
        type="text"
        placeholder="Enter your Mobile"
        height="large"
      />
      <Input
        variant="primary"
        label="Password"
        type="password"
        placeholder="Enter your Password"
        height="large"
      />
      <Input
        variant="primary"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your Password"
        height="large"
      />
      <Button variant="secondary" size="large" width="full">
        Next
      </Button>
    </AuthForm>
  );
};

export default Signup;
