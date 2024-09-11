import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import logo from '../images/logo.png';
import patternBG from '../images/patternBG.png';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: `url(${patternBG})`, backgroundSize: 'cover'}}>
      <Card className="w-[350px]">
        <CardHeader>
          <img src={logo} alt="Grocify Logo" className="w-32 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center">Sign Up for Grocify</h2>
        </CardHeader>
        <CardBody>
          <form>
            <div className="space-y-4">
              <Input type="text" placeholder="Full Name" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Input type="password" placeholder="Confirm Password" />
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <Button className="w-full">Sign Up</Button>
        </CardFooter>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </Card>
    </div>
  );
};

export default SignupPage;
