import { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { ToastProvider, Button } from "../components/ui/index";
import { notify } from "../util/notify";

const Dashboard = () => {

  const handleToggleNotification = () => {
    notify.info("Info Message")
    notify.success("Success Message")
    notify.warning("Warning Message")
    notify.error("Error Message")
  };

  const fakeApiCall = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success!") : reject("Error!");
      }, 2000);
  });

  const handlePromiseNotification = () => {
    notify.promise(fakeApiCall(), {
      loading: "Processing...",
      success: "Operation successful!",
      error: "Something went wrong!",
    });
  };
  
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingButton = async () => {
    setIsLoading(true);
    try {
      const result = await fakeApiCall();
      notify.success(`${result}`);
    } catch (error) {
      notify.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <>
      <div className="space-y-12 pb-20">
        <h1 className="text-text">Button & Toast Notification Usage Examples</h1>

        {/* 🔔 Notification Trigger Example */}
        <div className="flex gap-3">

          <Button type="button" variant="primary" onClick={handleToggleNotification} iconName="FaBell">
            Toggle Notification
          </Button>

          <Button type="button" variant="secondary" iconName="FaPlay"
            onClick={handlePromiseNotification}>
            Run Promise Toast
          </Button>

        </div>

        {/* 🚀 Button Component Examples */}
        <div className="space-y-4">

          <div className="flex flex-wrap gap-4">

            {/* 2️⃣ Primary Button with Tooltip */}
            <Button type="button" variant="primary" tooltip="With Tooltips" tooltipPosition="bottom">
              Primary With Tooltip
            </Button>

            <Button type="button" variant="secondary">
              Secondary
            </Button>

            {/* 1️⃣ Button without icon */}
            <Button type="button" variant="danger">
              Simple Button
            </Button>

            {/* 2️⃣ Button with icon */}
            <Button type="button" variant="outline" iconName="FaBell">
              With Icon
            </Button>

            {/* 3️⃣ Button with loading spinner */}
            <Button
              type="button"
              variant="ghost"
              isLoading={isLoading}
              loadingText="Submitting..."
              iconName="FaCloudArrowUp"
              onClick={handleLoadingButton}>
              Submit
            </Button>

          </div>

        </div>
      </div>

      <ToastProvider />
    </>
  );

  return <MainLayout content={content} />;
};

export default Dashboard;