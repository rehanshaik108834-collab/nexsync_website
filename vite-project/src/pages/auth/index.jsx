import CommonForm from "@/components/common-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signUpFormControls, signInFormControls} from "@/config";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

function AuthPage() {
    const [activeTab, setActiveTab] = useState("signin");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    const { signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser, auth } = authContext;
    
    // Redirect after successful authentication
    useEffect(() => {
        if (auth?.authenticated) {
            if (auth?.user?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        }
    }, [auth?.authenticated, auth?.user?.role, navigate]);    


    function handleTabChange(value) {
        setActiveTab(value);
    }


    function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

    return <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <h1 className="text-lg font-semibold">Auth Page</h1>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <CommonForm
              formControls={signInFormControls}
              formData={signInFormData}
              setFormData={setSignInFormData}
              handleSubmit={handleLoginUser}
              buttonText="Sign In"
              isButtonDisabled={!checkIfSignInFormIsValid()}
            />
          </TabsContent>
          <TabsContent value="signup">
            <CommonForm
              formControls={signUpFormControls}
              formData={signUpFormData}
              setFormData={setSignUpFormData}
              handleSubmit={handleRegisterUser}
              buttonText="Sign Up"
              isButtonDisabled={!checkIfSignUpFormIsValid()}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>

}   
export default AuthPage;